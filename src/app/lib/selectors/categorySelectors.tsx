import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../types/selectorTypes';
import { NormalizedState } from '../normalizedUserData';

const selectCategories = (state: AppState) => state.auth.restaurant.categories || {};
const selectSubcategories = (state: AppState) => state.auth.restaurant.subcategories || {};
const selectProducts = (state: AppState) => state.auth.restaurant.products || {};

export const selectCategoryTableData = (filterStatus: boolean | null) =>
  createSelector(
    [selectCategories, selectSubcategories, selectProducts],
    (categories, subcategories, products) => {
      return Object.values(categories)
        .filter((category) => filterStatus === null || category.active === filterStatus)
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