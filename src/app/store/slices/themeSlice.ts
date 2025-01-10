'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ThemeState {
    id: number;
    bodyColor: string;
    bodyHeaderTextColor: string;
    buttonColor: string;
    buttonTextColor: string;
    headerColor: string;
    headerTextColor: string;
    logoUrl: string;
    menuItemBodyColor: string;
    menuItemPriceColor: string;
    menuItemTextColor: string;
    sidebarColor: string;
    sidebarSelectedColor: string;
    sidebarTextColor: string;
    subCategoryTextColor: string;
    subHeaderImgUrl: string | null;
  }

  const initialState: ThemeState = {
    id: 0,
    bodyColor: '#ffffff',
    bodyHeaderTextColor: '#000000',
    buttonColor: '#ff0000',
    buttonTextColor: '#ffffff',
    headerColor: '#333333',
    headerTextColor: '#ffffff',
    logoUrl: '',
    menuItemBodyColor: '#f5f5f5',
    menuItemPriceColor: '#111111',
    menuItemTextColor: '#222222',
    sidebarColor: '#cccccc',
    sidebarSelectedColor: '#aaaaaa',
    sidebarTextColor: '#000000',
    subCategoryTextColor: '#555555',
    subHeaderImgUrl: null,
  };

  const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      setTheme(state, action: PayloadAction<ThemeState>) {
        return action.payload;
      },

    },
  });
  
  export const { setTheme } = themeSlice.actions;
  export default themeSlice.reducer;