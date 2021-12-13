import { RedoOutlined } from "@ant-design/icons";
import { Alert, Col, List, Row, Spin, Typography } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";
import { Helmet } from "react-helmet-async";
import { withRouter } from "react-router-dom";
import config from "../../config";
import { useThptFetch } from "../../hooks/useThptFetch";
import Adsense from "../Adsense";
import Error404 from "../Error/404";
import Error500 from "../Error/500";
import Error from "../Error/Error";
import FormSBD from "./FormSBD";
import FormTotNghiep from "./FormTotNghiep";
import "./index.less";

type THPTDataDisplay = {
  subject: string;
  point?: number;
};

const Thpt: React.FC = () => {
  const { md } = useBreakpoint();
  const { state, loading, error, studentCode, setStudentCode } = useThptFetch();
  const data = state.data;
  const displayData: Array<THPTDataDisplay> = [
    { subject: "Toán", point: data.toan },
    { subject: "Ngữ văn", point: data.nguVan },
    { subject: "Ngoại ngữ", point: data.ngoaiNgu },
    { subject: "Vật lí", point: data.vatLi },
    { subject: "Hóa học", point: data.hoaHoc },
    { subject: "Sinh học", point: data.sinhHoc },
    { subject: "KHTN", point: data.khtn },
    { subject: "Lịch sử", point: data.lichSu },
    { subject: "Địa lý", point: data.diaLi },
    { subject: "GDCD", point: data.gdcd },
    { subject: "KHXH", point: data.khxh },
  ];

  if (error) {
    switch (error) {
      case "500":
        return <Error500 />;
      case "204":
        return (
          <Error404
            title="Không tồn tại"
            message={
              <p>
                Thí sinh với số báo danh <strong>{studentCode}</strong> không
                tồn tại! Vui lòng kiểm tra lại.
              </p>
            }
            buttonText="Thử lại"
            buttonIcon={<RedoOutlined />}
            buttonLink="/tot-nghiep-thpt"
            buttonType="primary"
          />
        );
      case "error":
        return <Error />;
      default:
        return <Error message={error} />;
    }
  }

  const title = `Tra cứu điểm thi Tốt nghiệp THPT ${new Date().getFullYear()}`;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`${title} sớm và nhanh nhất tại Humans Of Vo Thi Sau`}
        />
        <title>
          {title} - {config.APP_NAME}
        </title>
        <link rel="canonical" href={`${config.APP_URL}`} />
        <meta property="og:title" content={`${title} - ${config.APP_NAME}`} />
        <meta
          property="og:description"
          content={`${title} sớm và nhanh nhất tại Humans Of Vo Thi Sau`}
        />
        <meta property="og:url" content={`${config.APP_URL}`} />
      </Helmet>
      <div className="thpt-wrap">
        <h1>Tra cứu điểm thi Tốt nghiệp THPT {new Date().getFullYear()}</h1>
        <FormSBD setStudentCode={setStudentCode} />
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
        {loading ? (
          <Spin
            tip="Đang lấy dữ liệu..."
            className="spinner"
            wrapperClassName="spinDisplay"
          ></Spin>
        ) : data.resultGroupConvert && data.resultGroupConvert.length > 0 ? (
          <div id="result" style={{ marginTop: "20px" }}>
            <h2>Kết quả thi Tốt nghiệp THPT</h2>
            <h3>
              Số báo danh: <span className="sbd">{studentCode}</span>
            </h3>
            <Row gutter={md ? 100 : {}}>
              <Col span={md ? 12 : 24}>
                <Row>
                  <Col span={24}>
                    <h4>Điểm thành phần</h4>
                    <List
                      size="default"
                      // bordered
                      dataSource={displayData}
                      renderItem={(item) =>
                        item.point && (
                          <div className="thpt-data">
                            <List.Item className="list-item">
                              <>
                                <Row gutter={16}>
                                  <Col span={14}>{item.subject}</Col>
                                  <Col span={10}>{item.point}</Col>
                                </Row>
                              </>
                            </List.Item>
                          </div>
                        )
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div
                      className="ads"
                      style={{ marginTop: "40px", marginBottom: "0px" }}
                    >
                      <Adsense />
                    </div>
                  </Col>
                </Row>
                {data.toan && data.nguVan ? (
                  <>
                    <Row>
                      <Col span={24}>
                        <div className="phongnt-border">
                          <FormTotNghiep data={data} />
                        </div>
                      </Col>
                    </Row>
                    {md ? (
                      <></>
                    ) : (
                      <Row>
                        <Col span={24}>
                          <div
                            className="ads"
                            style={{ marginTop: "40px", marginBottom: "0px" }}
                          >
                            <Adsense />
                          </div>
                        </Col>
                      </Row>
                    )}
                  </>
                ) : (
                  <Alert
                    type="warning"
                    message={
                      <>
                        Có vẻ như bạn không có đầy đủ dữ liệu bài thi{" "}
                        <strong>Toán</strong> và <strong>Ngữ văn</strong> nên
                        không thể Tính điểm xét Tốt nghiệp cho bạn được!
                      </>
                    }
                    style={{
                      marginTop: "10px",
                    }}
                  />
                )}
              </Col>
              <Col span={md ? 12 : 24} style={!md ? { marginTop: "20px" } : {}}>
                <h4>Điểm tổ hợp môn</h4>
                <List
                  size="default"
                  // bordered
                  dataSource={data.resultGroupConvert}
                  renderItem={(item) => (
                    <div className="thpt-data">
                      <List.Item className="list-item">
                        <>
                          <Row gutter={16}>
                            <Col span={14}>{item.key}</Col>
                            <Col span={10}>{item.value}</Col>
                          </Row>
                        </>
                      </List.Item>
                    </div>
                  )}
                />
              </Col>
            </Row>
          </div>
        ) : (
          <></>
        )}
        <Typography.Paragraph style={{ marginTop: "20px" }}>
          Nguồn dữ liệu:{" "}
          <Typography.Link href="https://diemthi.vnanet.vn/" target="_blank">
            TTXVN
          </Typography.Link>
        </Typography.Paragraph>
      </div>
    </>
  );
};

export default withRouter(Thpt);
