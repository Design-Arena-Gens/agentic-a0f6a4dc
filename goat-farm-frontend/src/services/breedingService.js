import apiClient from './apiClient';

export const listBreedingRecords = async () => {
  const { data } = await apiClient.get('/breeding');
  return data.data;
};

export const createBreedingRecord = async (payload) => {
  const { data } = await apiClient.post('/breeding', payload);
  return data.data;
};
