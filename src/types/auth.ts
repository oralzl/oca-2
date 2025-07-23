
export interface MockUser {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: MockUser | null;
  loading: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface ResetPasswordData {
  email: string;
}

export type AuthModalType = 'login' | 'register' | 'reset' | null;
