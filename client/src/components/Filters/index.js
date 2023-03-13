import React, { useState, useEffect } from "react";
import { Button,Row,Col,Select,Slider } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import FilterModal from "./FilterModal";
import axios from "axios";
import { useStore } from "../../context/pg_store";

function Filters({ pgList, setPgList }) {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const { state, methods } = useStore();

  const handleModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityData = await axios.get("http://localhost:8000/getcity", {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        });
        if (cityData?.status === 200) {
          setCityList(cityData?.data);
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
        setLoading(false);
      }
      try {
        const upperRange = await axios.get("http://localhost:8000/maxPrice", {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        });
        if (upperRange?.data?.maxPrice) {
          setMaxPrice(upperRange?.data?.maxPrice);
        }
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
      }
    };
    fetchData();
  }, []);

    const onChange = (value) => {
      setSelectedPrice(value);
    };

    const handleSubmit = () => {
      fetchData();
      setIsFilterModalVisible(false);
    };

    const fetchData = async () => {
      methods.updatePgLoader(true);
      const pgdata = axios
        .get(`http://localhost:8000/xyz/${selectedPrice}`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then(async (res) => {
          methods.updatePgList(res?.data);
          methods.updatePgLoader(false);
        })
        .catch((error) => {
          methods.updatePgLoader(false);
          if (
            error?.response?.data?.result === "Please provide a valid token"
          ) {
            localStorage.removeItem("user");
          }
        });
    };

  return (
    <>
      <FilterModal
        isFilterModalVisible={isFilterModalVisible}
        handleModal={handleModal}
        cityList={cityList}
        maxPrice={maxPrice}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        setIsFilterModalVisible={setIsFilterModalVisible}
      />
      {/* <h1>Filter PG</h1>
      <Row >
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
          <Slider defaultValue={0} max={5} step={0.1} />
        </Col>
        <Col span={24}>Sort By Popularity</Col>
        <Col span={24}>
          <Select
            showSearch
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
                label: "Palanpur",
              },
              {
                value: "2",
                label: "Nadiad",
              },
              {
                value: "3",
                label: "Ahmedabad",
              },
              {
                value: "4",
                label: "Patan",
              },
            ]}
          />
        </Col>
      </Row>
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
      </Row> */}
      <Button icon={<FilterOutlined />} onClick={() => handleModal()}>
        Filters
      </Button>
    </>
  );
}

export default Filters;
