// Generated by https://quicktype.io

export interface AuthResponse {
  status: string;
  message: null;
  data: Data;
  errors: Errors;
}

export interface Errors {
  name: Array<String>;
  email: Array<String>;
  password: Array<String>;
}

export interface Data {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
}


