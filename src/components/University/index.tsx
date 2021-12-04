import { Button, Input, Spin, Table, Typography } from "antd";

import React, { useState } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";

import { useUniversityFetch } from "../../hooks/useUniversityFetch";
import { SearchOutlined } from "@ant-design/icons";
import Error500 from "../Error/500";
import Error from "../Error/Error";

type UniKey = {
  key: string;
  uniCode: string;
  uniName: string;
  url: string;
};

const { Search } = Input;

const Universities: React.FC = () => {
  const { state, loading, error } = useUniversityFetch();

  const [dataSource, setDataSource] = useState(state.universities);
  const [search, setSearch] = useState("");

  let { url } = useRouteMatch();
  console.log(url);

  // Columns
  const columns = [
    {
      title: "Mã trường",
      dataIndex: "uniCode",
      key: "uniCode",
    },
    {
      title: "Tên trường",
      dataIndex: "uniName",
      key: "uniName",
      render: (text: string, record: UniKey) => (
        <Link to={`${url}/${record.uniCode}`}>{text}</Link>
      ),
    },
  ];

  const searchUni = (value: string) => {
    setSearch(value);
    const searchResult = state.universities.filter(
      (uni) =>
        uni.uniCode.toLowerCase().includes(value.toLowerCase()) ||
        uni.uniName.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(searchResult);
  };

  const displayData = search ? dataSource : state.universities;

  if (error) {
    switch (error) {
      case "500":
        return <Error500 />;
      case "error":
        return <Error />;
      default:
        return <Error message={error} />;
    }
  }

  return (
    <>
      <h1>Danh sách các trường</h1>

      <div
        id="search-group"
        style={{
          marginBottom: "20px",
        }}
      >
        <Search
          placeholder="Tìm theo mã hoặc tên trường..."
          allowClear
          size="large"
          enterButton={
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          }
          onSearch={searchUni}
        />
      </div>
      {loading ? (
        <Spin tip="Đang lấy danh sách..." className="spinner">
          {/* <></> */}
        </Spin>
      ) : (
        <Table
          columns={columns}
          dataSource={displayData.map((uni) => ({
            key: uni.uniCode,
            uniCode: uni.uniCode,
            uniName: uni.uniName,
            url: uni.url,
          }))}
          bordered={true}
        />
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

export default withRouter(Universities);
