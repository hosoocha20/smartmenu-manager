'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizedState, normalizeRestaurantData } from '@/app/lib/normalizedUserData';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  restaurant: any | null;
}
/* const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  restaurant: null
} */
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  restaurant: {
    user: {
      email: "",
      fullname: "",
      dateRegistered: "",
      restaurantId:  null,
      address: "",
      openingTime: "",
      closingTime: "",
      name: "",
      posProvider: ""
    },
    menus: {},
    categories: {},
    subcategories: {},
    products: {},
    labels: {},
    productLabels: [],
    productOptions: {},
    optionDetails: {},
    theme: {},
  } as NormalizedState,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; restaurant: any }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.restaurant = normalizeRestaurantData(action.payload.restaurant);
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

//state.restaurant = normalizeRestaurantData(action.payload.restaurant);