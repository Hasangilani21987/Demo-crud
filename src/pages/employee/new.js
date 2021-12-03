import { Button, Layout, Menu, Form, Upload, Input } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import useEmployeeStore from "../../Store/store";
import { app } from "../../../Firebase";
import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const { Header, Sider, Content } = Layout;
const storage = getStorage(app);
const db = getFirestore(app);

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

const New = () => {
  const [collapsed, setcollapsed] = useState(false);
  const employeeStore = useEmployeeStore();

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  console.log(employeeStore.employee);

  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    filename: "",
    Image: [],
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const [form] = Form.useForm();

  const uploadImage = (file) => {
    // console.log(file);

    const storageRef = ref(storage, `Images/${file.file.name}`);

    uploadBytes(storageRef, file.file)
      .then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            setState({
              ...state,
              filename: file.file.name,
              Image: [
                {
                  uid: "1",
                  name: `${file.file.name}`,
                  status: "done",
                  url: url,
                },
              ],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeImage = () => {
    const storageRef = ref(storage, `Images/${state.filename}`);

    deleteObject(storageRef)
      .then(() => {
        setState({
          ...state,
          Image: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePreview = () => {};

  const onFinish = async () => {
    const data = {
      first_name: state.fname,
      last_name: state.lname,
      email: state.email,
      address: state.address,
      employeeImage: state.Image[0]?.url,
      filename: state.filename,
    };

    const docRef = await addDoc(collection(db, "Employee"), data);

    if (docRef) {
      form.resetFields();
      setState({
        filename: "",
        Image: [],
      });

      employeeStore.addEmployee(data);
    }
  };

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
              <h4>{`Employee/New`}</h4>

              <Form
                {...formItemLayout}
                hideRequiredMark
                onFinish={onFinish}
                scrollToFirstError
                style={{ marginTop: 25 }}
                form={form}
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
                      type: "email",
                      message: "Please input Email!",
                    },
                  ]}
                  //   initialValue={this.state.name}
                  hasFeedback
                >
                  <Input type="email" onChange={onChange} />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
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
                    fileList={state.Image}
                    onPreview={handlePreview}
                    onRemove={removeImage}
                  >
                    {state.Image.length === 0 ? uploadButton : null}
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

export default New;
