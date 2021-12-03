import { Button, Layout, Menu, Table, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { app } from "../../../Firebase";
import useEmployeeStore from "../../Store/store";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const { Header, Sider, Content } = Layout;
const db = getFirestore(app);

const All = (props) => {
  console.log(props);
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  //   useEffect(() => {
  //     const unsub = onSnapshot(collection(db, "Employee"), (snapshot) => {
  //       snapshot.forEach((doc) => {
  //         console.log(doc.id);
  //       });
  //     });
  //   });

//   console.log(employeeData);

  const dataSource = [
    {
      key: "1",
      photo: "",
      fname: "John Brown",
      lname: "Hassan",
      email: "email",
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ];

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lanme",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4>Employee/All</h4>
            <Link href="/employee/new">
              <Button
                style={{
                  backgroundColor: "#1DA57A",
                  color: "#fff",
                  borderColor: "#1DA57A",
                }}
              >
                Create
              </Button>
            </Link>
          </div>
          <div style={{ marginTop: 20 }}>
            <Table dataSource={dataSource} columns={columns} bordered />;
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const Data = [];
  const querySnapshot = await getDocs(collection(db, "Employee"));
  querySnapshot.forEach((doc) => {
    Data.push({
      ...doc.data(),
      _id: doc.id,
    });
  });

  return {
    props: { employeeData: Data },
  };
};

export default All;
