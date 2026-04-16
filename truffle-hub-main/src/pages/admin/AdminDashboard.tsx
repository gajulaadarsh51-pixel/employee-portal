import { mockEmployees, mockLeaveRequests, mockResignations } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, ClipboardList, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const pendingLeaves = mockLeaveRequests.filter((l) => l.status === "Pending").length;
  const pendingResignations = mockResignations.filter((r) => r.status === "Pending").length;

  const stats = [
    { label: "Total Employees", value: mockEmployees.length, icon: <Users className="h-6 w-6" />, gradient: "gradient-chocolate" },
    { label: "Pending Leaves", value: pendingLeaves, icon: <CalendarDays className="h-6 w-6" />, gradient: "gradient-caramel" },
    { label: "Resignation Requests", value: pendingResignations, icon: <ClipboardList className="h-6 w-6" />, gradient: "gradient-chocolate" },
    { label: "Active Rate", value: "95%", icon: <TrendingUp className="h-6 w-6" />, gradient: "gradient-caramel" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your HR operations</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            <div className={`p-5 ${stat.gradient}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary-foreground mt-1">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card/20 backdrop-blur-sm text-primary-foreground">
                  {stat.icon}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Leaves */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockLeaveRequests.slice(0, 3).map((l) => (
              <div key={l.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-foreground text-sm">{l.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{l.leaveType} · {l.startDate} to {l.endDate}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  l.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                  l.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>{l.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Employee Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockEmployees.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-foreground text-sm">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.designation} · {e.department}</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">{e.workStatus}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
