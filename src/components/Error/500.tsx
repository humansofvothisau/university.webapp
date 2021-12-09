import { MessageOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import config from "../../config";
const Error500: React.FC = () => (
  <HelmetProvider>
    <Helmet>
      <title>Có lỗi xảy ra - {config.APP_NAME}</title>
      <link rel="canonical" href={`${config.APP_URL}`} />
      <meta
        property="og:title"
        content={`Có lỗi xảy ra - ${config.APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Humans Of Vo Thi Sau đồng hành cùng các VTS-ers trong kỳ thi Tốt nghiệp THPT"
      />
      <meta property="og:url" content={`${config.APP_URL}`} />
      <meta name="robots" content="follow, noindex" />
    </Helmet>
    <Result
      status="500"
      title="Lỗi máy chủ"
      subTitle="Xin lỗi bạn, đã có lỗi xảy ra. Vui lòng thử lại sau."
      extra={[
        <Button
          key="reload"
          type="dashed"
          onClick={() => window.location.reload()}
          size="large"
          icon={<RedoOutlined />}
          style={{
            marginRight: "10px",
          }}
        >
          Tải lại trang
        </Button>,
        <Button
          key="message"
          type="primary"
          href="m.me/HumansVTS"
          size="large"
          icon={<MessageOutlined />}
          style={{
            marginRight: "10px",
          }}
        >
          Báo lỗi
        </Button>,
      ]}
    />
  </HelmetProvider>
);

export default Error500;
