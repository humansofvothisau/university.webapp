import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Affix, BackTop, Drawer, Typography } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import GeneralMenu from "./Menu";
import University from "../../components/University";
import Home from "../../components/Home";
import Error404 from "../../components/Error/404";

const General: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { md } = useBreakpoint();
  return (
    <Layout>
      <Affix offsetTop={0}>
        <Header style={{ background: "white" }}>
          <nav>
            <GeneralMenu inDrawer={false} />
            <MenuOutlined
              className="bars-menu"
              onClick={() => setShowDrawer(true)}
              style={{ fontSize: "30px" }}
            />
            <Drawer
              title="HOV UniInfo"
              placement="left"
              closable={true}
              closeIcon={<CloseOutlined />}
              onClose={() => setShowDrawer(false)}
              visible={showDrawer}
              width="355px"
            >
              <GeneralMenu inDrawer={true} />
            </Drawer>
          </nav>
        </Header>
      </Affix>

      <Content>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/university">
            <University />
          </Route>

          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Content>

      <Footer
        className="horizontal-center"
        style={{
          backgroundColor: "#262f3c",
          color: "#8E99A9",
          fontSize: "14px",
        }}
      >
        <span style={{ textAlign: "center" }}>
          <Typography.Paragraph style={{ marginBottom: "0", color: "#8E99A9" }}>
            Phát triển bởi
            <Typography.Link
              // style={{ marginLeft: 3.5, marginRight: 3.5 }}
              href="https://www.facebook.com/phongntse/"
              rel="noreferrer"
              target="_blank"
              style={{ color: "#8E99A9" }}
            >
              {" "}
              Nguyễn Trần Phong{" "}
            </Typography.Link>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ marginBottom: "0", color: "#8E99A9" }}>
            © 2021{" "}
            <Typography.Link
              href="https://humansofvothisau.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#8E99A9" }}
            >
              Humans Of Vo Thi Sau
            </Typography.Link>
          </Typography.Paragraph>
        </span>
      </Footer>

      <BackTop />
    </Layout>
  );
};

export default withRouter(General);
