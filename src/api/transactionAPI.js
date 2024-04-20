import axios from 'axios';

const API_URL = 'http://localhost:8000/api/transactions';

export const getTransactions = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createTransaction = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateTransaction = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getSoldItem = async (params) => {
  const response = await axios.get(`${API_URL}/get-sold-item`, { params });
  return response.data;
};
