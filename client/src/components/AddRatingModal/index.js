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
  Rate,
} from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { fetchPgList } from "../../apicalls";
import axios from "axios";

function AddRatingModal({
  isAddRatingVisible,
  setIsAddRatingVisible,
  form,
  ratingData,
  setRatingData,
  pgId,
  userId,
}) {
  const [loading, setLoading] = useState(false);
  const handleChange = (key, e) => {
    setRatingData((prevRatingData) => {
      return { ...prevRatingData, [key]: e };
    });
  };

  const handleCancel = () => {
    setRatingData({})
    form.resetFields()
    setIsAddRatingVisible(false);
  }

  const disableAddRatingButton = () => {
    if (!ratingData?.comment) {
      return true;
    }
    if (!ratingData?.rate) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const finalData = {
      comment: ratingData?.comment,
      rate: ratingData?.rate,
      userId: userId,
      pgId: pgId,
    };
    const res = await axios.post(
      "http://localhost:8000/addRating",
      finalData,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (res.status === 200) {
      message.success("Rating added successfully");
      setRatingData({});
      setIsAddRatingVisible(false);
      setLoading(false);
    }
  };

  const formStyles = {
    marginBottom: "0.7rem",
    padding: "0px",
  };

  return (
    <Modal
      title={"Give Rate"}
      open={isAddRatingVisible}
      maskClosable={false}
      onCancel={() => handleCancel()}
      width="45%"
      footer={null}
    >
      <Form
        name="Rating Form"
        form={form}
        size="middle"
        layout="vertical"
        className="create-req-form"
      >
        <>
          <Row>
            <Col span={24}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    Rating
                  </div>
                }
                name="rate"
                rules={[
                  {
                    required: true,
                    message: "Please give your Rating",
                  },
                ]}
                style={formStyles}
              >
                <Rate
                  allowHalf
                  value={ratingData?.rate || 0}
                  onChange={(val) => handleChange("rate", val)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    Feedback
                  </div>
                }
                name="comment"
                rules={[
                  {
                    required: true,
                    message: "Please give your feedback",
                  },
                ]}
                style={formStyles}
              >
                <Input.TextArea
                  onChange={(e) => handleChange("comment", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" style={{ paddingTop: "0.7rem" }}>
            <Col>
              <Button type="default" onClick={() => handleCancel()}>
                Cancel
              </Button>
            </Col>
            <Col style={{ paddingLeft: "1rem" }}>
              <Button
                type="primary"
                disabled={disableAddRatingButton() || loading}
                onClick={() => handleSubmit()}
                loading={loading}
              >
                Add
              </Button>
            </Col>
          </Row>
        </>
      </Form>
    </Modal>
  );
}

export default AddRatingModal;
