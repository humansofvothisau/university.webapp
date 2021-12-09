import { Tooltip, Typography } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React from "react";

const BottomFooter: React.FC = () => {
  return (
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
          <Tooltip
            title="Software Engineering"
            overlayInnerStyle={{ fontSize: "12px" }}
          >
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
          </Tooltip>
        </Typography.Paragraph>
        <Typography.Paragraph style={{ marginBottom: "0", color: "#8E99A9" }}>
          © 2021{" "}
          <Tooltip
            title="Cộng đồng truyền thông dành cho học sinh trường THPT Võ Thị Sáu (Đất Đỏ - BRVT)"
            overlayInnerStyle={{ fontSize: "12px" }}
          >
            <Typography.Link
              href="https://humansofvothisau.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#8E99A9" }}
            >
              Humans Of Vo Thi Sau
            </Typography.Link>
          </Tooltip>
        </Typography.Paragraph>
      </span>
    </Footer>
  );
};

export default BottomFooter;
