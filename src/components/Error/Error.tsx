import { MessageOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import config from "../../config";
type Props = {
  message?: string;
};
const Error: React.FC<Props> = ({ message }) => {
  const subTitleDisplay = (
    <div>
      <p>Đã có lỗi xảy ra trong quá trình lấy dữ liệu. Vui lòng thử lại sau.</p>
      {message ? (
        <p>
          Nội dung: <em>{`${message}`}</em>
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
  return (
    <HelmetProvider>
      <Helmet>
        <title>Có lỗi xảy ra - {config.APP_NAME}</title>
        <link rel="canonical" href="https://university.humansofvothisau.com" />
        <meta
          property="og:title"
          content={`Có lỗi xảy ra - ${config.APP_NAME}`}
        />
        <meta
          property="og:description"
          content="Humans Of Vo Thi Sau đồng hành cùng các VTS-ers trong kỳ thi Tốt nghiệp THPT"
        />
        <meta
          property="og:url"
          content="https://university.humansofvothisau.com"
        />
        <meta name="robots" content="follow, noindex" />
      </Helmet>
      <Result
        status="error"
        title="Đã có lỗi xảy ra"
        subTitle={subTitleDisplay}
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
};

export default Error;
