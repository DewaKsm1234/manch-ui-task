import { useState, useMemo, useEffect } from 'react';
import { useEmployees } from '@/context/EmployeeContext';
import { StarRating } from '@/components/StarRating';
import { Search, CheckCircle, AlertCircle, User, Calendar, Building2, X } from 'lucide-react';

interface RateEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  managerId: string;
  managerName: string;
}

export function RateEmployeeModal({ open, onOpenChange, managerId, managerName }: RateEmployeeModalProps) {
  const { getEmployeesByManager, getEmployeeById, updateRating, employees } = useEmployees();

  const [searchId, setSearchId] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<ReturnType<typeof getEmployeeById>>(undefined);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const myEmployees = useMemo(() => {
    return getEmployeesByManager(managerId);
  }, [managerId, getEmployeesByManager, employees]);

  const pendingEmployees = myEmployees.filter((e) => e.rating === undefined);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  const handleSearch = () => {
    setSearchError('');
    const trimmedId = searchId.trim().toUpperCase();
    
    if (!trimmedId) {
      setSearchError('Please enter an employee ID');
      return;
    }

    const employee = getEmployeeById(trimmedId);
    
    if (!employee) {
      setSearchError('Employee not found');
      setSelectedEmployee(undefined);
      return;
    }

    const isMyEmployee = myEmployees.some((e) => e.employeeId === trimmedId);
    if (!isMyEmployee) {
      setSearchError('This employee is not in your team');
      setSelectedEmployee(undefined);
      return;
    }

    setSelectedEmployee(employee);
    setRating(0);
    setComment('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmployee) return;

    if (rating === 0) {
      setSubmitMessage({ type: 'error', text: 'Please select a rating between 1 and 5 stars' });
      return;
    }

    if (comment.trim().length < 10) {
      setSubmitMessage({ type: 'error', text: 'Please provide a comment with at least 10 characters' });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = updateRating(
      {
        employeeId: selectedEmployee.employeeId,
        rating,
        managerComment: comment.trim(),
      },
      managerName
    );

    setIsSubmitting(false);

    if (success) {
      setSubmitMessage({ type: 'success', text: `Successfully rated ${selectedEmployee.name}` });
      setTimeout(() => {
        handleClear();
        onOpenChange(false);
      }, 1500);
    } else {
      setSubmitMessage({ type: 'error', text: 'This employee has already been rated' });
    }
  };

  const handleClear = () => {
    setSelectedEmployee(undefined);
    setSearchId('');
    setRating(0);
    setComment('');
    setSearchError('');
    setSubmitMessage(null);
  };

  const handleSelectPending = (emp: typeof selectedEmployee) => {
    if (!emp) return;
    setSearchId(emp.employeeId);
    setSelectedEmployee(emp);
    setRating(0);
    setComment('');
    setSearchError('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-prominent w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 animate-scale-in">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Rate Employee</h2>
          <p className="text-sm text-muted-foreground">Search for an employee and submit their performance rating</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Find Employee</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g., EMP1001"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  setSearchError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
            {searchError && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {searchError}
              </div>
            )}
          </div>

          {/* Quick Access - Pending Employees */}
          {!selectedEmployee && pendingEmployees.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">Quick Access - Pending Ratings</label>
              <div className="grid gap-2 sm:grid-cols-2 max-h-[150px] overflow-y-auto">
                {pendingEmployees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => handleSelectPending(emp)}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold text-sm">
                      {emp.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-foreground">{emp.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{emp.employeeId}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Employee Details & Rating Form */}
          {selectedEmployee && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-foreground">Employee Details</label>
                {selectedEmployee.rating !== undefined && (
                  <span className="text-sm text-warning font-medium flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Already Rated
                  </span>
                )}
              </div>

              {/* Employee Info Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-medium text-sm text-foreground">{selectedEmployee.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium text-sm text-foreground">{selectedEmployee.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Joining Date</p>
                    <p className="font-medium text-sm text-foreground">
                      {new Date(selectedEmployee.joiningDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Employee ID</p>
                    <p className="font-medium text-sm font-mono text-foreground">{selectedEmployee.employeeId}</p>
                  </div>
                </div>
              </div>

              {selectedEmployee.rating !== undefined ? (
                <div className="text-center py-4 border-t border-border">
                  <p className="text-muted-foreground mb-2 text-sm">Current Rating</p>
                  <StarRating rating={selectedEmployee.rating} size="lg" />
                  {selectedEmployee.managerComment && (
                    <p className="mt-3 text-sm text-muted-foreground italic">
                      "{selectedEmployee.managerComment}"
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 border-t border-border pt-4">
                  {submitMessage && (
                    <div className={`p-3 rounded-lg text-sm ${
                      submitMessage.type === 'success' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}

                  {/* Rating Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Performance Rating *</label>
                    <div className="flex items-center gap-4">
                      <StarRating
                        rating={rating}
                        size="lg"
                        interactive
                        onChange={setRating}
                      />
                      <span className="text-sm font-medium text-muted-foreground">
                        {rating > 0 ? `${rating}/5` : 'Select rating'}
                      </span>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Manager Comment *</label>
                    <textarea
                      placeholder="Provide detailed feedback about the employee's performance..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      maxLength={500}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {comment.length}/500 characters
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="h-10 px-4 rounded-md border border-input bg-background text-foreground font-medium hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Submit Rating
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
