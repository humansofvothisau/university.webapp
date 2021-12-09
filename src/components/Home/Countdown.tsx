import { ClockCircleFilled } from "@ant-design/icons";
import { Alert } from "antd";
import React from "react";
import config from "../../config";
import { useCountdown } from "../../hooks/useCountdown";
import { useQuoteFetch } from "../../hooks/useQuoteFetch";
import { convertTimeString } from "../../utils/dateUtils";

const Countdown: React.FC = () => {
  // const timeTillDate = "2022-07-07T07:30:00+0700"; // yyyy-MM-dd
  const timeTillDate = config.THPT_DATE;
  const timeTillString = convertTimeString(new Date(timeTillDate));

  const { days, hours, minutes, seconds } = useCountdown(timeTillDate);
  const { quote, error } = useQuoteFetch();
  return (
    <>
      <div className="center">
        <h2>Kỳ thi tốt nghiệp THPT {new Date(timeTillDate).getFullYear()}</h2>
        {days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
          <>
            <div className="countdown-end">
              <h3>Đang diễn ra!!</h3>
              <p>Chúc các bạn có một kỳ thi thật tốt nhé!</p>
            </div>
          </>
        ) : (
          <>
            <div className="countdown-item">
              <span className="number">{days}</span>
              <span> ngày</span>
            </div>
            <div className="countdown-item">
              <span className="number">{hours}</span>
              <span> giờ</span>
            </div>
            <div className="countdown-item">
              <span className="number">{minutes}</span>
              <span> phút</span>
            </div>
            <div className="countdown-item">
              <span className="number">{seconds}</span>
              <span> giây</span>
            </div>
            <div className="date">
              <ClockCircleFilled /> Ngày thi dự kiến:
              <strong style={{ marginLeft: "5px", fontSize: "20px" }}>
                {timeTillString}
              </strong>
            </div>
          </>
        )}
      </div>
      {error ? (
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
              <p>Chi tiết lỗi: {error}</p>
            </div>
          }
        />
      ) : quote ? (
        <Alert
          className="quote-display"
          type="info"
          message={quote.quote}
          description={<em>-{quote.author}-</em>}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Countdown;
