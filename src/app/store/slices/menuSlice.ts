'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface MenuState {
    menus: Record<number, { id: number; name: string }>;
    categories: Record<number, { id: number; name: string; active: boolean }>;
    subcategories: Record<number, { id: number; name: string; categoryId: number; active: boolean }>;
    products: Record<number, { 
      id: number; 
      name: string; 
      price: number; 
      active: boolean; 
      soldOut: boolean; 
      subcategoryId: number | null; 
      categoryId: number; 
      labelIds: number[]; 
      optionIds: number[]; 
    }>;
    options: Record<number, { id: number; name: string; optionDetailIds: number[] }>;
    optionDetails: Record<number, { id: number; name: string; additionalPrice: number }>;
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
      options: {},
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
      deleteCategoryToMenu: (state, action: PayloadAction<number>) => {
        const categoryIdToDelete = action.payload;

        // 1. Delete Category
        delete state.categories[categoryIdToDelete];
  
        // 2. Delete Subcategories related to this Category
        for (const subCategoryId in state.subcategories) {
          if (state.subcategories[parseInt(subCategoryId)].categoryId === categoryIdToDelete) {
            delete state.subcategories[parseInt(subCategoryId)];
          }
        }
  
        // 3. Delete Products related to this Category and Subcategories
        for (const productId in state.products) {
          const product = state.products[parseInt(productId)];
          if (product.categoryId === categoryIdToDelete || product.subcategoryId === categoryIdToDelete) {
            // Delete product
            delete state.products[parseInt(productId)];
  
            // Delete related options and optionDetails
            product.optionIds.forEach((optionId) => {
              const option = state.options[optionId];
              option.optionDetailIds.forEach((optionDetailId) => {
                delete state.optionDetails[optionDetailId]; // Delete associated optionDetails
              });
              delete state.options[optionId]; // Delete option
            });
          }
        }
      },
    },
  });
  
  export const { setMenuData, addCategoryToMenu, deleteCategoryToMenu } = menuSlice.actions;
  export default menuSlice.reducer;