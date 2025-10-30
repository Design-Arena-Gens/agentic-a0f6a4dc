import { useSelector } from 'react-redux';

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  return {
    isAuthenticated: Boolean(auth.token),
    token: auth.token,
    user: auth.user
  };
};

export default useAuth;
