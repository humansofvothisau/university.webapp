import { Alert, Table } from "antd";
import React from "react";
import { useScheduleFetch } from "../../hooks/useScheduleFetch";

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
      {scheduleError ? (
        <Alert
          className="api-error-display"
          type="error"
          showIcon
          message="Lỗi!!"
          description={
            <div>
              <p>
                Đã có lỗi xảy ra! Vui lòng thử lại hoặc liên hệ với Humans Of Vo
                Thi Sau để báo lỗi.
              </p>
              <p>Chi tiết lỗi: {scheduleError}</p>
            </div>
          }
        />
      ) : schedule.schedule ? (
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
