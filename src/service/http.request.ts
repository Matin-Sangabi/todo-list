import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

const app = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  delete: app.delete,
  patch: app.patch,
};

export default http;
