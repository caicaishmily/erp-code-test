import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Col, Dropdown, Layout, Menu, Row, Space } from "antd";
import {
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { AuthContext } from "../hoc";
import { getToken } from "../utils";

const { Header, Content, Sider, Footer } = Layout;

function BasicLayout(props: {
  children: React.ReactNode; // 👈️ type children
}) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const user = getToken();

  useEffect(() => {
    if (!user || user.expire < new Date().getTime()) {
      return navigate("/signin");
    }
  }, []);

  return (
    <main>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                color: "white",
                margin: 0,
                height: 50,
                lineHeight: "50px",
              }}
            >
              xxx 后台
            </h3>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[location?.pathname]}
            mode="inline"
          >
            <Menu.Item key="/" icon={<PieChartOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="user" icon={<UserOutlined />}>
              <Link to="/user">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="shop" icon={<FileOutlined />}>
              <Link to="/shop">商铺管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: "#fff",
              height: 50,
              lineHeight: "49px",
            }}
          >
            <Row justify="end" gutter={[0, 24]}>
              <Col span={2}>
                <Dropdown
                  overlay={
                    <Menu style={{ marginTop: 12 }}>
                      <Menu.Item>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => signout(() => navigate("/signin"))}
                        >
                          退出登录
                        </a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <span onClick={(e) => e.preventDefault()}>
                    <Avatar size="small" icon={<UserOutlined />} />{" "}
                    <Space style={{ paddingLeft: 5 }}>
                      <span>Admin</span>
                    </Space>
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: "12px 0", minHeight: 360 }}
            >
              {/* <Outlet /> */}
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2022 Created by caicaishmily
          </Footer>
        </Layout>
      </Layout>
    </main>
  );
}

export default BasicLayout;
