import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('gfms_token');
const user = JSON.parse(localStorage.getItem('gfms_user') ?? 'null');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    user
  },
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('gfms_token', action.payload.token);
      localStorage.setItem('gfms_user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('gfms_token');
      localStorage.removeItem('gfms_user');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
