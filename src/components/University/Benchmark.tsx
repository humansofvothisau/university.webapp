import {
  ArrowLeftOutlined,
  BookOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  notification,
  Spin,
  Table,
  Tabs,
  Typography,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { ColumnsType } from "antd/lib/table";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import config from "../../config";
import { useBenchmarkFetch } from "../../hooks/useBenchmarkFetch";
import IBenchmarkDetail from "../../interfaces/IBenchmarkDetail";
import Adsense from "../Adsense";
import Error404 from "../Error/404";
import Error500 from "../Error/500";
import Error from "../Error/Error";

interface ParamTypes {
  uniCode: string;
}

const Benchmark: React.FC = () => {
  const { uniCode } = useParams<ParamTypes>();
  const { uni, state, loading, error } = useBenchmarkFetch(uniCode);

  const { md } = useBreakpoint();

  notification.config({
    duration: 0,
  });
  useEffect(() => {
    if (md === false) {
      notification.info({
        message: "Cảnh báo màn hình nhỏ",
        description:
          "Màn hình thiết bị của bạn có vẻ hơi nhỏ. Hãy thử xoay ngang hoặc chuyển sang một màn hình to hơn để có thể xem được đầy đủ thông tin nhất có thể nhé!",
        placement: "bottomRight",
        key: "small-screen-warning",
      });
    }
  }, [md]);

  // Columnns
  const columns: ColumnsType<IBenchmarkDetail> = [
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
      sorter: (a, b) => (a.point < b.point ? -1 : a.point === b.point ? 0 : 1),
      sortDirections: ["ascend", "descend"],
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

  const title = `Điểm chuẩn trường ${uni.uniName}`;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`Tra cứu điểm chuẩn trường ${uni.uniName} mới nhất tại Humans Of Vo Thi Sau`}
        />
        <title>
          {title} - {config.APP_NAME}
        </title>
        <link
          rel="canonical"
          href={`${config.APP_URL}/university/${uni.uniCode}`}
        />
        <meta property="og:title" content={`${title} - ${config.APP_NAME}`} />
        <meta
          property="og:description"
          content={`Tra cứu điểm chuẩn trường ${uni.uniName} mới nhất tại Humans Of Vo Thi Sau`}
        />
        <meta
          property="og:url"
          content={`${config.APP_URL}/university/${uni.uniCode}`}
        />
      </Helmet>
      <div className="benchmark-wrapper">
        <div className="benchmark">{breadcrumb}</div>
        <h1>Điểm chuẩn - {uni.uniName}</h1>
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
      </div>
    </>
  );
};

export default Benchmark;
