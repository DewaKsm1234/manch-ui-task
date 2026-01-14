import { Employee } from '@/types';
const managers = [
  { id: 'manager-1', name: 'Sarah Johnson', department: 'Engineering' },
  { id: 'manager-2', name: 'Michael Chen', department: 'Marketing' },
  { id: 'manager-3', name: 'Emily Davis', department: 'Sales' },
  { id: 'manager-4', name: 'Robert Wilson', department: 'HR' },
];

export const mockEmployees: Employee[] = [
  { id: 'emp-1', employeeId: 'EMP1001', name: 'James Smith', email: 'james.smith@company.com', department: 'Engineering', managerId: 'manager-1', managerName: 'Sarah Johnson', joiningDate: '2022-01-15', rating: 5, managerComment: 'Outstanding performance', employeeComment: 'Thank you!' },
  { id: 'emp-2', employeeId: 'EMP1002', name: 'Emma Johnson', email: 'emma.johnson@company.com', department: 'Engineering', managerId: 'manager-1', managerName: 'Sarah Johnson', joiningDate: '2022-03-20', rating: 4, managerComment: 'Great work this quarter', employeeComment: undefined },
  { id: 'emp-3', employeeId: 'EMP1003', name: 'Oliver Brown', email: 'oliver.brown@company.com', department: 'Engineering', managerId: 'manager-1', managerName: 'Sarah Johnson', joiningDate: '2021-08-10', rating: 3, managerComment: 'Meets expectations', employeeComment: 'Will improve' },
  { id: 'emp-4', employeeId: 'EMP1004', name: 'Sophia Williams', email: 'sophia.williams@company.com', department: 'Engineering', managerId: 'manager-1', managerName: 'Sarah Johnson', joiningDate: '2023-02-01', rating: undefined, managerComment: undefined, employeeComment: undefined },
  { id: 'emp-5', employeeId: 'EMP1005', name: 'William Davis', email: 'william.davis@company.com', department: 'Engineering', managerId: 'manager-1', managerName: 'Sarah Johnson', joiningDate: '2022-11-05', rating: 4, managerComment: 'Good progress', employeeComment: undefined },
  
  { id: 'emp-6', employeeId: 'EMP1006', name: 'Ava Miller', email: 'ava.miller@company.com', department: 'Marketing', managerId: 'manager-2', managerName: 'Michael Chen', joiningDate: '2021-06-12', rating: 5, managerComment: 'Excellent creativity', employeeComment: 'Grateful for feedback' },
  { id: 'emp-7', employeeId: 'EMP1007', name: 'Benjamin Garcia', email: 'benjamin.garcia@company.com', department: 'Marketing', managerId: 'manager-2', managerName: 'Michael Chen', joiningDate: '2022-09-18', rating: 3, managerComment: 'Consistent work', employeeComment: undefined },
  { id: 'emp-8', employeeId: 'EMP1008', name: 'Isabella Martinez', email: 'isabella.martinez@company.com', department: 'Marketing', managerId: 'manager-2', managerName: 'Michael Chen', joiningDate: '2023-01-08', rating: 4, managerComment: 'Strong team player', employeeComment: 'Thank you!' },
  { id: 'emp-9', employeeId: 'EMP1009', name: 'Lucas Anderson', email: 'lucas.anderson@company.com', department: 'Marketing', managerId: 'manager-2', managerName: 'Michael Chen', joiningDate: '2021-12-22', rating: 2, managerComment: 'Needs improvement', employeeComment: 'Working on it' },
  { id: 'emp-10', employeeId: 'EMP1010', name: 'Mia Taylor', email: 'mia.taylor@company.com', department: 'Marketing', managerId: 'manager-2', managerName: 'Michael Chen', joiningDate: '2022-07-30', rating: undefined, managerComment: undefined, employeeComment: undefined },
  
  { id: 'emp-11', employeeId: 'EMP1011', name: 'Henry Thomas', email: 'henry.thomas@company.com', department: 'Sales', managerId: 'manager-3', managerName: 'Emily Davis', joiningDate: '2021-04-05', rating: 4, managerComment: 'Great sales numbers', employeeComment: undefined },
  { id: 'emp-12', employeeId: 'EMP1012', name: 'Charlotte Moore', email: 'charlotte.moore@company.com', department: 'Sales', managerId: 'manager-3', managerName: 'Emily Davis', joiningDate: '2022-05-14', rating: 5, managerComment: 'Top performer', employeeComment: 'Appreciate it!' },
  { id: 'emp-13', employeeId: 'EMP1013', name: 'Alexander Jackson', email: 'alexander.jackson@company.com', department: 'Sales', managerId: 'manager-3', managerName: 'Emily Davis', joiningDate: '2023-03-27', rating: 3, managerComment: 'Good potential', employeeComment: undefined },
  { id: 'emp-14', employeeId: 'EMP1014', name: 'Amelia Martin', email: 'amelia.martin@company.com', department: 'Sales', managerId: 'manager-3', managerName: 'Emily Davis', joiningDate: '2021-10-11', rating: undefined, managerComment: undefined, employeeComment: undefined },
  { id: 'emp-15', employeeId: 'EMP1015', name: 'Daniel Lee', email: 'daniel.lee@company.com', department: 'Sales', managerId: 'manager-3', managerName: 'Emily Davis', joiningDate: '2022-08-03', rating: 4, managerComment: 'Strong closer', employeeComment: 'Thanks!' },
  
  { id: 'emp-16', employeeId: 'EMP1016', name: 'Harper Thompson', email: 'harper.thompson@company.com', department: 'HR', managerId: 'manager-4', managerName: 'Robert Wilson', joiningDate: '2021-07-19', rating: 5, managerComment: 'Exceptional support', employeeComment: 'Thank you so much!' },
  { id: 'emp-17', employeeId: 'EMP1017', name: 'Matthew White', email: 'matthew.white@company.com', department: 'HR', managerId: 'manager-4', managerName: 'Robert Wilson', joiningDate: '2022-02-28', rating: 3, managerComment: 'Reliable worker', employeeComment: undefined },
  { id: 'emp-18', employeeId: 'EMP1018', name: 'Evelyn Harris', email: 'evelyn.harris@company.com', department: 'HR', managerId: 'manager-4', managerName: 'Robert Wilson', joiningDate: '2023-04-10', rating: 4, managerComment: 'Great initiative', employeeComment: 'Appreciated!' },
  { id: 'emp-19', employeeId: 'EMP1019', name: 'Joseph Clark', email: 'joseph.clark@company.com', department: 'HR', managerId: 'manager-4', managerName: 'Robert Wilson', joiningDate: '2021-11-25', rating: undefined, managerComment: undefined, employeeComment: undefined },
  { id: 'emp-20', employeeId: 'EMP1020', name: 'Abigail Lewis', email: 'abigail.lewis@company.com', department: 'HR', managerId: 'manager-4', managerName: 'Robert Wilson', joiningDate: '2022-06-07', rating: 4, managerComment: 'Good team member', employeeComment: undefined },
];

export const getDepartmentRatings = () => {
  const deptRatings: Record<string, { total: number; count: number }> = {};
  
  mockEmployees.forEach((emp) => {
    if (emp.rating) {
      if (!deptRatings[emp.department]) {
        deptRatings[emp.department] = { total: 0, count: 0 };
      }
      deptRatings[emp.department].total += emp.rating;
      deptRatings[emp.department].count += 1;
    }
  });

  return Object.entries(deptRatings).map(([department, data]) => ({
    department,
    averageRating: Number((data.total / data.count).toFixed(2)),
    employeeCount: data.count,
  }));
};
