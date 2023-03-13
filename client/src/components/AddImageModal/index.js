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
import { fetchPgList } from "../../apicalls";
import axios from "axios";
import { useStore } from "../../context/pg_store";

function AddImageModal({
  isImageUploadModalVisible,
  setIsImageUploadModalVisible,
  imageData,
  setImageData,
  form,
  pgId,
}) {
    const handleCancel = () => {
        setIsImageUploadModalVisible(!isImageUploadModalVisible)
        setImageData({})
        form.resetFields()
    }
  const cardRow = {
    gutter: 16,
  };
  const formStyles = {
    marginBottom: "0.7rem",
    padding: "0px",
  };
  const { state, methods } = useStore();
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (file) => {
    setImageData((prevPgData) => {
      return { ...prevPgData, ["image"]: file };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let data = new FormData();
    data.append("pic", imageData.image);
    data.append("pgId", pgId);
    const addPicRes = await axios.post("/addPicture", data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    if (addPicRes.status === 200) {
      fetchPgList(methods.updatePgList, methods.updatePgLoader, "");
      message.success("Image uploaded successfully", 2);
      setLoading(false);
      handleCancel();
    }
  };

  const disableAddPGButton = () => {
    return !imageData?.image;
  };
  return (
    <Modal
      title={"Upload Image"}
      open={isImageUploadModalVisible}
      maskClosable={false}
      onCancel={() => handleCancel()}
      width="45%"
      footer={null}
    >
      <Form
        name="Add Image Form"
        form={form}
        size="middle"
        layout="vertical"
        className="create-req-form"
      >
        <>
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
              Upload
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddImageModal;
