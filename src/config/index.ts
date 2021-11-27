const parseEnvString = (key: string): string | undefined => {
  return process.env[key];
};

const parseEnvNumber = (key: string): number | undefined => {
  if (process.env[key]) {
    return Number(process.env[key]);
  }
  return undefined;
};

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
}

export default {
  APP_URL:
    parseEnvString("REACT_APP_URL") ||
    "https://university.humansofvothisau.com",
  API_URL:
    parseEnvString("REACT_APP_API_URL") ||
    "http://api.university.humansofvothisau.com/api",
  APP_NAME: parseEnvString("REACT_APP_NAME") || "HOV UniInfo",
} as ConfigProps;
