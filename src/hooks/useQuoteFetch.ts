import { useEffect, useState } from "react";
import IQuote from "../interfaces/IQuote";
import api from "../api";
import { getQuotes, saveQuotes } from "../utils/dbUtils";
import { isStoredItem } from "../utils/storageUtils";
import { getRandomInt } from "../utils/numberUtils";
export const useQuoteFetch = () => {
  const [quotes, setQuotes] = useState([] as Array<IQuote>);
  const [quote, setQuote] = useState({} as IQuote);
  const [error, setError] = useState("");

  const fetchQuotes = async () => {
    try {
      setError("");
      var fetchQuotes: Array<IQuote> = [];
      if (isStoredItem("quotes", "session")) {
        fetchQuotes = await getQuotes();
      } else {
        fetchQuotes = await api.fetchQuote();
      }
      setQuotes(fetchQuotes);
      var numQuote = getRandomInt(0, fetchQuotes.length);
      setQuote(fetchQuotes[numQuote]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      sessionStorage.setItem("quotes", "true");
      saveQuotes(quotes);
    }
  }, [quotes]);

  return { quote, error };
};
