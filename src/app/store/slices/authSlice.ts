'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  restaurant: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  restaurant: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; restaurant: any }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.restaurant = action.payload.restaurant;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.restaurant = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;