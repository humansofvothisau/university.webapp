import { useCallback, useEffect, useState } from "react";
import api from "../api";
import IBenchmark from "../interfaces/IBenchmark";
import IUniversity from "../interfaces/IUniversity";
import { getUniversity } from "../utils/dbUtils";

const initialState = [] as Array<IBenchmark>;

export const useBenchmarkFetch = (uniCode: string) => {
  const [uni, setUni] = useState<IUniversity>({} as IUniversity);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBenchmark = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
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
