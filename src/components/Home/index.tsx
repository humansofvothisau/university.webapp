import React from "react";
import config from "../../config";
import { useCountdown } from "../../hooks/useCountdown";
import { useQuoteFetch } from "../../hooks/useQuoteFetch";
import { ClockCircleFilled } from "@ant-design/icons";

import "./index.less";
import { Alert } from "antd";

const Home: React.FC = () => {
  const timeTillDate = "2022-07-07T07:30:00+0700"; // yyyy-MM-dd
  const timeTillString = "07/07/2022";

  const { days, hours, minutes, seconds } = useCountdown(timeTillDate);
  const { quote, error } = useQuoteFetch();

  return (
    <>
      <div className="horizontal-center countdown-wrapper">
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
                <ClockCircleFilled /> Ngày thi dự kiến: {timeTillString}
              </div>
            </>
          )}
          {error ? (
            <span>{error}</span>
          ) : (
            <Alert
              type="info"
              message={quote.quote}
              description={
                <em>
                  <span style={{ textAlign: "right" }}>{quote.author}</span>
                </em>
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
