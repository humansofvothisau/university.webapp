import { useEffect, useState } from "react";
import Quote from "../interfaces/Quote";
import api from "../api";
import { getQuotes, saveQuotes, isStoredState } from "../utils/dbUtils";
import { getRandomInt } from "../utils/numberUtils";
export const useQuoteFetch = () => {
  const [quotes, setQuotes] = useState([] as Array<Quote>);
  const [quote, setQuote] = useState({} as Quote);
  const [error, setError] = useState("");

  const fetchQuotes = async () => {
    try {
      setError("");
      var fetchQuotes: Array<Quote> = [];
      if (isStoredState("quotes")) {
        fetchQuotes = await getQuotes();
      } else {
        fetchQuotes = await api.fetchQuote();
      }
      setQuotes(fetchQuotes);
      console.log(fetchQuotes);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const generateQuote = () => {
    if (quotes.length > 0) {
      var numQuote = getRandomInt(0, quotes.length);
      setQuote(quotes[numQuote]);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      const timer = setTimeout(() => {
        generateQuote();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [quotes]);

  useEffect(() => {
    if (quotes.length > 0) {
      sessionStorage.setItem("quotes", "true");
      saveQuotes(quotes);
    }
  }, [quotes]);

  return { quote, error };
};
