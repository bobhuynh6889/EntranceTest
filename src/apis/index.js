import { create } from "apisauce";

const api = create({
  baseURL: "http://streaming.nexlesoft.com:4000/api/",
});

export default api;
