import { mockEmployees, mockLeaveRequests, mockResignations } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, CalendarDays, ClipboardList } from "lucide-react";

const AdminReports = () => {
  const departmentCounts = mockEmployees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <BarChart3 className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">HR analytics and summaries</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />Department Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(departmentCounts).map(([dept, count]) => (
              <div key={dept} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-sm font-medium text-foreground">{dept}</span>
                <span className="text-sm text-muted-foreground">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />Leave Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(["Pending", "Approved", "Rejected"] as const).map((status) => (
              <div key={status} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-sm font-medium text-foreground">{status}</span>
                <span className="text-sm text-muted-foreground">{mockLeaveRequests.filter((l) => l.status === status).length}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
              <ClipboardList className="h-4 w-4" />Resignation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-muted/50">
              <span className="text-sm font-medium text-foreground">Total</span>
              <span className="text-sm text-muted-foreground">{mockResignations.length}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-muted/50">
              <span className="text-sm font-medium text-foreground">Pending</span>
              <span className="text-sm text-muted-foreground">{mockResignations.filter((r) => r.status === "Pending").length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
