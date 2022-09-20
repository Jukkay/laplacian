import axios, {
  AxiosResponse
} from "axios";

interface RetryRequest extends AxiosResponse {
  _retry: boolean;
}

// Initialize basic axios connection
export const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});
