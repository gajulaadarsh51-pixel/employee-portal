import { useEffect, useState } from "react";
import { Users, CalendarDays, ClipboardList, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [resignations, setResignations] = useState<any[]>([]);

  // Load data from localStorage
  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees") || "[]"));
    setLeaves(JSON.parse(localStorage.getItem("leaveRequests") || "[]"));
    setResignations(JSON.parse(localStorage.getItem("resignations") || "[]"));
  }, []);

  const pendingLeaves = leaves.filter((l) => l.status === "Pending").length;
  const pendingResignations = resignations.filter((r) => r.status === "Pending").length;
  const activeEmployees = employees.filter((e) => e.workStatus === "Active").length;
  const activeRate = employees.length > 0 ? Math.round((activeEmployees / employees.length) * 100) : 0;

  const stats = [
    { label: "Total Employees", value: employees.length, icon: <Users className="h-5 w-5 text-primary" /> },
    { label: "Pending Leaves", value: pendingLeaves, icon: <CalendarDays className="h-5 w-5 text-primary" /> },
    { label: "Resignation Requests", value: pendingResignations, icon: <ClipboardList className="h-5 w-5 text-primary" /> },
    { label: "Active Rate", value: `${activeRate}%`, icon: <TrendingUp className="h-5 w-5 text-primary" /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of company performance
          </p>
        </div>
      </div>

      {/* Stats Cards - Corporate Style */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Employees */}
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-6 pb-3 border-b">
            <h3 className="text-lg font-semibold text-foreground">Recent Employees</h3>
          </div>
          <div className="p-6 pt-0 space-y-3">
            {employees.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No employees added yet</p>
            ) : (
              employees.slice(-5).reverse().map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <div>
                    <p className="font-medium text-foreground text-sm">{e.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.designation} · {e.department} · {e.employeeId}
                    </p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-green-50 text-green-700">
                    {e.workStatus}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Leaves */}
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-6 pb-3 border-b">
            <h3 className="text-lg font-semibold text-foreground">Recent Leave Requests</h3>
          </div>
          <div className="p-6 pt-0 space-y-3">
            {leaves.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No leave requests yet</p>
            ) : (
              leaves.slice(0, 5).map((l) => (
                <div key={l.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <div>
                    <p className="font-medium text-foreground text-sm">{l.employeeName}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.leaveType} · {l.startDate} to {l.endDate}
                    </p>
                    {l.reason && (
                      <p className="text-xs text-muted-foreground mt-1">Reason: {l.reason}</p>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    l.status === "Pending" ? "bg-yellow-50 text-yellow-700" :
                    l.status === "Approved" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    {l.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Resignations Section (if any) */}
      {resignations.length > 0 && (
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-6 pb-3 border-b">
            <h3 className="text-lg font-semibold text-foreground">Resignation Requests</h3>
          </div>
          <div className="p-6 pt-0 space-y-3">
            {resignations.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                <div>
                  <p className="font-medium text-foreground text-sm">{r.employeeName}</p>
                  <p className="text-xs text-muted-foreground">
                    Last Working Day: {r.lastWorkingDate} · Submitted: {r.submittedOn}
                  </p>
                  {r.reason && (
                    <p className="text-xs text-muted-foreground mt-1">Reason: {r.reason}</p>
                  )}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  r.status === "Pending" ? "bg-yellow-50 text-yellow-700" :
                  r.status === "Approved" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;