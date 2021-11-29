import config from "./index";

interface UniversityProps {
  GET_BENCHMARK_BASE_URL: string;
  GET_UNIVERSITY_URL: string;
  GET_THPT_BASE_URL: string;
  GET_QUOTE_URL: string;
}

export default {
  GET_BENCHMARK_BASE_URL: `${config.API_URL}/Benchmark?uniUrl=`,
  GET_UNIVERSITY_URL: `${config.API_URL}/University`,
  GET_THPT_BASE_URL: `${config.API_URL}/TotNghiepThpt/`,
  GET_QUOTE_URL: `humansofvothisau.com/university/quotes.json`,
} as UniversityProps;
