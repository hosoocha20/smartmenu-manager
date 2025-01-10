import { createSelector } from '@reduxjs/toolkit';

import { MenuState } from '@/app/store/slices/menuSlice';
import { RootState } from '@/app/store/store';

const selectCategories = (state: RootState) => state.menu.categories || {};
const selectSubcategories = (state: RootState) => state.menu.subcategories || {};
const selectProducts = (state: RootState) => state.menu.products || {};

export const selectCategoryTableData = (filterStatus: boolean | null) =>
  createSelector(
    [selectCategories, selectSubcategories, selectProducts],
    (categories, subcategories, products) => {
      return Object.values(categories)
        .filter((category) => filterStatus === null || category.active === filterStatus)
        .sort((a, b) => b.id - a.id) 
        .map((category) => {
          // Find subcategories related to the category
          const subcategoryIds = Object.values(subcategories)
            .filter((sub) => sub.categoryId === category.id)
            .map((sub) => sub.id);

          // Count products under related subcategories
          const itemCountFromSub = Object.values(products).filter((product) =>
            product.subcategoryId && subcategoryIds.includes(product.subcategoryId)
          ).length;

          // Count products under related categories
          const itemCountFromCat = Object.values(products).filter((product) =>
            !product.subcategoryId && category.id === product.categoryId
          ).length;

          return {
            id: category.id,
            categoryName: category.name,
            subcategoryCount: subcategoryIds.length,
            itemCount: itemCountFromSub + itemCountFromCat,
            status: category.active,
          };
        });
    }
  );