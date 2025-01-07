interface NormalizedTheme {
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

export interface NormalizedState {
    user: {
        email: string;
        fullname: string;
        dateRegistered: string;
        restaurantId: number | null;
        address: string;
        openingTime: string;
        closingTime: string;
        name: string;
        posProvider: string;
      };
    menus: Record<number, { id: number; name: string }>;
    categories: Record<number, { id: number; name: string; active: boolean }>;
    subcategories: Record<number, { id: number; name: string; categoryId: number; active: boolean }>;
    products: Record<number, { id: number; name: string; price: number; subcategoryId?: number; categoryId: number }>;
    labels: Record<number, { id: number; name: string }>;
    productLabels: { productId: number; labelId: number }[];
    productOptions: Record<number, { id: number; productId: number; name: string }>;
    optionDetails: Record<number, { id: number; productOptionId: number; name: string; additionalPrice: number }>;
    theme: Record<number, NormalizedTheme>;
  }
  
  export const normalizeRestaurantData = (data: any): NormalizedState => {
    const normalizedState: NormalizedState = {
        user: {
            email: data.email,
            fullname: data.fullName,
            dateRegistered: data.dateRegistered,
            restaurantId: data.restaurant?.id || null,
            address: data.restaurant.address,
            openingTime: data.restaurant.openingTime,
            closingTime: data.restaurant.closingTime,
            name: data.restaurant.name,
            posProvider: data.restaurant.posProvider
          },
      menus: {},
      categories: {},
      subcategories: {},
      products: {},
      labels: {},
      productLabels: [],
      productOptions: {},
      optionDetails: {},
      theme: {}
    };
  
    if (!data.restaurant) return normalizedState;

  const { restaurant } = data;



  // Normalize theme
  if (restaurant.theme) {
    normalizedState.theme[restaurant.theme.id] = {
      id: restaurant.theme.id,
      bodyColor: restaurant.theme.bodyColor,
      bodyHeaderTextColor: restaurant.theme.bodyHeaderTextColor,
      buttonColor: restaurant.theme.buttonColor,
      buttonTextColor: restaurant.theme.buttonTextColor,
      headerColor: restaurant.theme.headerColor,
      headerTextColor: restaurant.theme.headerTextColor,
      logoUrl: restaurant.theme.logoUrl,
      menuItemBodyColor: restaurant.theme.menuItemBodyColor,
      menuItemPriceColor: restaurant.theme.menuItemPriceColor,
      menuItemTextColor: restaurant.theme.menuItemTextColor,
      sidebarColor: restaurant.theme.sidebarColor,
      sidebarSelectedColor: restaurant.theme.sidebarSelectedColor,
      sidebarTextColor: restaurant.theme.sidebarTextColor,
      subCategoryTextColor: restaurant.theme.subCategoryTextColor,
      subHeaderImgUrl: restaurant.theme.subHeaderImgUrl
    };
  }

  // Normalize menu
  if (restaurant.menu) {
    const { menu } = restaurant;
    normalizedState.menus[menu.id] = { id: menu.id, name: menu.name };

    // Normalize categories
    menu.categories.forEach((category: any) => {
      normalizedState.categories[category.id] = { id: category.id, name: category.name, active: category.active };
         // Normalize products for no subcat
            // Normalize products
            category.products.forEach((product: any) => {
                normalizedState.products[product.id] = {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  categoryId: category.id,
                };
      
                // Normalize labels
                product.labels.forEach((label: any) => {
                  normalizedState.labels[label.id] = { id: label.id, name: label.name };
                  normalizedState.productLabels.push({ productId: product.id, labelId: label.id });
                });
      
                // Normalize product options
                product.options.forEach((option: any) => {
                  normalizedState.productOptions[option.id] = {
                    id: option.id,
                    productId: product.id,
                    name: option.name,
                  };
      
                  // Normalize option details
                  option.optionDetails?.forEach((detail: any) => {
                    normalizedState.optionDetails[detail.id] = {
                      id: detail.id,
                      productOptionId: option.id,
                      name: detail.name,
                      additionalPrice: detail.additionalPrice,
                    };
                  });
                });
              });
           
      // Normalize subcategories
      category.subCategories?.forEach((subcategory: any) => {
        normalizedState.subcategories[subcategory.id] = {
          id: subcategory.id,
          name: subcategory.name,
          active: subcategory.active,
          categoryId: category.id,
        };

        // Normalize products
        subcategory.products.forEach((product: any) => {
          normalizedState.products[product.id] = {
            id: product.id,
            name: product.name,
            price: product.price,
            subcategoryId: subcategory.id,
            categoryId: category.id,
          };

          // Normalize labels
          product.labels.forEach((label: any) => {
            normalizedState.labels[label.id] = { id: label.id, name: label.name };
            normalizedState.productLabels.push({ productId: product.id, labelId: label.id });
          });

          // Normalize product options
          product.options.forEach((option: any) => {
            normalizedState.productOptions[option.id] = {
              id: option.id,
              productId: product.id,
              name: option.name,
            };

            // Normalize option details
            option.optionDetails?.forEach((detail: any) => {
              normalizedState.optionDetails[detail.id] = {
                id: detail.id,
                productOptionId: option.id,
                name: detail.name,
                additionalPrice: detail.additionalPrice,
              };
            });
          });
        });
      });
    });
  }

  return normalizedState;
};