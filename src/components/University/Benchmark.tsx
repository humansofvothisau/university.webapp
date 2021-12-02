import {
  ArrowLeftOutlined,
  BookOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Spin, Table, Tabs, Typography } from "antd";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";

import React from "react";
import { Link, useParams } from "react-router-dom";

import { useBenchmarkFetch } from "../../hooks/useBenchmarkFetch";

import Error404 from "../Error/404";
import Error500 from "../Error/500";
import Error from "../Error/Error";

interface ParamTypes {
  uniCode: string;
}

const Benchmark: React.FC = () => {
  const { uniCode } = useParams<ParamTypes>();
  const { uni, state, loading, error } = useBenchmarkFetch(uniCode);

  // Columnns
  const columns = [
    {
      title: "Mã ngành",
      dataIndex: "majorCode",
      key: "majorCode",
      responsive: ["md"] as Breakpoint[],
    },
    {
      title: "Tên ngành",
      dataIndex: "majorName",
      key: "majorName",
    },
    {
      title: "Tổ hợp môn",
      dataIndex: "subjectGroup",
      key: "subjectGroup",
    },
    {
      title: "Điểm chuẩn",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      responsive: ["md"] as Breakpoint[],
    },
  ];

  if (error) {
    switch (error) {
      case "404":
        return (
          <Error404
            title="Không tồn tại"
            message={
              <p>
                Mã trường <strong>{uniCode}</strong> không tồn tại! Vui lòng
                kiểm tra lại hoặc quay lại trang{" "}
                <Link to="/university">xem danh sách các trường</Link>.
              </p>
            }
            buttonText="Xem danh sách các trường"
            buttonIcon={<BookOutlined />}
            buttonLink="/university"
            buttonType="primary"
          />
        );
      case "500":
        return <Error500 />;
      case "error":
        return <Error />;
      default:
        return <Error message={error} />;
    }
  }

  const breadcrumb: React.ReactNode = (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        <Link to="/university">
          <BulbOutlined /> Danh sách các trường
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>{uni.uniName}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  var iCount: number = 0;

  const noDataMessage: React.ReactNode = (
    <>
      <p>Trường {uni.uniName} hiện tại chưa công bố điểm chuẩn</p>
      <Link to="/university">
        <Button type="dashed" icon={<ArrowLeftOutlined />}>
          Quay lại xem danh sách trường
        </Button>
      </Link>
    </>
  );
  return (
    <>
      <div className="benchmark">{breadcrumb}</div>
      <h1>Điểm chuẩn - {uni.uniName}</h1>

      {loading ? (
        <Spin tip="Đang lấy dữ liệu điểm chuẩn..." className="spinner"></Spin>
      ) : state.length > 0 ? (
        <Tabs type="card">
          {state.map((benchmark) => {
            iCount = 0;
            return (
              <Tabs.TabPane tab={benchmark.year} key={benchmark.year}>
                <Table
                  columns={columns}
                  dataSource={benchmark.data.map((details) => ({
                    key: `${benchmark.year}_${details.majorCode}_${++iCount}`,
                    majorCode: details.majorCode,
                    majorName: details.majorName,
                    subjectGroup: details.subjectGroup,
                    point: details.point,
                    note: details.note,
                  }))}
                  bordered={true}
                  pagination={{ showSizeChanger: false, pageSize: 20 }}
                />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      ) : (
        <div className="horizontal-center">
          <Alert
            message="Không có dữ liệu"
            description={noDataMessage}
            type="error"
            showIcon
          />
        </div>
      )}
      <Typography.Paragraph style={{ marginTop: "20px" }}>
        Nguồn dữ liệu:{" "}
        <Typography.Link
          href="https://diemthi.tuyensinh247.com/diem-chuan.html"
          target="_blank"
        >
          TuyenSinh247
        </Typography.Link>
      </Typography.Paragraph>
    </>
  );
};

export default Benchmark;
