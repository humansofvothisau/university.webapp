import { useEffect, useState } from "react";
import api from "../api";
import IScheduleJson from "../interfaces/ISchedule";
import { getSchedule, saveSchedule } from "../utils/dbUtils";
import { isStoredItem } from "../utils/storageUtils";

export const useScheduleFetch = () => {
  const [schedule, setSchedule] = useState({} as IScheduleJson);
  const [scheduleError, setScheduleError] = useState("");

  const fetchSchedule = async () => {
    try {
      setScheduleError("");
      var fetchSchedule: IScheduleJson;
      if (isStoredItem("schedule", "session")) {
        fetchSchedule = await getSchedule();
        fetchSchedule.note = localStorage.getItem("note");
      } else {
        fetchSchedule = await api.fetchSchedule();
      }
      setSchedule(fetchSchedule);
    } catch (error: any) {
      setScheduleError(error.message);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    if (schedule && schedule.schedule && schedule.schedule.length > 0) {
      sessionStorage.setItem("schedule", "true");
      saveSchedule(schedule.schedule);
    }
  }, [schedule]);

  return { schedule, scheduleError };
};
