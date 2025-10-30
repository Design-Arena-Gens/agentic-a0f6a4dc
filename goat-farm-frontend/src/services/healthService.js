import apiClient from './apiClient';

export const listHealthRecords = async (goatId) => {
  const { data } = await apiClient.get('/health', { params: { goatId } });
  return data.data;
};

export const createHealthRecord = async (goatId, payload) => {
  const { data } = await apiClient.post(`/health/${goatId}`, payload);
  return data.data;
};
