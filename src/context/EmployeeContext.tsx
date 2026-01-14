import { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, RatingData } from '@/types';
import { mockEmployees } from '@/data/mockData';

interface EmployeeContextType {
  employees: Employee[];
  updateRating: (data: RatingData, ratedBy: string) => boolean;
  addEmployeeComment: (employeeId: string, comment: string) => boolean;
  getEmployeeById: (employeeId: string) => Employee | undefined;
  getEmployeesByManager: (managerId: string) => Employee[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const updateRating = (data: RatingData, ratedBy: string): boolean => {
    const employee = employees.find((e) => e.employeeId === data.employeeId);
    
    if (!employee) return false;
    if (employee.rating !== undefined) return false; // Already rated

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeId === data.employeeId
          ? {
              ...emp,
              rating: data.rating,
              managerComment: data.managerComment,
              ratedAt: new Date().toISOString(),
              ratedBy,
            }
          : emp
      )
    );

    return true;
  };

  const addEmployeeComment = (employeeId: string, comment: string): boolean => {
    const employee = employees.find((e) => e.employeeId === employeeId);
    if (!employee) return false;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeId === employeeId
          ? { ...emp, employeeComment: comment }
          : emp
      )
    );

    return true;
  };

  const getEmployeeById = (employeeId: string): Employee | undefined => {
    return employees.find((e) => e.employeeId === employeeId);
  };

  const getEmployeesByManager = (managerId: string): Employee[] => {
    return employees.filter((e) => e.managerId === managerId);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        updateRating,
        addEmployeeComment,
        getEmployeeById,
        getEmployeesByManager,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}
