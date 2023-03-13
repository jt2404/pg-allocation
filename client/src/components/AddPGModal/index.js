import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  Spin,
} from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { INITIAL_PG_DATA } from "./constants";
import { fetchPgList } from "../../apicalls";
import axios from "axios";
import { useStore } from "../../context/pg_store";

function AddPGModal({
  isModalOpen,
  setIsModalVisible,
  pgData,
  setPgData,
  isEdit = false,
  handleCancel,
  form,
  userId,
}) {
  const { state, methods } = useStore();

  const roomTypeOptions = [
    {
      value: "Non-AC",
      label: "Non AC",
    },
    {
      value: "AC",
      label: "AC",
    },
  ];
  const cardRow = {
    gutter: 16,
  };
  const formStyles = {
    marginBottom: "0.7rem",
    padding: "0px",
  };
  const [loading, setLoading] = useState(false);
  const handleChange = (key, e) => {
    setPgData((prevPgData) => {
      return { ...prevPgData, [key]: e };
    });
  };
  const handleFileUpload = (file) => {
    setPgData((prevPgData) => {
      return { ...prevPgData, ["image"]: file };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await axios.post("http://localhost:8000/addpg", pgData, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    if (res.status === 200) {
      if (!isEdit) {
        let data = new FormData();
        data.append("pic", pgData.image);
        data.append("pgId", res?.data?.data?._id);
        const addPicRes = await axios.post("/addPicture", data, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        });
        if (addPicRes.status === 200) {
          fetchPgList(methods.updatePgList, methods.updatePgLoader, "");
          message.success("PG added successfully", 2);
          setLoading(false);
          handleCancel();
        }
      } else {
        message.success("PG updated successfully")
        setLoading(false);
        setIsModalVisible(false)
      }
    }
  };

  const disableAddPGButton = () => {
    if (
      !pgData?.price ||
      pgData?.price < 0 ||
      typeof pgData?.price !== "number"
    ) {
      return true;
    }
    if (
      !pgData?.noofrooms ||
      pgData?.noofrooms < 0 ||
      typeof pgData?.noofrooms !== "number"
    ) {
      return true;
    }
    if (!pgData?.name) {
      return true;
    }
    if (!pgData?.address) {
      return true;
    }
    if (!pgData?.city) {
      return true;
    }
    if (!pgData?.district) {
      return true;
    }
    if (!pgData?.description) {
      return true;
    }
    return false;
  };
  return (
    <Modal
      title={!isEdit ? "Add PG" : "Edit PG"}
      open={isModalOpen}
      maskClosable={false}
      onCancel={() => handleCancel()}
      width="45%"
      footer={null}
    >
      <Form
        name="PG Form"
        form={form}
        size="middle"
        layout="vertical"
        className="create-req-form"
      >
        <>
          <Row {...cardRow}>
            <Col span={24}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    PG Name
                  </div>
                }
                name="pgname"
                rules={[
                  {
                    required: true,
                    message: "Please input your PG Name!",
                  },
                ]}
                style={formStyles}
              >
                <Input
                  defaultValue={pgData?.name}
                  value={pgData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row {...cardRow}>
            <Col span={24}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    Address
                  </div>
                }
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
                style={formStyles}
              >
                <Input
                  defaultValue={pgData?.address}
                  value={pgData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row {...cardRow}>
            <Col span={11}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>City</div>
                }
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input your City!",
                  },
                ]}
                style={formStyles}
              >
                <Input
                  defaultValue={pgData?.city}
                  value={pgData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={13}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    District
                  </div>
                }
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Please input your District!",
                  },
                ]}
                style={formStyles}
              >
                <Input
                  defaultValue={pgData?.district}
                  value={pgData.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row {...cardRow}>
            <Col span={6}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    No. Rooms
                  </div>
                }
                name="norooms"
                rules={[
                  {
                    required: true,
                    message: "Please input Number of Rooms!",
                  },
                ]}
                style={formStyles}
              >
                <InputNumber
                  defaultValue={pgData?.noofrooms || 1}
                  min={1}
                  value={pgData.noofrooms}
                  onChange={(val) => handleChange("noofrooms", val)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    Sharing per Room
                  </div>
                }
                name="sharingPerRoom"
                rules={[
                  {
                    required: true,
                    message: "Please input Number of Rooms!",
                  },
                ]}
                style={formStyles}
              >
                <InputNumber
                  defaultValue={pgData?.sharingPerRooms || 1}
                  min={1}
                  value={pgData.sharingPerRoom}
                  onChange={(val) => handleChange("sharingPerRoom", val)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    Room Type
                  </div>
                }
                name="roomtype"
                rules={[
                  {
                    required: true,
                    message: "Please input your room type!",
                  },
                ]}
                style={formStyles}
              >
                <Select
                  options={roomTypeOptions}
                  style={{ width: "100%" }}
                  defaultValue={pgData.roomtype}
                  value={pgData.roomtype}
                  onChange={(val) => handleChange("roomtype", val)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>Price</div>
                }
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your price!",
                  },
                ]}
              >
                <InputNumber
                  defaultValue={pgData?.price}
                  min={1}
                  style={{ width: "100%" }}
                  value={pgData.price}
                  onChange={(val) => handleChange("price", val)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row {...cardRow}>
            <Col span={24}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    Description
                  </div>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your descrition!",
                  },
                ]}
              >
                <Input.TextArea
                  defaultValue={pgData?.description}
                  value={pgData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          {!isEdit && (
            <Row {...cardRow}>
              <Col span={24}>
                <Form.Item name="image">
                  <Upload.Dragger
                    multiple={false}
                    listType="pictures"
                    action={"http://localhost:3000/"}
                    showUploadList={{ showRemoveIcon: true }}
                    accept=".png,.jpeg,.doc"
                    beforeUpload={(file) => {
                      console.log(file);
                      handleFileUpload(file);
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Click here to Upload Image
                    </Button>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
            </Row>
          )}
        </>
        <Row justify="end" style={{ paddingTop: "0.7rem" }}>
          <Col>
            <Button type="default" onClick={() => handleCancel()}>
              Cancel
            </Button>
          </Col>
          <Col style={{ paddingLeft: "1rem" }}>
            <Button
              type="primary"
              disabled={disableAddPGButton() || loading}
              onClick={() => handleSubmit()}
              loading={loading}
            >
              {!isEdit ? "Add" : "Edit"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddPGModal;
