import { setUser } from '../store/slices/userSlice';
import { setMenuData } from '../store/slices/menuSlice';
import { setTheme } from '../store/slices/themeSlice';
import { AppDispatch } from '../store/store';


interface MenuCategoryDto {
  id: number;
  name: string;
  subCategories: MenuSubCategoryDto[];
  products: ProductDto[];
  active: boolean
}

interface MenuSubCategoryDto {
  id: number;
  name: string;
  products: ProductDto[];
  active:boolean;
}

interface ProductDto {
  id: number;
  name: string;
  price: number;
  active: boolean;
  soldOut: boolean;
}

interface ThemeDto {
  id: number;
  headerColor: string;
  headerTextColor: string;
  subHeaderImgUrl?: string;
  sidebarColor: string;
  sidebarTextColor: string;
  sidebarSelectedColor: string;
  bodyColor: string;
  bodyHeaderTextColor: string;
  menuItemBodyColor: string;
  menuItemTextColor: string;
  menuItemPriceColor: string;
  buttonColor: string;
  buttonTextColor: string;
  subCategoryTextColor: string;
  logoUrl: string;
}

interface NormalizedMenuState {
  menus: Record<number, { id: number; name: string }>;
  categories: Record<number, { id: number; name: string }>;
  subcategories: Record<number, { id: number; name: string; categoryId: number }>;
  products: Record<number, { id: number; name: string; price: number; active: boolean; soldOut: boolean }>;
}

export const normalizeAndSetData = (backendData: any, dispatch: AppDispatch) => {
  const {
    email,
    fullName,
    dateRegistered,
    restaurant: {
      id,
      name,
      address,
      openingTime,
      closingTime,
      posProvider,
      menu,
      theme,
    },

    
  } = backendData;

  // Dispatch User
  dispatch(
    setUser({
      email,
      fullname: fullName,
      dateRegistered,
      restaurantId: id,
      address,
      openingTime: openingTime.toString(),
      closingTime: closingTime.toString(),
      name,
      posProvider,
    })
  );

  // Normalize Menu
  const normalizedMenu: NormalizedMenuState = {
    menus: { [menu.id]: { id: menu.id, name: menu.name } },
    categories: menu.categories?.reduce((acc: Record<number, { id: number; name: string, active:boolean }>, category: MenuCategoryDto) => {
      acc[category.id] = { id: category.id, name: category.name, active:category.active };
      return acc;
    }, {}) || {},  // Default to empty object if categories is undefined
    subcategories: menu.categories?.reduce((acc: Record<number, { id: number; name: string; categoryId: number, active: boolean }>, category: MenuCategoryDto) => {
      (category.subCategories || []).forEach((subCategory: MenuSubCategoryDto) => {  // Ensure subCategories is defined as an empty array if undefined
        acc[subCategory.id] = { id: subCategory.id, name: subCategory.name, categoryId: category.id, active:subCategory.active };
      });
      return acc;
    }, {}) || {},  // Default to empty object if no subcategories found
    products: menu.categories?.reduce((acc: Record<number, { id: number; name: string; price: number; active: boolean; soldOut: boolean }>, category: MenuCategoryDto) => {
      (category.products || []).forEach((product: ProductDto) => {  // Ensure products is defined as an empty array if undefined
        acc[product.id] = {
          id: product.id,
          name: product.name,
          price: product.price,
          active: product.active,
          soldOut: product.soldOut,
        };
      });
      return acc;
    }, {}) || {},  // Default to empty object if no products found
  };

  dispatch(setMenuData(normalizedMenu));

  // Dispatch Theme
  dispatch(setTheme(theme));
};
