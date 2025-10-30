import apiClient from './apiClient';

export const listFinanceRecords = async ({ farmId, start, end }) => {
  const { data } = await apiClient.get('/finance', {
    params: { farmId, start, end }
  });
  return data.data;
};

export const createFinanceRecord = async (payload) => {
  const { data } = await apiClient.post('/finance', payload);
  return data.data;
};
