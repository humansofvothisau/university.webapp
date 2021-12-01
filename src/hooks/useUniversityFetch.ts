import { useEffect, useState } from "react";

import api from "../api";

import IUniversity from "../interfaces/IUniversity";

import { getUniversities, saveUniversity } from "../utils/dbUtils";
import { isStoredItem } from "../utils/storageUtils";

const initialState = {
  universities: [] as Array<IUniversity>,
};

export const useUniversityFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUniversities = async () => {
    try {
      setError("");
      setLoading(true);

      var uni: Array<IUniversity> = [];

      // console.log(isStoredState("university"));

      if (isStoredItem("university", "session")) {
        uni = await getUniversities();
        // console.log("From IndexedDB");
      } else {
        uni = await api.fetchUniversities();
        // console.log("Call API");
      }
      setState({
        universities: uni,
      });
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (state.universities.length > 0) {
      sessionStorage.setItem("university", "true");
      saveUniversity(state.universities);
    }
  }, [state.universities]);

  return { state, loading, error };
};
