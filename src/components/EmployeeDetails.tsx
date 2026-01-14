import { Building2, Calendar, User } from "lucide-react"

const EmployeeDetails = ({myRecord}) => {
  return (
    
        <div className="rounded-lg border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Employee Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <User className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Employee ID</p>
              <p className="font-mono font-medium">{myRecord.employeeId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Building2 className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{myRecord.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Calendar className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Joining Date</p>
              <p className="font-medium">
                {new Date(myRecord.joiningDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <User className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Manager</p>
              <p className="font-medium">{myRecord.managerName}</p>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default EmployeeDetails