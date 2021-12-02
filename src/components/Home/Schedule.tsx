import React from "react";
import { useScheduleFetch } from "../../hooks/useScheduleFetch";
import { Table } from "antd";

const Schedule: React.FC = () => {
  const { schedule, scheduleError } = useScheduleFetch();
  const columns = [
    {
      title: "",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Sáng",
      dataIndex: "morning",
      key: "morning",
    },
    {
      title: "Chiều",
      dataIndex: "afternoon",
      key: "afternoon",
    },
  ];

  return (
    <>
      <h2>Lịch thi Tốt nghiệp THPT 2022 (dự kiến)</h2>
      {scheduleError ? <span>{scheduleError}</span> : <></>}
      {schedule.schedule ? (
        <Table
          columns={columns}
          dataSource={schedule.schedule.map((sche) => ({
            key: sche.date,
            date: sche.date,
            morning: sche.morning,
            afternoon: sche.afternoon,
          }))}
          bordered={true}
          pagination={false}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Schedule;
