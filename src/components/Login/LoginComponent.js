import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, EyeOutlined } from "@ant-design/icons";
import "./LoginComponent.css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import App from "../Dashboard/Dashboard";

const LoginComponent = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-forms">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="login-form">
          <Form.Item
            /*         label="Username" */
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            className="input-bar"
            /* label="Password" */
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password
              prefix={<EyeOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
        </div>
        <div className="login-button">
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default LoginComponent;
