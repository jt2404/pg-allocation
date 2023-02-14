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
import axios from "axios";

function AddPGModal({ isModalOpen, handleCancel }) {
  const [pgData, setPgData] = useState(INITIAL_PG_DATA);
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
  console.log(pgData);
  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:8000/addpg",
      { pgData },
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    console.log(res)
    if (res.status === 200) {
      let data = new FormData();
      data.append("pic", pgData.image);
      data.append("pgId", res?.data?.data?._id);
      const addPicRes = await axios.post("/addPicture", data, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      message.success("PG added successfully", 2);
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
  const [form] = Form.useForm();
  return (
    <Modal
      title="Add PG"
      open={isModalOpen}
      onCancel={handleCancel}
      maskClosable={false}
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
                  value={pgData.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row {...cardRow}>
            <Col span={8}>
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
                  min={1}
                  value={pgData.noofrooms}
                  defaultValue={1}
                  onChange={(val) => handleChange("noofrooms", val)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
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
            <Col span={8}>
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
                  value={pgData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

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
        </>
        <Row justify="end" style={{ paddingTop: "0.7rem" }}>
          <Col>
            <Button type="default">Cancel</Button>
          </Col>
          <Col style={{ paddingLeft: "1rem" }}>
            <Button
              type="primary"
              disabled={disableAddPGButton()}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddPGModal;
