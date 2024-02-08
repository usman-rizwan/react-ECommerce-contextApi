import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined ,PhoneOutlined ,MailOutlined } from "@ant-design/icons";
import "./style.scss";
import { Link } from "react-router-dom";
import { runes } from 'runes2';

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SignupForm = ({ registerUser }) => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Signup Form</h1>
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
          onFinish={registerUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="user_name"
            hasFeedback
            validateDebounce={1000}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
              {
                max:15,
              },
              {
               pattern:/^[a-zA-Z]+$/ ,
                message:"Numbers and special charachters not allowed"
              },
              
            ]}
          >
            <Input
        count={{
          show: true,
        max:15,
          strategy: (txt) => runes(txt).length,
        }}
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Enter your name"
      />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            validateDebounce={1000}
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
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Phone Number"
            name="phone_number"
            validateDebounce={1000}
            rules={[
              {
                min: 11,
                pattern:
                /^(03\d{9})$/,
                message: "Enter 11 digits valid phone number",
              },
              {
                required: true,
                message: "Please input your phone number!",
              },
            
            ]}
          >
            <Input  prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="03112222222" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            validateDebounce={1000}
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-blue-500"
            >
              Sign In
            </Button>
            <div className="flex justify-center mt-5">
              Or{" "}
              <span className="ml-2 text-blue-400">
                {" "}
                <Link to={"/login"}> Login now!</Link>{" "}
              </span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default SignupForm;
