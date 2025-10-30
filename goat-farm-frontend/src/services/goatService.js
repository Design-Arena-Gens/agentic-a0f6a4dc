import apiClient from './apiClient';

export const listGoats = async (farmId) => {
  const { data } = await apiClient.get('/goats', { params: { farmId } });
  return data.data;
};

export const registerGoat = async (payload) => {
  const { data } = await apiClient.post('/goats', payload);
  return data.data;
};
