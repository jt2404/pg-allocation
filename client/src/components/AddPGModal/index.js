import { Modal,Form,Input, Row, Col,InputNumber,Select,Upload,Button} from 'antd'
import React from 'react'
import { UploadOutlined } from '@ant-design/icons';


function AddPGModal ({isModalOpen,handleCancel})  {
    const roomTypeOptions = [
        {
            value:"Non-AC",
            label:"Non AC" 
        },
        {
            value:"AC",
            label:"AC" 
        }
    ]
  return (
    <Modal title="Add PG" open={isModalOpen} onCancel={handleCancel} width="50%" footer={null}>
          <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
      <Row>
        <Col span={24}>
        <Form.Item
          label="PG Name"
          name="pgname"
          rules={[
            {
              required: true,
              message: "Please input your PG Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        </Row>

        <Row>
        <Col span={11}>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: "Please input your City!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
          <Col span={13}    style={{padding:"0px 1em" , width:"100%"}}>
        <Form.Item
          label="District"
          name="district"
          rules={[
            {
              required: true,
              message: "Please input your District!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        </Row>

          <Row>
          <Col span={8} style={{  width:"100%"}}>
          
        <Form.Item
          label="No. Rooms"
          name="norooms"
          rules={[
            {
              required: true,
              message: "Please input Number of Rooms!",
            },
          ]}
        >
          <InputNumber min={1} defaultValue={1}/>
        </Form.Item>
        </Col>
        <Col span={8} style={{padding:"0px 1em" , width:"100%"}}>
          
        <Form.Item
          label="Room Type"
          name="roomtype"
          rules={[
            {
              required: true,
              message: "Please input your room type!",
            },
          ]}
        >
          <Select options={roomTypeOptions}/>
        </Form.Item>
        </Col>
        <Col span={8} style={{padding:"0px 1em" , width:"100%"}}>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <InputNumber min={1}/>
        </Form.Item>
        </Col>
        </Row>

        

        <Row>
        <Col span={24}>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your descrition!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        </Col>
        </Row>

        <Row>
            <Col span={24}>
            <Form.Item>
            <Upload>
    <Button icon={<UploadOutlined />}>Click here to Upload Image</Button>
  </Upload>
  </Form.Item>
            </Col>
        </Row>

        
          </Form>
  </Modal>
  )
}

export default AddPGModal
