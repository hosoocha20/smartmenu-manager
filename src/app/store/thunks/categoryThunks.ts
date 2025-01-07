
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCategory } from '@/app/services/categoryApi';

import { addCategoryToRestaurant } from '../slices/authSlice';

export const createNewCategory = createAsyncThunk(
  'categories/createNewCategory',
  async (
    {newCategoryName, isActive }: {newCategoryName: string; isActive: boolean },
    { dispatch }
  ) => {
    try {
        const newCategory = await createCategory(newCategoryName, isActive); 
        dispatch(addCategoryToRestaurant(newCategory)); 
        return newCategory; 
      } catch (error: any) {
        console.error('Error creating category:', error); 
        throw error;
      }
  }
);


