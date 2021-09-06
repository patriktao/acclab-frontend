import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, EyeOutlined } from "@ant-design/icons";
import "./LoginComponent.css";
import { Redirect } from 'react-router';

const LoginComponent = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const Login = () => {
    console.log('Successful');
    <Redirect to="/dashboard" />
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-forms">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish && Login}
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
            <Input prefix={<MailOutlined />} placeholder="Enter your email" className="username-input"/>
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
