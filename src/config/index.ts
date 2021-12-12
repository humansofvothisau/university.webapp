const parseEnvString = (key: string): string | undefined => {
  return process.env[key];
};

// const parseEnvNumber = (key: string): number | undefined => {
//   if (process.env[key]) {
//     return Number(process.env[key]);
//   }
//   return undefined;
// };

const parseEnvBoolean = (key: string): boolean | undefined => {
  if (process.env[key]) {
    return String(process.env[key]).toLowerCase() === "true";
  }
  return undefined;
};

interface ConfigProps {
  APP_URL: string;
  API_URL: string;
  APP_NAME: string;
  THPT_DATE: string;
  SCHEDULE: boolean;
  WP_POST_API_URL: string;
}

export default {
  APP_URL:
    parseEnvString("REACT_APP_URL") ||
    "https://university.humansofvothisau.com",
  API_URL: parseEnvString("REACT_APP_API_URL") || "",
  APP_NAME: parseEnvString("REACT_APP_NAME") || "HOV UniInfo",
  THPT_DATE: parseEnvString("REACT_APP_THPT_DATE") || "",
  SCHEDULE: parseEnvBoolean("REACT_APP_SCHEDULE") || false,
  WP_POST_API_URL: parseEnvString("REACT_APP_WP_POST_API_URL") || "",
} as ConfigProps;
