import { Col, Row } from "antd";
import React from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
import Countdown from "./Countdown";
import "./index.less";
import Schedule from "./Schedule";
import Adsense from "../Adsense";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const Home: React.FC = () => {
  const title = `Kỳ thi Tốt nghiệp THPT ${new Date(
    config.THPT_DATE
  ).getFullYear()}`;

  const { md } = useBreakpoint();

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Humans Of Vo Thi Sau đồng hành cùng các VTS-ers trong kỳ thi Tốt nghiệp THPT"
        />
        <title>
          {title} - {config.APP_NAME}
        </title>
        <link rel="canonical" href={`${config.APP_URL}`} />
        <meta property="og:title" content={`${title} - ${config.APP_NAME}`} />
        <meta
          property="og:description"
          content="Humans Of Vo Thi Sau đồng hành cùng các VTS-ers trong kỳ thi Tốt nghiệp THPT"
        />
        <meta property="og:url" content={`${config.APP_URL}`} />
      </Helmet>
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
        {md ? (
          <></>
        ) : (
          <div
            className="ads"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Adsense />
          </div>
        )}
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
    </>
  );
};

export default Home;
