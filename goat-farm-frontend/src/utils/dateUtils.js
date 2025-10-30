import dayjs from 'dayjs';

export const formatDate = (value, fallback = 'N/A') => {
  if (!value) return fallback;
  return dayjs(value).format('DD MMM YYYY');
};

export const today = () => dayjs().format('YYYY-MM-DD');

