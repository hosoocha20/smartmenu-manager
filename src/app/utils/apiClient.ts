export const apiClient = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };
  
    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
  
    const response = await fetch(`${baseURL}${endpoint}`, config);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
  
    return response.json() as Promise<T>;
  };
  