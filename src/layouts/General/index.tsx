import { Affix, BackTop, notification } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Routes from "../Routes";
import BottomFooter from "./BottomFooter";
import TopHeader from "./TopHeader";
import WpPosts from "../../components/WpPosts";

const General: React.FC = () => {
  notification.config({
    duration: 0,
  });

  useEffect(() => {
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
      document.cookie = "TestCookie";
      cookieEnabled = document.cookie.indexOf("TestCookie") !== -1;
    }
    if (!cookieEnabled) {
      notification.info({
        message: "Cookie đang không được bật",
        description:
          "Để có trải nghiệm tốt nhất, bạn vui lòng bật Cookie trên trình duyệt lên nhé! HOV đang cố gắng để cải thiện điều này hằng ngày! Cảm ơn bạn.",
        placement: "bottomRight",
        key: "cookie-warning",
      });
    }
  }, []);
  return (
    <Layout>
      <Affix offsetTop={0}>
        <TopHeader />
      </Affix>

      <Content>
        <div className="posts-marquee" style={{ marginBottom: "20px" }}>
          <WpPosts />
        </div>
        <Routes />
      </Content>

      <BottomFooter />

      <BackTop />
    </Layout>
  );
};

export default withRouter(General);
