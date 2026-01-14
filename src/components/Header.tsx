import { useNavigate } from 'react-router-dom';
import { Award, LogOut } from 'lucide-react';
import { Role } from '@/types';

interface HeaderProps {
  user: {
    name: string;
    role: Role;
    department?: string;
  };
}

const AUTH_KEY = 'perf_user';

export function Header({ user }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate('/login', { replace: true });
  };

  const getRoleLabel = (role: Role) => {
    const labels: Record<Role, string> = {
      admin: 'Administrator',
      manager: 'Manager',
      employee: 'Employee',
    };
    return labels[role] || role;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Award className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Manch Task</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{getRoleLabel(user.role)}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
