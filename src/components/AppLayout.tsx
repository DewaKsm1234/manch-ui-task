import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Header } from './Header';
import { Role } from '@/types';

interface AppLayoutProps {
  allowedRoles: Role[];
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  department?: string;
  managerId?: string;
}

const AUTH_KEY = 'perf_user';

export function AppLayout({ allowedRoles }: AppLayoutProps) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const redirectPath = `/${user.role}/dashboard`;
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header user={user} />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-7xl animate-fade-in">
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
}
