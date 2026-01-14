export type Role = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department?: string;
  managerId?: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  managerId: string;
  managerName: string;
  joiningDate: string;
  rating?: number;
  managerComment?: string;
  employeeComment?: string;
  ratedAt?: string;
  ratedBy?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface RatingData {
  employeeId: string;
  rating: number;
  managerComment: string;
}
