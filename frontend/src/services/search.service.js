import api from "../api/axios";

export const search = async (query) => {
  const res = await api.get(`/v1/search?q=${encodeURIComponent(query)}`);
  return res.data.data;
};
