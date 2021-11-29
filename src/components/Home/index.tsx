import React from "react";
import config from "../../config";
import { useCountdown } from "../../hooks/useCountdown";

import "./index.less";

const Home: React.FC = () => {
  const timeTillDate = "2022-07-07T07:30:00+0700";

  const { days, hours, minutes, seconds } = useCountdown(timeTillDate);

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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
