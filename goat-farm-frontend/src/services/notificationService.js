import apiClient from './apiClient';

export const listNotifications = async () => {
  const { data } = await apiClient.get('/notifications');
  return data.data;
};

export const createNotification = async (payload) => {
  const { data } = await apiClient.post('/notifications', payload);
  return data.data;
};
