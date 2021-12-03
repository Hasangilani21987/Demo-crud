import { Button, Layout, Menu, Table, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { app } from "../../../Firebase";
import useEmployeeStore from "../../Store/store";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const { Header, Sider, Content } = Layout;
const db = getFirestore(app);

const All = () => {
  // console.log(props);
  const [collapsed, setcollapsed] = useState(false);
  const employeeStore = useEmployeeStore();
  const employee = useEmployeeStore((state) => state.employee);

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const handleDelete = async (Id) => {
    await deleteDoc(doc(db, "Employee", Id))
      .then((res) => {
        employeeStore.deleteEmployee(Id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    let Data = [];
    const querySnapshot = await getDocs(collection(db, "Employee"));
    querySnapshot.forEach((doc) => {
      Data.push({
        ...doc.data(),
        _id: doc.id,
      });
    });
    employeeStore.getEmployee(Data);
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "",
      width: "1%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Photo",
      dataIndex: "",
      key: "photo",
      width: "5%",
      render: (text, record) => {
        return <img src={record.employeeImage} />;
      },
    },
    {
      title: "Name",
      dataIndex: "",
      key: "fname",
      width: "10%",
      render: (text, record) => {
        return <h4>{record.first_name + " " + record.last_name}</h4>;
      },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: "5%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "",
      width: "5%",
      render: (text, record, index) => (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={`/employee/update/${record._id}`}>
            <EditTwoTone style={{ paddingRight: 5 }} />
          </Link>
          <DeleteTwoTone
            style={{ paddingLeft: 5, color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(record._id)}
          />
        </span>
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
            <Table
              dataSource={employee}
              columns={columns}
              bordered
              size="medium"
            />
            ;
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// export async function getServerSideProps(context) {

// };

export default All;
