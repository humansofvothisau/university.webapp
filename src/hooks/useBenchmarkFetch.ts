import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import IBenchmark from "../interfaces/IBenchmark";
import IUniversity from "../interfaces/IUniversity";
import { getUniversities, getUniversity } from "../utils/dbUtils";

const initialState = [] as Array<IBenchmark>;

export const useBenchmarkFetch = (uniCode: string) => {
  const [uni, setUni] = useState<IUniversity>({} as IUniversity);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const fetchBenchmark = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const universitiesList = await getUniversities();
      if (!universitiesList || universitiesList.length === 0) {
        history.push(`/university?search=${uniCode}`);
      }

      const uniData = await getUniversity(uniCode);

      if (uniData === undefined) {
        throw new Error("404");
      }

      setUni(uniData);
      const benchmarkData = await api.fetchBenchmarks(uniData.url);
      setState(benchmarkData);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  }, [uniCode]);

  useEffect(() => {
    fetchBenchmark();
  }, [fetchBenchmark]);

  return { uni, state, loading, error };
};
