import { useEffect, useState } from "react";
import api from "../api";
import IQuote from "../interfaces/IQuote";
import { getQuotes, saveQuotes } from "../utils/dbUtils";
import { getRandomInt } from "../utils/numberUtils";
import { isStoredItem } from "../utils/storageUtils";
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
