import React from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, EyeOutlined } from "@ant-design/icons";
import "./LoginComponent.scss";
import { Redirect, useHistory } from "react-router";
import { API } from "../../api/api";
import { useAuth } from "../../auth-context";

const LoginComponent = () => {
  const { login } = useAuth();
  const history = useHistory();

  const loginSuccess = async (response) => {
    message.success("You successfully logged in");
    await login();
    sessionStorage.setItem("user", JSON.stringify(response.user.email));
    return history.push("/dashboard");
  };

  const onFinish = async (values) => {
    const response = await API.authentication.login(
      values.email,
      values.password
    );
    switch (response.message) {
      case "success":
        loginSuccess(response);
        break;
      case "user not found":
        message.warning("Your email or password is wrong") && (
          <Redirect to="/" />
        );
        break;
      case "wrong password":
        message.warning("Your email or password is wrong") && (
          <Redirect to="/" />
        );
        break;
      default:
        message.error("Error occurred when logging in") && <Redirect to="/" />;
        break;
    }
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="login-form">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              className="username-input"
            />
          </Form.Item>
          <Form.Item
            className="input-bar"
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
