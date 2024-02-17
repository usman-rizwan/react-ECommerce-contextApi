import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdAlternateEmail } from "react-icons/md";
const { TextArea } = Input;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const CheckOutForm = ({confirmOrder}) => {
  return (
    <>
       <div className="d-flex poppins">
                  <Form
                    name="trigger"
                    layout="vertical"
                    style={{
                      width: 400,
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={confirmOrder}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Name"
                      name="name"
                      hasFeedback
                      validateDebounce={500}
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                        {
                          pattern: /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/,
                          message: "No special characters allowed",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Enter your name"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      hasFeedback
                      validateDebounce={500}
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Enter a valid email address",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <MdAlternateEmail className="site-form-item-icon" />
                        }
                        placeholder="Enter your email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Address"
                      name="address"
                      validateDebounce={500}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address!",
                        },
                        {
                          min: 20,
                          message: "Enter valid address .Minimum 20 characters required !",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Enter your address"
                        style={{
                          height: 80,
                          resize: "none",
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button bg-blue-500 text-white mt-18 text-md poppins">
                      Confirm Now
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
    </>
  );
};
export default CheckOutForm;
