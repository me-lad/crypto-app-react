import { useEffect } from "react";
import { apiKey_gecko, apiQuery_gecko } from "../constants/APIs";
import axios from "axios";

const useAxiosDefault = () => {
  useEffect(() => {
    axios.defaults.headers.common["accept"] = "application/json";
    axios.defaults.headers.common[apiQuery_gecko] = apiKey_gecko;
  }, []);
};

export { useAxiosDefault };
