import { Button, Layout, Menu, Form, Upload, Input } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 16 },
    lg: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 12,
    },
    sm: {
      span: 24,
      offset: 12,
    },
    md: {
      span: 24,
      offset: 16,
    },
    lg: {
      span: 24,
      offset: 12,
    },
  },
};

const Update = () => {
  const [collapsed, setcollapsed] = useState(false);
  const router = useRouter();

  const { update } = router.query;

  console.log(update);

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    Image: [],
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const uploadImage = () => {};

  const removeImage = () => {};

  const handlePreview = () => {};

  const onFinish = () => {};

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Employee
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: "0px 10px" }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
            }}
          >
            <div>
              <h4>{`Employee/Update`}</h4>

              <Form
                {...formItemLayout}
                hideRequiredMark
                onFinish={onFinish}
                scrollToFirstError
                style={{ marginTop: 25 }}
              >
                <Form.Item
                  id="fname"
                  name="fname"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input First Name!",
                    },
                  ]}
                  //   initialValue={this.state.name}
                  hasFeedback
                >
                  <Input onChange={onChange} />
                </Form.Item>
                <Form.Item
                  name="lname"
                  id="lname"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Last Name!",
                    },
                  ]}
                  //   initialValue={this.state.name}
                  hasFeedback
                >
                  <Input onChange={onChange} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  id="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input Email!",
                    },
                  ]}
                  //   initialValue={this.state.name}
                  hasFeedback
                >
                  <Input onChange={onChange} />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Adress"
                  id="address"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter your Address!",
                    },
                  ]}
                  //   initialValue={this.state.name}
                  hasFeedback
                >
                  <Input onChange={onChange} />
                </Form.Item>
                <Form.Item label="Profile">
                  <Upload
                    customRequest={uploadImage}
                    multiple={false}
                    listType="picture-card"
                    // fileList={this.state.profile}
                    onPreview={handlePreview}
                    onRemove={removeImage}
                  >
                    {uploadButton}
                  </Upload>
                </Form.Item>
                <Form.Item
                  {...tailFormItemLayout}
                  style={{ textAlign: "center", marginTop: 30 }}
                >
                  <Button type="primary" htmlType="submit">
                    Create
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Update;
