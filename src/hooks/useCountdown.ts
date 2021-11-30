import { difference } from "../utils/dateUtils";
import { useEffect, useState } from "react";

export const useCountdown = (timeTillDate: string) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const updateTime = () => {
    const then = new Date(timeTillDate);
    const now = new Date();
    const countdown = difference(now, then);
    if (countdown > 0) {
      setDays(Math.floor(countdown / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((countdown / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((countdown / 1000 / 60) % 60));
      setSeconds(Math.floor((countdown / 1000) % 60));
    } else {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return { days, hours, minutes, seconds };
};
