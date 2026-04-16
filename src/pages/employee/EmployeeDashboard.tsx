import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Calendar, Hash, Activity } from "lucide-react";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  const stats = [
    { label: "Employee ID", value: user.employeeId, icon: <Hash className="h-5 w-5" />, color: "bg-accent/20 text-accent" },
    { label: "Designation", value: user.designation, icon: <Briefcase className="h-5 w-5" />, color: "bg-primary/20 text-primary" },
    { label: "Joining Date", value: new Date(user.joiningDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }), icon: <Calendar className="h-5 w-5" />, color: "bg-accent/20 text-accent" },
    { label: "Work Status", value: "Active", icon: <Activity className="h-5 w-5" />, color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner - Fixed text visibility */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">{user.department} · {user.designation}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Info */}
      <Card className="bg-white border rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium text-foreground">{user.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">{user.phone || "Not provided"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Department</p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">{user.department}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;