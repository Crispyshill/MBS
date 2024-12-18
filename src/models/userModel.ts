export interface RegisterUserRequest {
    email: string;
    password: string;
  }

export interface User {
  externalid: string;
  email: string;
  created_at: string;
  firstname: string;
  lastname: string;
}