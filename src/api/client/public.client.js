import axios from "axios";
import queryString from "query-string";

const baseURL = process.env.REACT_APP_API_SERVICE_URL;

const publicClient = axios.create({
  baseURL,
  paramsSerializers: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;

    return response;
  },
  (error) => {
    throw error.response.data;
  }
);

export default publicClient;
