import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, 
    role: null,
    currentRole: null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; 
      state.role = action.payload.role;
      if (action.payload.role.includes('admin')) {
        state.currentRole = 'admin';
      } else if (action.payload.role.includes('editor')) {
        state.currentRole = 'editor';
      } else {
        state.currentRole = 'user';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.currentRole = null;
    },
    switchRole: (state) => {
      state.currentRole = state.currentRole === 'user' ? 'admin' : 'user';
    }
    
  }
});

export const { login, logout, switchRole } = authSlice.actions;
export default authSlice.reducer;
