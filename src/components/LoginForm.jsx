import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.scss";
import { Link } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginForm = ({ loginUser }) => {
  return (
    <>
  
        <h1 className="text-center text-2xl font-bold">Login Form</h1>
        <div className="d-flex">
          <Form
            name="trigger"
            layout="vertical"
            className="login-form"
            style={{
              width: 400,
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={loginUser}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter valid email address",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Enter your email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Password must be greater than 6 charachter",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Enter your password "
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-blue-500"
              >
                Log in
              </Button>
              <div className="flex justify-center mt-5">
                Or{" "}
                <span className="ml-2 text-blue-400">
                  {" "}
                  <Link to={"/signup"}> Register now!</Link>{" "}
                </span>
              </div>
            </Form.Item>
          </Form>
        </div>
    </>
  );
};
export default LoginForm;
