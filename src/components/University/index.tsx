import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Table, Typography } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import config from "../../config";
import { useUniversityFetch } from "../../hooks/useUniversityFetch";
import Adsense from "../Adsense";
import Error500 from "../Error/500";
import { useQuery } from "../../hooks/useQuery";
import Error from "../Error/Error";
import { removeAccents } from "../../utils/stringUtils";

type UniKey = {
  key: string;
  uniCode: string;
  uniName: string;
  url: string;
};

const { Search } = Input;

const Universities: React.FC = () => {
  let query = useQuery();
  const { state, loading, error } = useUniversityFetch();

  const { md } = useBreakpoint();
  const [dataSource, setDataSource] = useState(state.universities);
  const [search, setSearch] = useState(query.get("search"));

  let { url } = useRouteMatch();

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
        <Link to={`${url}/${record.uniCode}?previous_search=${search}`}>
          {text}
        </Link>
      ),
    },
  ];

  const searchUni = useCallback(
    (value: string) => {
      value = removeAccents(value);
      setSearch(value);
      const searchResult = state.universities.filter(
        (uni) =>
          removeAccents(uni.uniCode)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          removeAccents(uni.uniName).toLowerCase().includes(value.toLowerCase())
      );
      setDataSource(searchResult);
    },
    [state.universities]
  );

  useEffect(() => {
    if (search) {
      searchUni(search);
    }
  }, [search, searchUni, query]);

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

  const title = `Tra cứu điểm chuẩn Đại học, Cao đẳng`;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Tra cứu điểm chuẩn của các trường Đại học và Cao đẳng trên toàn quốc mới nhất tại Humans Of Vo Thi Sau"
        />
        <title>
          {title} - {config.APP_NAME}
        </title>
        <link rel="canonical" href={`${config.APP_URL}/university`} />
        <meta property="og:title" content={`${title} - ${config.APP_NAME}`} />
        <meta
          property="og:description"
          content="Tra cứu điểm chuẩn của các trường Đại học và Cao đẳng trên toàn quốc mới nhất tại Humans Of Vo Thi Sau"
        />
        <meta property="og:url" content={`${config.APP_URL}/university`} />
      </Helmet>
      <div className="university-wrapper">
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
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
            }
            onSearch={searchUni}
            defaultValue={search ? search : ""}
          />
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
      </div>
    </>
  );
};

export default withRouter(Universities);
