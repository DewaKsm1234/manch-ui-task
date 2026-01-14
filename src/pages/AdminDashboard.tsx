import { Users, Star, TrendingUp, Building2 } from 'lucide-react';
import { useEmployees } from '@/context/EmployeeContext';
import { getDepartmentRatings } from '@/data/mockData';
import { StatCard } from '@/components/StatCard';
import { SimpleTable } from '@/components/SimpleTable';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboard() {
  const { employees } = useEmployees();

  const ratedEmployees = employees.filter((e) => e.rating !== undefined);
  const averageRating = ratedEmployees.length
    ? (ratedEmployees.reduce((sum, e) => sum + (e.rating || 0), 0) / ratedEmployees.length).toFixed(1)
    : '0';

  const departmentRatings = getDepartmentRatings();
  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    name: `${rating} Star`,
    value: employees.filter((e) => e.rating === rating).length,
    rating,
  }));

  const COLORS = ['hsl(0, 84%, 60%)', 'hsl(38, 92%, 50%)', 'hsl(45, 93%, 47%)', 'hsl(142, 76%, 36%)', 'hsl(173, 80%, 40%)'];
  const columns = [
    { key: 'index', label: 'Sr No.' },
    { key: 'managerName', label: 'Manager' },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'name', label: 'Name' },
    { key: 'department', label: 'Dept' },
    { key: 'rating', label: 'Rating' },
  ];

  const tableData = employees.map((emp, index) => ({
    ...emp,
    index: index + 1,
    rating: emp.rating,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of employee performance across the organization</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={employees.length}
          icon={Users}
          subtitle="Across all departments"
        />
        <StatCard
          title="Rated Employees"
          value={ratedEmployees.length}
          icon={Star}
          subtitle={`${((ratedEmployees.length / employees.length) * 100).toFixed(0)}% completion`}
        />
        <StatCard
          title="Average Rating"
          value={averageRating}
          icon={TrendingUp}
          subtitle="Out of 5 stars"
        />
        <StatCard
          title="Departments"
          value={departmentRatings.length}
          icon={Building2}
          subtitle="Active departments"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Department-wise Average Rating</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentRatings} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 5]} tickCount={6} />
                <YAxis dataKey="department" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  formatter={(value: number) => [value.toFixed(2), 'Avg Rating']}
                />
                <Bar dataKey="averageRating" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Rating Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingDistribution.filter((d) => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.rating - 1]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">All Employees</h2>
        <SimpleTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
