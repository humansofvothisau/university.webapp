import { Affix, BackTop } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React from "react";
import { withRouter } from "react-router-dom";
import Routes from "../Routes";
import BottomFooter from "./BottomFooter";
import TopHeader from "./TopHeader";

const General: React.FC = () => {
  return (
    <Layout>
      <Affix offsetTop={0}>
        <TopHeader />
      </Affix>

      <Content>
        <Routes />
      </Content>

      <BottomFooter />

      <BackTop />
    </Layout>
  );
};

export default withRouter(General);
