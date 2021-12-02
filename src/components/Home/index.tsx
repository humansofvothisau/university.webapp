import React from "react";
import config from "../../config";

import Countdown from "./Countdown";
import Schedule from "./Schedule";

import "./index.less";
import { Alert, Button, Col, Image, Row, Space } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
// import scheduleImg from "../../assets/images/Lich-thi-THPTQG.png";

const Home: React.FC = () => {
  const { xl } = useBreakpoint();
  return (
    <div className="home-wrapper">
      <div
        className="countdown-wrapper"
        style={{ marginTop: config.SCHEDULE ? "" : "10vh" }}
      >
        <Row>
          <Col className="gutter-row" span={24}>
            <Countdown />
          </Col>
        </Row>
      </div>
      {config.SCHEDULE ? (
        <Row style={{ marginTop: "20px" }}>
          <Col className="gutter-row" span={24}>
            <div className="lich-thi center">
              <Schedule />
            </div>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
