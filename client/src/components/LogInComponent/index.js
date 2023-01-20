import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Input, Button, Checkbox, Form, message } from 'antd';
import './index.css'
const LogIn = () => {

    const navigate = useNavigate();
    const handleLocation = () => {
      navigate("/");
    };
  const onFinish = async(values) => {
    console.log('Success:', values);
    const {email, password} = userInfo;
    const res = await fetch("/signin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    })
    const data = await res.json()
    if(data?.status === 200){
        handleLocation()
    }
    else{
        message.error(data?.message)
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          {/* <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/> */}
          <img src="https://img.freepik.com/free-vector/college-student-dorm-interior-young-travelers-stopping-hostel-vector-illustration-alternative-accommodation-backpackers-house-trip-concept_74855-13027.jpg?w=900&t=st=1673976215~exp=1673976815~hmac=3fc26d704fa6a91c192e24c72efb0dd75e12aeae001aec1498c7a56c763808b5" alt="Login"/>
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the PG Allocation</p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="Email"
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password"
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LogIn