import apiClient from './apiClient';

export const fetchDashboard = async (farmId) => {
  const { data } = await apiClient.get('/dashboard', {
    params: { farmId }
  });
  return data.data;
};
