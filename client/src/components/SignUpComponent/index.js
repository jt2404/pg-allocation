import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Checkbox, Form, message } from "antd";
import './app.css'

const SignUp = () => {
  const navigate = useNavigate();
  const handleLocation = () => {
    navigate("/");
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { username, email, password,confirmPassword, phoneNo, sType  } = userInfo;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email:email,
        password:password,
        cpassword:confirmPassword,
        phone: phoneNo,
        stype:sType,
      }),
    });
    const data = await res.json();
    if (data?.status === 200) {
      handleLocation();
    } else {
      message.error(data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeOfUserRole = (e) => {
    console.log(e.target.checked);
    setUserInfo({ ...userInfo, sType: e.target.checked ? "admin" : "user" })
  }
  const [userInfo, setUserInfo] = useState({
    username:"",
    email: "",
    password: "",
    confirmPassword:"",
    phoneNo:"",
    sType:"user",
  });

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Signup"/>
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Sign Up to the PG Allocation</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="Username"
              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            />
          </Form.Item>

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

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Confirm Password"
              onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="phoneNo"
            rules={[{ required: true, message: 'Please input your phone no!' }]}
          >
            <Input
              placeholder="Phone No"
              onChange={(e) => setUserInfo({ ...userInfo, phoneNo: e.target.value })}
            />
          </Form.Item>

          <Form.Item name="remember">
            <Checkbox onChange={onChangeOfUserRole}>Sign up as PG Owner</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default SignUp;
