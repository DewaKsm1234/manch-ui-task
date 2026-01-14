import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { useEmployees } from '@/context/EmployeeContext';
import { StatCard } from '@/components/StatCard';
import { SimpleTable } from '@/components/SimpleTable';
import { RateEmployeeModal } from '@/components/RateEmployeeModal';
import { Role } from '@/types';

interface OutletContext {
  user: {
    id: string;
    name: string;
    role: Role;
    department?: string;
  };
}

export default function ManagerDashboard() {
  const { user } = useOutletContext<OutletContext>();
  const { getEmployeesByManager, employees } = useEmployees();
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  const myEmployees = useMemo(() => {
    return getEmployeesByManager(user.id);
  }, [user.id, getEmployeesByManager, employees]);

  const ratedEmployees = myEmployees.filter((e) => e.rating !== undefined);
  const pendingRatings = myEmployees.filter((e) => e.rating === undefined);
  const averageRating = ratedEmployees.length
    ? (ratedEmployees.reduce((sum, e) => sum + (e.rating || 0), 0) / ratedEmployees.length).toFixed(1)
    : '0';

  const columns = [
    { key: 'index', label: 'Sl No' },
    { key: 'employeeId', label: 'Emp ID' },
    { key: 'name', label: 'Name' },
    { key: 'rating', label: 'Rating' },
    { key: 'managerComment', label: 'Manager Comment' },
    { key: 'employeeComment', label: 'Employee Comment' },
  ];

  const tableData = myEmployees.map((emp, index) => ({
    ...emp,
    index: index + 1,
    rating: emp.rating,
    managerComment: emp.managerComment || '-',
    employeeComment: emp.employeeComment || '-',
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manager Dashboard</h1>
          <p className="text-muted-foreground">Manage your team's performance and ratings</p>
        </div>
        <button
          onClick={() => setIsRateModalOpen(true)}
          className="flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors w-full sm:w-auto"
        >
          <Star className="h-4 w-4" />
          Rate Employee
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Team Size"
          value={myEmployees.length}
          icon={Users}
          subtitle="Direct reports"
        />
        <StatCard
          title="Rated"
          value={ratedEmployees.length}
          icon={CheckCircle}
          subtitle={`${pendingRatings.length} pending`}
        />
        <StatCard
          title="Team Average"
          value={averageRating}
          icon={Star}
          subtitle="Out of 5 stars"
        />
        <StatCard
          title="Completion"
          value={`${myEmployees.length > 0 ? Math.round((ratedEmployees.length / myEmployees.length) * 100) : 0}%`}
          icon={TrendingUp}
          subtitle="Ratings completed"
        />
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-card text-left">
        <h2 className="text-lg font-semibold text-foreground mb-4">My Team</h2>
        <SimpleTable columns={columns} data={tableData} />
      </div>

      <RateEmployeeModal 
        open={isRateModalOpen} 
        onOpenChange={setIsRateModalOpen}
        managerId={user.id}
        managerName={user.name}
      />
    </div>
  );
}
