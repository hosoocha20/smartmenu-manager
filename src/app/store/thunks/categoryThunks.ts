
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCategory, deleteCategory } from '@/app/services/categoryApi';

import { addCategoryToMenu, deleteCategoryToMenu } from '../slices/menuSlice';

export const createNewCategory = createAsyncThunk(
  'categories/createNewCategory',
  async (
    {newCategoryName, isActive }: {newCategoryName: string; isActive: boolean },
    { dispatch }
  ) => {
    try {
        const newCategory = await createCategory(newCategoryName, isActive); 
        dispatch(addCategoryToMenu(newCategory)); 
        return newCategory; 
      } catch (error: any) {
        console.error('Error creating category:', error); 
        throw error;
      }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
    'categories/deleteCategory',
    async (
      {categoryId }: {categoryId: number },
      { dispatch }
    ) => {
      try {
          const deleteCategoryResponse = await deleteCategory(categoryId); 
          console.log("Re: ", deleteCategoryResponse)
          dispatch(deleteCategoryToMenu(deleteCategoryResponse.data.id)); 
          return deleteCategoryResponse.data.Id; 
        } catch (error: any) {
          console.error('Error deleting category:', error); 
          throw error;
        }
    }
  );


