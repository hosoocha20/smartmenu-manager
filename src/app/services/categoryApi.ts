export const createCategory = async (newCategoryName: string, isActive: boolean) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}MenuCategory/category/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategoryName,
          active: isActive,
        }),
      }
    );
    if (!response.ok) {
      // Handle HTTP errors based on response status
      let errorMessage = "An unexpected error occurred.";
      let errorData = null;

      try {
        errorData = await response.json(); 
        errorMessage =
          errorData?.message || errorMessage; // Use server-provided error message 
      } catch {
        errorMessage = "An unexpected error occurred.";
      }
    
      switch (response.status) {
        case 401:
          throw new Error("Unauthorized: Please log in to continue.");
        case 403:
          throw new Error(
            "Forbidden: You do not have permission to perform this action."
          );
        case 400:
          throw new Error(
            `Bad Request: ${errorData?.message || "Invalid data provided."}`
          );
        case 500:
          throw new Error("Server Error: Please try again later.");
        default:
          throw new Error(
            errorData?.message || "An unexpected error occurred."
          );
      }
    }

    return await response.json();
  } catch (error: any) {
    // Check if the error is a server response error
    if (error instanceof Error) {
      // Handle fetch-specific or unexpected errors
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
};


export const deleteCategory = async (categoryId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}MenuCategory/category/${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          
        }
      );
      if (!response.ok) {
        // Handle HTTP errors based on response status
        let errorMessage = "An unexpected error occurred.";
        let errorData = null;
  
        try {
          errorData = await response.json(); 
          errorMessage =
            errorData?.message || errorMessage; // Use server-provided error message 
        } catch {
          errorMessage = "An unexpected error occurred.";
        }
      
        switch (response.status) {
          case 401:
            throw new Error("Unauthorized: Please log in to continue.");
          case 403:
            throw new Error(
              "Forbidden: You do not have permission to perform this action."
            );
          case 400:
            throw new Error(
              `Bad Request: ${errorData?.message || "Invalid data provided."}`
            );
          case 500:
            throw new Error("Server Error: Please try again later.");
          default:
            throw new Error(
              errorData?.message || "An unexpected error occurred."
            );
        }
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error: any) {
      // Check if the error is a server response error
      if (error instanceof Error) {
        // Handle fetch-specific or unexpected errors
        throw new Error(error.message || "An unexpected error occurred.");
      }
    }
  };