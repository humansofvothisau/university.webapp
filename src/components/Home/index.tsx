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
  return config.SCHEDULE ? (
    <div className="countdown-wrapper">
      {xl ? (
        <Row gutter={{ md: 16, lg: 24 }}>
          <Col className="gutter-row" span={12}>
            <Countdown />
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="lich-thi center">
              <Schedule />
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col className="gutter-row" span={24}>
              <Countdown />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col className="gutter-row" span={24}>
              <div className="lich-thi center">
                <Schedule />
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  ) : (
    <div className="countdown-wrapper" style={{ marginTop: "10vh" }}>
      <Row>
        <Col className="gutter-row" span={24}>
          <Countdown />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
