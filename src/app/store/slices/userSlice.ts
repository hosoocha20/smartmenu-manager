'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface UserState {
    email: string;
    fullname: string;
    dateRegistered: string;
    restaurantId: number | null;
    address: string;
    openingTime: string;
    closingTime: string;
    name: string;
    posProvider: string;
  }
  
  const initialState: UserState = {
    email: '',
    fullname: '',
    dateRegistered: '',
    restaurantId: null,
    address: '',
    openingTime: '',
    closingTime: '',
    name: '',
    posProvider: '',
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action: PayloadAction<UserState>) {
        return action.payload;
      },
      clearUser() {
        return initialState;
      },
    },
  });
  
  export const { setUser, clearUser } = userSlice.actions;
  export default userSlice.reducer;