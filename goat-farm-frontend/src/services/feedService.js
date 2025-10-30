import apiClient from './apiClient';

export const listFeedStock = async (farmId) => {
  const { data } = await apiClient.get('/feed/stock', { params: { farmId } });
  return data.data;
};

export const createFeedStock = async (payload) => {
  const { data } = await apiClient.post('/feed/stock', payload);
  return data.data;
};

export const listFeedSchedule = async ({ goatId, start, end }) => {
  const { data } = await apiClient.get(`/feed/schedule/${goatId}`, {
    params: { start, end }
  });
  return data.data;
};

export const createFeedSchedule = async (payload) => {
  const { data } = await apiClient.post('/feed/schedule', payload);
  return data.data;
};
