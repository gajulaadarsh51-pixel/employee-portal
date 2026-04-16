import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  if (!user) return null;

  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const fields = [
    { label: "Full Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Employee ID", value: user.employeeId },
    { label: "Designation", value: user.designation },
    { label: "Department", value: user.department },
    { label: "Phone", value: user.phone },
    { label: "Joining Date", value: new Date(user.joiningDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) },
    { label: "Role", value: user.role },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <User className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          <p className="text-sm text-muted-foreground">Your personal information</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarFallback className="bg-accent text-accent-foreground text-xl font-bold">{initials}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <Badge variant="secondary" className="mt-1">{user.designation}</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label} className="space-y-1 p-3 rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{f.label}</p>
                <p className="text-sm font-medium text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
