import { useEffect, useState } from "react";
import api from "../api";
import IThptData from "../interfaces/IThptData";

const initialState = {
  data: {} as IThptData,
};

export const useThptFetch = () => {
  const [studentCode, setStudentCode] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTHPTData = async (studentCode: string) => {
    try {
      setLoading(true);
      setError("");

      const thptData = await api.fetchThptData(studentCode);

      setState({
        data: thptData,
      });
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Initial
  useEffect(() => {
    if (!studentCode) {
      setState(initialState);
    }
  }, [studentCode]);

  // Click submit button
  useEffect(() => {
    if (!studentCode) return;

    fetchTHPTData(studentCode);
    // setIsSubmit(false);
  }, [studentCode]);

  return { state, loading, error, studentCode, setStudentCode };
};
