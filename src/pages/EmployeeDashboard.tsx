import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useEmployees } from '@/context/EmployeeContext';
import { StarRating } from '@/components/StarRating';
import { StatCard } from '@/components/StatCard';
import { User, Calendar, Building2, MessageSquare, Send, Clock, Star } from 'lucide-react';
import { Role } from '@/types';
import EmployeeDetails from '@/components/EmployeeDetails';

interface OutletContext {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
    department?: string;
    managerId?: string;
  };
}

export default function EmployeeDashboard() {
  const { user } = useOutletContext<OutletContext>();
  const { addEmployeeComment, employees } = useEmployees();

  const [replyComment, setReplyComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const myRecord = useMemo(() => {
    const found = employees.find(
      (e) => e.email.toLowerCase() === user.email.toLowerCase()
    );
    return found || employees[0]; // Fallback for demo
  }, [user.email, employees]);

  useEffect(() => {
    setReplyComment(myRecord?.employeeComment ?? '');
  }, [myRecord?.employeeComment]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!myRecord) return;

    const trimmedComment = replyComment.trim();
    if (trimmedComment.length < 5) {
      setSubmitMessage({ type: 'error', text: 'Please write at least 5 characters' });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = addEmployeeComment(myRecord.employeeId, trimmedComment);
    setIsSubmitting(false);

    if (success) {
      setSubmitMessage({ type: 'success', text: myRecord.employeeComment ? 'Your reply has been updated' : 'Your reply has been sent to your manager' });
    } else {
      setSubmitMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }

    setTimeout(() => setSubmitMessage(null), 3000);
  };

  if (!myRecord) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Employee record not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Performance</h1>
        <p className="text-muted-foreground">View your performance rating and feedback</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          title="Current Rating"
          value={myRecord.rating ? `${myRecord.rating}/5` : 'Pending'}
          icon={Star}
          subtitle={myRecord.rating ? 'Performance score' : 'Not yet rated'}
        />
        <StatCard
          title="Department"
          value={myRecord.department}
          icon={Building2}
          subtitle={`Reporting to ${myRecord.managerName}`}
        />
      </div>

      <EmployeeDetails myRecord={myRecord} />

      <div className="rounded-lg border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground">Performance Rating</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {myRecord.rating
            ? `Rated on ${myRecord.ratedAt ? new Date(myRecord.ratedAt).toLocaleDateString() : 'N/A'} by ${myRecord.ratedBy || 'Manager'}`
            : 'Your rating is pending'}
        </p>

        {myRecord.rating ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-gradient-to-br from-muted/50 to-background border">
              <div className="text-center">
                <StarRating rating={myRecord.rating} size="lg" />
                <p className="text-3xl font-bold mt-2">{myRecord.rating}/5</p>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  {myRecord.rating >= 5
                    ? 'Outstanding performance! Keep up the great work.'
                    : myRecord.rating >= 4
                    ? 'Excellent work! You are exceeding expectations.'
                    : myRecord.rating >= 3
                    ? 'Good performance. There is room for improvement.'
                    : 'Performance needs improvement. Work with your manager on a development plan.'}
                </p>
              </div>
            </div>

            {myRecord.managerComment && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-accent" />
                  Manager Feedback
                </h3>
                <div className="p-4 rounded-lg bg-muted/30 border-l-4 border-accent">
                  <p className="text-muted-foreground italic">"{myRecord.managerComment}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    — {myRecord.ratedBy || 'Your Manager'}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Send className="h-4 w-4 text-accent" />
                Your Reply
              </h3>
              
              {myRecord.employeeComment && (
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-muted-foreground">Current saved reply:</p>
                  <p className="text-muted-foreground mt-1">"{myRecord.employeeComment}"</p>
                  <p className="text-xs text-muted-foreground mt-2">— You</p>
                </div>
              )}

              <form onSubmit={handleSubmitReply} className="space-y-3">
                {submitMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    submitMessage.type === 'success' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}
                <textarea
                  placeholder="Write a reply to your manager's feedback..."
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
                  rows={3}
                  maxLength={300}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {replyComment.length}/300 characters
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {myRecord.employeeComment ? 'Update Reply' : 'Send Reply'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Rating Pending</h3>
            <p className="text-muted-foreground mt-1">
              Your manager has not submitted your performance rating yet.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Check back later for your performance feedback.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
