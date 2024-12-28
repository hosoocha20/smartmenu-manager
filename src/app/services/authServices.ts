import { apiClient } from "../utils/apiClient";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const logout = async (): Promise<void> => {
  return apiClient<void>("/auth/logout", { method: "POST" });
};