import React, {useState} from "react";
import { Modal, Row, Col, Select, Slider, Button } from "antd";
import axios from "axios";
import { useStore } from "../../context/pg_store";

function FilterModal({
  isFilterModalVisible,
  handleModal,
  cityList,
  loading,
  maxPrice,
  selectedPrice,
  setSelectedPrice,
  setLoading,
  setIsFilterModalVisible,
}) {

  const { state, methods } = useStore();
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedRating, setSelectedRating] = useState(0)

  const onChange = (value) => {
    setSelectedPrice(value);
  };

  const onChangeCity = (value) => {
    setSelectedCity(value)
  }

  const handleSubmit = () => {
    fetchData();
    setIsFilterModalVisible(false);
  };

  const fetchData = async () => {
    methods.updatePgLoader(true);
    const pgdata = axios
      .get('http://localhost:8000/xyz/', {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
        params: {
          price: parseInt(selectedPrice),
          city: selectedCity,
          rating: selectedRating,
        }
      })
      .then(async (res) => {
        methods.updatePgList(res?.data);
       methods.updatePgLoader(false);
      })
      .catch((error) => {
        methods.updatePgLoader(false);
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
      });
  };

  return (
    <Modal
      title="Filters"
      open={isFilterModalVisible}
      onCancel={handleModal}
      footer={
        <Row>
          <Col span={24}>
            <Button>Clear All</Button>
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              loading={loading}
              disabled={loading}
            >
              Apply
            </Button>
          </Col>
        </Row>
      }
    >
      <Row>
        <Col span={24}>Sort By Popularity</Col>
        <Col span={24}>
          <Select
            showSearch
            loading={loading}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Popularity",
              },
              {
                value: "2",
                label: "Rating: High to Low",
              },
              {
                value: "3",
                label: "Cost: Low to High",
              },
              {
                value: "4",
                label: "Cost: High to Low",
              },
            ]}
          />
        </Col>
        <Col span={24}>Price</Col>
        <Col span={24}>
          <Slider
            defaultValue={0}
            max={maxPrice}
            step={100}
            onChange={onChange}
          />
        </Col>
        <Col span={24}>Rating</Col>
        <Col span={24}>
          <Slider defaultValue={0} max={5} step={0.1} onChange={(val) => setSelectedRating(val)} />
        </Col>
        <Col span={24}>City</Col>
        <Col span={24}>
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            onChange={(val) => onChangeCity(val)}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          >
            {cityList?.map((city) => {
              return (
                <Select.Option value={city}>{city}</Select.Option>
              )
            })}
          </Select>
        </Col>
      </Row>
    </Modal>
  );
}

export default FilterModal;
