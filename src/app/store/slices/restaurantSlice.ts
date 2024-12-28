'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

interface MyTableDto {
  id: number;
  tableName: string;
  capacity: number;
}

interface MenuDto {
  id: number;
  name: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    description: string;
  }>;
}

interface ThemeDto {
  primaryColor: string;
  secondaryColor: string;
  font: string;
}

interface RestaurantState {
  details: {
    id: number;
    name: string;
    address: string;
    openingTime: TimeSpan;
    closingTime: TimeSpan;
    posProvider: string;
    myTables: MyTableDto[];
    menu: MenuDto | null;
    theme: ThemeDto | null;
  } | null;
}

const initialState: RestaurantState = {
  details: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurantDetails(state, action: PayloadAction<RestaurantState['details']>) {
      state.details = action.payload;
    },
    clearRestaurantDetails(state) {
      state.details = null;
    },
  },
});

export const { setRestaurantDetails, clearRestaurantDetails } = restaurantSlice.actions;
export default restaurantSlice.reducer;