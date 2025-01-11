import { setUser } from "../store/slices/userSlice";
import { setMenuData } from "../store/slices/menuSlice";
import { setTheme } from "../store/slices/themeSlice";
import { AppDispatch } from "../store/store";

interface MenuCategoryDto {
  id: number;
  name: string;
  subCategories: MenuSubCategoryDto[];
  products: ProductDto[];
  active: boolean;
}

interface MenuSubCategoryDto {
  id: number;
  name: string;
  products: ProductDto[];
  active: boolean;
}

interface ProductDto {
  id: number;
  name: string;
  price: number;
  active: boolean;
  soldOut: boolean;
  labels: LabelDto[]; 
  options: ProductOptionDto[]; 
}

interface LabelDto {
  id: number; // Unique identifier for the label
  name: string; // Label name
}

interface ProductOptionDto {
  id: number; // Unique identifier for the product option
  name: string; // Name of the product option
  optionDetails: OptionDetailDto[]; // List of detailed choices under this option
}

interface OptionDetailDto {
  id: number; // Unique identifier for the option detail
  name: string; // Name of the option detail
  additionalPrice: number; // Additional price for this detail
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
  subcategories: Record<
    number,
    { id: number; name: string; categoryId: number }
  >;
  products: Record<
    number,
    {
      id: number;
      categoryId: number;
      subcategoryId: number | null;
      name: string;
      price: number;
      active: boolean;
      soldOut: boolean;
      labelIds: number[]; 
      optionIds: number[]; 
      
    }
  >;
  options: Record<number, { id: number; name: string; optionDetailIds: number[] }>;
  optionDetails: Record<number, { id: number; name: string; additionalPrice: number }>;
}

export const normalizeAndSetData = (
  backendData: any,
  dispatch: AppDispatch
) => {
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
  // const normalizedMenu: NormalizedMenuState = {
  //   menus: { [menu.id]: { id: menu.id, name: menu.name } },
  //   categories:
  //     menu.categories?.reduce(
  //       (
  //         acc: Record<number, { id: number; name: string; active: boolean }>,
  //         category: MenuCategoryDto
  //       ) => {
  //         acc[category.id] = {
  //           id: category.id,
  //           name: category.name,
  //           active: category.active,
  //         };
  //         return acc;
  //       },
  //       {}
  //     ) || {}, // Default to empty object if categories is undefined
  //   subcategories:
  //     menu.categories?.reduce(
  //       (
  //         acc: Record<
  //           number,
  //           { id: number; name: string; categoryId: number; active: boolean }
  //         >,
  //         category: MenuCategoryDto
  //       ) => {
  //         (category.subCategories || []).forEach(
  //           (subCategory: MenuSubCategoryDto) => {
  //             // Ensure subCategories is defined as an empty array if undefined
  //             acc[subCategory.id] = {
  //               id: subCategory.id,
  //               name: subCategory.name,
  //               categoryId: category.id,
  //               active: subCategory.active,
  //             };
  //           }
  //         );
  //         return acc;
  //       },
  //       {}
  //     ) || {}, // Default to empty object if no subcategories found
  //   products:
  //     menu.categories?.reduce(
  //       (
  //         acc: Record<
  //           number,
  //           {
  //             id: number;
  //             name: string;
  //             price: number;
  //             active: boolean;
  //             soldOut: boolean;
  //             subcategoryId: number | null;
  //             categoryId: number;
  //           }
  //         >,
  //         category: MenuCategoryDto
  //       ) => {
  //         // Add products directly under the category
  //         (category.products || []).forEach((product: ProductDto) => {
  //           acc[product.id] = {
  //             id: product.id,
  //             name: product.name,
  //             price: product.price,
  //             active: product.active,
  //             soldOut: product.soldOut,
  //             subcategoryId: null,
  //             categoryId: category.id,
  //           };
  //         });

  //         // Add products under each subcategory
  //         (category.subCategories || []).forEach(
  //           (subCategory: MenuSubCategoryDto) => {
  //             (subCategory.products || []).forEach((product: ProductDto) => {
  //               acc[product.id] = {
  //                 id: product.id,
  //                 name: product.name,
  //                 price: product.price,
  //                 active: product.active,
  //                 soldOut: product.soldOut,
  //                 subcategoryId: subCategory.id,
  //                 categoryId: category.id,
  //               };
  //             });
  //           }
  //         );
  //         return acc;
  //       },
  //       {}
  //     ) || {}, // Default to empty object if no products found
  // };

  // dispatch(setMenuData(normalizedMenu));

  const normalizedMenu: NormalizedMenuState = {
    menus: { [menu.id]: { id: menu.id, name: menu.name } },
    categories:
      menu.categories?.reduce(
        (
          acc: Record<number, { id: number; name: string; active: boolean }>,
          category: MenuCategoryDto
        ) => {
          acc[category.id] = {
            id: category.id,
            name: category.name,
            active: category.active,
          };
          return acc;
        },
        {}
      ) || {}, // Default to empty object if categories is undefined
    subcategories:
      menu.categories?.reduce(
        (
          acc: Record<
            number,
            { id: number; name: string; categoryId: number; active: boolean }
          >,
          category: MenuCategoryDto
        ) => {
          (category.subCategories || []).forEach(
            (subCategory: MenuSubCategoryDto) => {
              // Ensure subCategories is defined as an empty array if undefined
              acc[subCategory.id] = {
                id: subCategory.id,
                name: subCategory.name,
                categoryId: category.id,
                active: subCategory.active,
              };
            }
          );
          return acc;
        },
        {}
      ) || {}, // Default to empty object if no subcategories found
    products:
      menu.categories?.reduce(
        (
          acc: Record<
            number,
            {
              id: number;
              name: string;
              price: number;
              active: boolean;
              soldOut: boolean;
              subcategoryId: number | null;
              categoryId: number;
              labelIds: number[];
              optionIds: number[];
            }
          >,
          category: MenuCategoryDto
        ) => {
          // Add products directly under the category
          (category.products || []).forEach((product: ProductDto) => {
            acc[product.id] = {
              id: product.id,
              name: product.name,
              price: product.price,
              active: product.active,
              soldOut: product.soldOut,
              subcategoryId: null,
              categoryId: category.id,
              labelIds: product.labels.map((label: LabelDto) => label.id), // Add label IDs
              optionIds: product.options.map((option: ProductOptionDto) => option.id), // Add option IDs
            };
          });
  
          // Add products under each subcategory
          (category.subCategories || []).forEach(
            (subCategory: MenuSubCategoryDto) => {
              (subCategory.products || []).forEach((product: ProductDto) => {
                acc[product.id] = {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  active: product.active,
                  soldOut: product.soldOut,
                  subcategoryId: subCategory.id,
                  categoryId: category.id,
                  labelIds: product.labels.map((label: LabelDto) => label.id), // Add label IDs
                  optionIds: product.options.map((option: ProductOptionDto) => option.id), // Add option IDs
                };
              });
            }
          );
          return acc;
        },
        {}
      ) || {}, // Default to empty object if no products found
    options:
      menu.categories?.reduce(
        (
          acc: Record<number, { id: number; name: string; optionDetailIds: number[] }>,
          category: MenuCategoryDto
        ) => {
          (category.products || []).forEach((product: ProductDto) => {
            product.options.forEach((option: ProductOptionDto) => {
              acc[option.id] = {
                id: option.id,
                name: option.name,
                optionDetailIds: option.optionDetails.map((detail: OptionDetailDto) => detail.id),
              };
            });
          });
  
          (category.subCategories || []).forEach((subCategory: MenuSubCategoryDto) => {
            (subCategory.products || []).forEach((product: ProductDto) => {
              product.options.forEach((option: ProductOptionDto) => {
                acc[option.id] = {
                  id: option.id,
                  name: option.name,
                  optionDetailIds: option.optionDetails.map((detail: OptionDetailDto) => detail.id),
                };
              });
            });
          });
          return acc;
        },
        {}
      ) || {}, // Default to empty object if no options found
    optionDetails:
      menu.categories?.reduce(
        (
          acc: Record<number, { id: number; name: string; additionalPrice: number }>,
          category: MenuCategoryDto
        ) => {
          (category.products || []).forEach((product: ProductDto) => {
            product.options.forEach((option: ProductOptionDto) => {
              option.optionDetails.forEach((detail: OptionDetailDto) => {
                acc[detail.id] = {
                  id: detail.id,
                  name: detail.name,
                  additionalPrice: detail.additionalPrice,
                };
              });
            });
          });
  
          (category.subCategories || []).forEach((subCategory: MenuSubCategoryDto) => {
            (subCategory.products || []).forEach((product: ProductDto) => {
              product.options.forEach((option: ProductOptionDto) => {
                option.optionDetails.forEach((detail: OptionDetailDto) => {
                  acc[detail.id] = {
                    id: detail.id,
                    name: detail.name,
                    additionalPrice: detail.additionalPrice,
                  };
                });
              });
            });
          });
          return acc;
        },
        {}
      ) || {}, // Default to empty object if no option details found
  };
  
  dispatch(setMenuData(normalizedMenu));

  // Dispatch Theme
  dispatch(setTheme(theme));
};
