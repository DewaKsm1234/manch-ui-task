import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Role } from '@/types';

const CREDENTIALS = {
  admin: { email: 'admin@company.com', password: 'admin123', name: 'Alex Thompson', role: 'admin' as Role, id: 'admin-1', department: 'HR' },
  manager1: { email: 'manager1@company.com', password: 'manager123', name: 'Sarah Johnson', role: 'manager' as Role, id: 'manager-1', department: 'Engineering' },
  manager2: { email: 'manager2@company.com', password: 'manager123', name: 'Michael Chen', role: 'manager' as Role, id: 'manager-2', department: 'Marketing' },
  manager3: { email: 'manager3@company.com', password: 'manager123', name: 'Emily Davis', role: 'manager' as Role, id: 'manager-3', department: 'Sales' },
  manager4: { email: 'manager4@company.com', password: 'manager123', name: 'Robert Wilson', role: 'manager' as Role, id: 'manager-4', department: 'HR' },
  emp1: { email: 'james.smith@company.com', password: 'employee123', name: 'James Smith', role: 'employee' as Role, id: 'emp-1', department: 'Engineering', managerId: 'manager-1' },
  emp2: { email: 'emma.johnson@company.com', password: 'employee123', name: 'Emma Johnson', role: 'employee' as Role, id: 'emp-2', department: 'Engineering', managerId: 'manager-1' },
  emp3: { email: 'oliver.brown@company.com', password: 'employee123', name: 'Oliver Brown', role: 'employee' as Role, id: 'emp-3', department: 'Engineering', managerId: 'manager-1' },
  emp4: { email: 'sophia.williams@company.com', password: 'employee123', name: 'Sophia Williams', role: 'employee' as Role, id: 'emp-4', department: 'Engineering', managerId: 'manager-1' },
  emp5: { email: 'william.davis@company.com', password: 'employee123', name: 'William Davis', role: 'employee' as Role, id: 'emp-5', department: 'Engineering', managerId: 'manager-1' },

  emp6: { email: 'ava.miller@company.com', password: 'employee123', name: 'Ava Miller', role: 'employee' as Role, id: 'emp-6', department: 'Marketing', managerId: 'manager-2' },
  emp7: { email: 'benjamin.garcia@company.com', password: 'employee123', name: 'Benjamin Garcia', role: 'employee' as Role, id: 'emp-7', department: 'Marketing', managerId: 'manager-2' },
  emp8: { email: 'isabella.martinez@company.com', password: 'employee123', name: 'Isabella Martinez', role: 'employee' as Role, id: 'emp-8', department: 'Marketing', managerId: 'manager-2' },
  emp9: { email: 'lucas.anderson@company.com', password: 'employee123', name: 'Lucas Anderson', role: 'employee' as Role, id: 'emp-9', department: 'Marketing', managerId: 'manager-2' },
  emp10: { email: 'mia.taylor@company.com', password: 'employee123', name: 'Mia Taylor', role: 'employee' as Role, id: 'emp-10', department: 'Marketing', managerId: 'manager-2' },

  emp11: { email: 'henry.thomas@company.com', password: 'employee123', name: 'Henry Thomas', role: 'employee' as Role, id: 'emp-11', department: 'Sales', managerId: 'manager-3' },
  emp12: { email: 'charlotte.moore@company.com', password: 'employee123', name: 'Charlotte Moore', role: 'employee' as Role, id: 'emp-12', department: 'Sales', managerId: 'manager-3' },
  emp13: { email: 'alexander.jackson@company.com', password: 'employee123', name: 'Alexander Jackson', role: 'employee' as Role, id: 'emp-13', department: 'Sales', managerId: 'manager-3' },
  emp14: { email: 'amelia.martin@company.com', password: 'employee123', name: 'Amelia Martin', role: 'employee' as Role, id: 'emp-14', department: 'Sales', managerId: 'manager-3' },
  emp15: { email: 'daniel.lee@company.com', password: 'employee123', name: 'Daniel Lee', role: 'employee' as Role, id: 'emp-15', department: 'Sales', managerId: 'manager-3' },

  emp16: { email: 'harper.thompson@company.com', password: 'employee123', name: 'Harper Thompson', role: 'employee' as Role, id: 'emp-16', department: 'HR', managerId: 'manager-4' },
  emp17: { email: 'matthew.white@company.com', password: 'employee123', name: 'Matthew White', role: 'employee' as Role, id: 'emp-17', department: 'HR', managerId: 'manager-4' },
  emp18: { email: 'evelyn.harris@company.com', password: 'employee123', name: 'Evelyn Harris', role: 'employee' as Role, id: 'emp-18', department: 'HR', managerId: 'manager-4' },
  emp19: { email: 'joseph.clark@company.com', password: 'employee123', name: 'Joseph Clark', role: 'employee' as Role, id: 'emp-19', department: 'HR', managerId: 'manager-4' },
  emp20: { email: 'abigail.lewis@company.com', password: 'employee123', name: 'Abigail Lewis', role: 'employee' as Role, id: 'emp-20', department: 'HR', managerId: 'manager-4' },
};

const AUTH_KEY = 'perf_user';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Check if already logged in
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
        navigate(`/${user.role}/dashboard`, { replace: true });
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please enter both email and password');
      return;
    }

    // Check credentials
    const allUsers = Object.values(CREDENTIALS);
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === trimmedPassword
    );

    if (!foundUser) {
      setError('Invalid email or password');
      return;
    }

    // Store user in localStorage (without password)
    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
    navigate(`/${foundUser.role}/dashboard`, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-elevated">
            <Award className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Manch Task</h1>
          <p className="text-muted-foreground">Employee Performance Management</p>
        </div>

        {/* Login Card */}
        <div className="rounded-lg border border-border/50 bg-card p-6 shadow-elevated text-left">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm text-left font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-10 flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
