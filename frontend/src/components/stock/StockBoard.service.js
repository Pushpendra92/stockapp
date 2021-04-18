import axios from "axios";

const umApiUrl = "http://localhost:8000";

const sessionToken = JSON.parse(localStorage.getItem("accessToken"));

let headers = {
  Authorization: `Bearer ${sessionToken}`,
  "Content-Type": "application/json",
};
export const getStockData = (data) => {
  return axios.get(`${umApiUrl}/api`, { headers: headers });
};

export const updateStockData = (id, data) => {
  // return axios.get(`${umApiUrl}/api`, { headers: headers });
  return axios.put(`${umApiUrl}/api/${id}/`, data, { headers: headers })
};
