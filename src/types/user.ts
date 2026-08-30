export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}