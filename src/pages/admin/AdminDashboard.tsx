// FILE: src/pages/admin/AdminDashboard.tsx (With Calendar Card)

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CalendarDays, 
  ClipboardList, 
  FileCheck,
  Users,
  FileText,
  TrendingUp,
  Briefcase,
  UserPlus,
  Clock
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalPayslips: 0,
    pendingLeaves: 0,
    pendingResignations: 0
  });
  const [recentEmployees, setRecentEmployees] = useState<any[]>([]);
  const [recentLeaves, setRecentLeaves] = useState<any[]>([]);

  useEffect(() => {
    // Load employee data
    const employees = JSON.parse(localStorage.getItem("users") || "[]");
    const employeesList = employees.filter((u: any) => u.role === "EMPLOYEE");
    
    // Load leave data
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const pendingLeaves = leaves.filter((l: any) => l.status === "Pending").length;
    
    // Load resignation data
    const resignations = JSON.parse(localStorage.getItem("resignations") || "[]");
    const pendingResignations = resignations.filter((r: any) => r.status === "Pending").length;
    
    // Load payslip data
    const payslips = JSON.parse(localStorage.getItem("payslips") || "[]");
    
    setStats({
      totalEmployees: employeesList.length,
      totalPayslips: payslips.length,
      pendingLeaves,
      pendingResignations
    });
  }, []);

  // Separate useEffect for recent employees
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const employees = users
      .filter((u: any) => u.role === "EMPLOYEE")
      .sort(
        (a: any, b: any) =>
          new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      )
      .slice(0, 5);

    setRecentEmployees(employees);
  }, []);

  // Load recent leave requests
  useEffect(() => {
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const recentLeavesList = leaves
      .sort((a: any, b: any) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime())
      .slice(0, 5);
    setRecentLeaves(recentLeavesList);
  }, []);

  const getLeaveStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-50";
      case "Rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-yellow-600 bg-yellow-50";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* TOP STATS CARDS - Powerful Numbers */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Employees", value: stats.totalEmployees, icon: Users, color: "text-blue-600" },
          { label: "Total Payslips", value: stats.totalPayslips, icon: FileText, color: "text-green-600" },
          { label: "Pending Leaves", value: stats.pendingLeaves, icon: CalendarDays, color: "text-yellow-600" },
          { label: "Active Resignations", value: stats.pendingResignations, icon: ClipboardList, color: "text-red-600" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <h2 className="text-3xl font-bold text-foreground mt-1">
                    {item.value}
                  </h2>
                </div>
                <Icon className={`h-10 w-10 ${item.color} opacity-75`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* MANAGEMENT ACTION GRID - Now with 5 cards */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Management</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Employees Card */}
          <div
            onClick={() => navigate("/admin/employees")}
            className="p-5 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <Users className="h-8 w-8 text-indigo-600 mb-3" />
            <p className="text-sm text-muted-foreground">Employees</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">{stats.totalEmployees}</h3>
            <p className="text-xs text-muted-foreground mt-2">Manage employees</p>
          </div>

          {/* Payslips Card */}
          <div
            onClick={() => navigate("/admin/payslips")}
            className="p-5 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <FileText className="h-8 w-8 text-blue-600 mb-3" />
            <p className="text-sm text-muted-foreground">Payslips</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">{stats.totalPayslips}</h3>
            <p className="text-xs text-muted-foreground mt-2">Salary & payroll</p>
          </div>

          {/* Leave Requests */}
          <div
            onClick={() => navigate("/admin/leaves")}
            className="p-5 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <CalendarDays className="h-8 w-8 text-amber-600 mb-3" />
            <p className="text-sm text-muted-foreground">Leave Requests</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">{stats.pendingLeaves}</h3>
            <p className="text-xs text-muted-foreground mt-2">Pending approval</p>
          </div>

          {/* Resignations */}
          <div
            onClick={() => navigate("/admin/resignations")}
            className="p-5 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-white cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <ClipboardList className="h-8 w-8 text-red-600 mb-3" />
            <p className="text-sm text-muted-foreground">Resignations</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">{stats.pendingResignations}</h3>
            <p className="text-xs text-muted-foreground mt-2">Pending review</p>
          </div>

          {/* Calendar Card - NEW */}
          <div
            onClick={() => navigate("/admin/calendar")}
            className="p-5 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <CalendarDays className="h-8 w-8 text-purple-600 mb-3" />
            <p className="text-sm text-muted-foreground">Calendar</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">Manage</h3>
            <p className="text-xs text-muted-foreground mt-2">Events & holidays</p>
          </div>
        </div>

        {/* Second row for Personal Requests */}
        <div className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {/* Personal Requests */}
            <div
              onClick={() => navigate("/admin/personal-details")}
              className="p-5 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <FileCheck className="h-8 w-8 text-emerald-600 mb-3" />
              <p className="text-sm text-muted-foreground">Personal Requests</p>
              <h3 className="text-lg font-semibold mt-1 text-foreground">View</h3>
              <p className="text-xs text-muted-foreground mt-2">Employee updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Joiners */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Joiners</h3>
            <UserPlus className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            {recentEmployees.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No employees added yet</p>
              </div>
            ) : (
              recentEmployees.map((emp, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(emp.joinDate).toLocaleDateString()}
                    </p>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {recentEmployees.length > 0 && (
            <button 
              onClick={() => navigate("/admin/employees")}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all employees →
            </button>
          )}
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Leave Requests</h3>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            {recentLeaves.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No leave requests yet</p>
              </div>
            ) : (
              recentLeaves.map((leave, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{leave.employeeName || "Employee"}</p>
                    <p className="text-xs text-muted-foreground">
                      {leave.type || "Leave"} · {leave.startDate} to {leave.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getLeaveStatusColor(leave.status)}`}>
                      {leave.status || "Pending"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(leave.appliedOn).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {recentLeaves.length > 0 && (
            <button 
              onClick={() => navigate("/admin/leaves")}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all requests →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;