import apiClient from './apiClient';

export const login = async (payload) => {
  const { data } = await apiClient.post('/auth/login', payload);
  return data.data;
};
