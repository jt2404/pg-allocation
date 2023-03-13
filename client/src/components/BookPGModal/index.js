import React, { useEffect, useState } from "react";
import {
  Col,
  Button,
  Row,
  Modal,
  Form,
  DatePicker,
  Input,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

function BookPGModal({
  isBookModalVisible,
  setIsBookModalVisible,
  form,
  range,
  setRange,
  loadingForBooking,
  handleSubmit,
  price,
  cost,
  setCost,
}) {
  const formStyles = {
    marginBottom: "0.7rem",
    padding: "0px",
  };
  const handleRangeChange = (date) => {
    const lowerLimit = date[0].format("YYYY-MM-DD");
    const upperLimit = date[1].format("YYYY-MM-DD");
    const ll = dayjs(date[0]);
    const ul = dayjs(date[1]);
    const diff = ul.diff(ll, "day", true) + 1;
    const cost = (price * diff) / 30;
    const dateRange = [lowerLimit, upperLimit];
    form.setFieldsValue({
      cost: parseInt(cost),
    });
    setCost(parseInt(cost));
    setRange(dateRange);
  };
  const disableBookButton = () => {
    if (range?.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  function disableDates(current) {
    return current.format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD");
  }
  const handleCancel = () => {
    setCost(0);
    setRange([]);
    form.setFieldsValue({
      cost: 0,
    });
    form.setFieldsValue({
      range: null,
    });
    setIsBookModalVisible(false);
  };
  return (
    <Modal
      title="Book PG"
      open={isBookModalVisible}
      maskClosable={false}
      closable={false}
      width="30%"
      footer={null}
    >
      <Form
        name="Book PG Form"
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
                    Select Range
                  </div>
                }
                name="range"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={formStyles}
              >
                <RangePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  defaultValue={range}
                  onChange={(date) => handleRangeChange(date)}
                  disabledDate={(current) => disableDates(current)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label={
                  <div style={{ fontWeight: 600, fontSize: "12px" }}>
                    Total Price
                  </div>
                }
                name="cost"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={formStyles}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled={true}
                  defaultValue={cost}
                />
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
              disabled={disableBookButton() || loadingForBooking}
              onClick={() => handleSubmit()}
              loading={loadingForBooking}
            >
              Book
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default BookPGModal;
