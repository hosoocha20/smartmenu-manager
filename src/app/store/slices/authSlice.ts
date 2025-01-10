'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
interface Category {
  id: number;
  name: string;
  active: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      // state.restaurant = null;
    },

  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

//state.restaurant = normalizeRestaurantData(action.payload.restaurant);