import apiClient from './apiClient';

export const listTasks = async ({ farmId, start, end }) => {
  const { data } = await apiClient.get('/tasks', { params: { farmId, start, end } });
  return data.data;
};

export const createTask = async (payload) => {
  const { data } = await apiClient.post('/tasks', payload);
  return data.data;
};

export const completeTask = async (taskId) => {
  const { data } = await apiClient.post(`/tasks/${taskId}/complete`);
  return data.data;
};
