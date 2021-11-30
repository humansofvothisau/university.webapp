import uniConfig from "../config/university";

import Benchmark from "../interfaces/Benchmark";
import ThptData from "../interfaces/ThptData";
import University from "../interfaces/University";
import Quote from "../interfaces/Quote";

const POST = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const GET = {
  crossDomain: true,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
const PUT = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};
const DELETE = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

const apiSettings = {
  fetchUniversities: async (): Promise<Array<University>> => {
    const endpoint: string = `${uniConfig.GET_UNIVERSITY_URL}`;
    return await fetch(endpoint, { ...GET }).then((response) => {
      if (response.status === 500) {
        throw new Error("500");
      }
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    });
  },

  fetchBenchmarks: async (url: string): Promise<Array<Benchmark>> => {
    const endpoint: string = `${uniConfig.GET_BENCHMARK_BASE_URL}${url}`;
    return await fetch(endpoint, { ...GET }).then((response) => {
      if (response.status === 500) {
        throw new Error("500");
      }
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    });
  },

  fetchThptData: async (studentCode: string): Promise<ThptData> => {
    const endpoint: string = `${uniConfig.GET_THPT_BASE_URL}${studentCode}`;
    // console.log(endpoint);
    return await fetch(endpoint, { ...GET }).then((response) => {
      if (response.status === 500) {
        throw new Error("500");
      }
      if (response.status === 204) {
        throw new Error("204");
      }
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    });
  },

  fetchQuote: async (): Promise<Array<Quote>> => {
    const endpoint: string = uniConfig.GET_QUOTE_URL;
    var HttpReq = new XMLHttpRequest();
    HttpReq.open("GET", endpoint, false);
    HttpReq.send(null);
    return JSON.parse(HttpReq.responseText);
  },
};

export default apiSettings;
