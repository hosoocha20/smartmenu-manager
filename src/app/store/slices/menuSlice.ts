'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface MenuState {
    menus: Record<number, { id: number; name: string }>;
    categories: Record<number, { id: number; name: string; active: boolean }>;
    subcategories: Record<number, { id: number; name: string; categoryId: number; active: boolean }>;
    products: Record<number, { id: number; name: string; price: number; subcategoryId?: number; categoryId: number }>;
    labels: Record<number, { id: number; name: string }>;
    productLabels: { productId: number; labelId: number }[];
    productOptions: Record<number, { id: number; productId: number; name: string }>;
    optionDetails: Record<number, { id: number; productOptionId: number; name: string; additionalPrice: number }>;
  }

interface Category {
    id: number;
    name: string;
    active: boolean;
  }


  const initialState: MenuState = {
      menus: {},
      categories: {},
      subcategories: {},
      products: {},
      labels: {},
      productLabels: [],
      productOptions: {},
      optionDetails: {},
   
  };

  const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuData(state, action: PayloadAction<any>) {
            return action.payload;
          },
      addCategoryToMenu(state, action: PayloadAction<Category>) {
        const category = action.payload;
        if (state && state.categories) {
          state.categories[category.id] = category;
        }
      },
      deleteCategoryToMenu(state, action: PayloadAction<{ categoryId: number }>) {
        const { categoryId } = action.payload;
        delete state.categories[categoryId]; 
      },
    },
  });
  
  export const { setMenuData, addCategoryToMenu, deleteCategoryToMenu } = menuSlice.actions;
  export default menuSlice.reducer;