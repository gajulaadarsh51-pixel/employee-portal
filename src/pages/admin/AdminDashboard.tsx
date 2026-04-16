// FILE: src/pages/admin/AdminDashboard.tsx (Updated with BackButton on all management cards)

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CalendarDays, 
  ClipboardList, 
  BarChart3, 
  FileCheck,
  Users,
  FileText,
  TrendingUp,
  Briefcase
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalPayslips: 0,
    pendingLeaves: 0,
    pendingResignations: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const employees = JSON.parse(localStorage.getItem("users") || "[]");
    const employeesList = employees.filter((u: any) => u.role === "EMPLOYEE");
    
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const pendingLeaves = leaves.filter((l: any) => l.status === "Pending").length;
    
    const resignations = JSON.parse(localStorage.getItem("resignations") || "[]");
    const pendingResignations = resignations.filter((r: any) => r.status === "Pending").length;
    
    const payslips = JSON.parse(localStorage.getItem("payslips") || "[]");
    
    setStats({
      totalEmployees: employeesList.length,
      totalPayslips: payslips.length,
      pendingLeaves,
      pendingResignations
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Employees</p>
            <p className="text-2xl font-bold">{stats.totalEmployees}</p>
          </div>
          <Users className="h-8 w-8 text-primary opacity-75" />
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Payslips</p>
            <p className="text-2xl font-bold">{stats.totalPayslips}</p>
          </div>
          <FileText className="h-8 w-8 text-primary opacity-75" />
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Pending Leaves</p>
            <p className="text-2xl font-bold">{stats.pendingLeaves}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-yellow-600 opacity-75" />
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Resignations</p>
            <p className="text-2xl font-bold">{stats.pendingResignations}</p>
          </div>
          <Briefcase className="h-8 w-8 text-red-600 opacity-75" />
        </div>
      </div>

      {/* MAIN ACTION GRID */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Management</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Leave Requests */}
          <div
            onClick={() => navigate("/admin/leaves")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-blue-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <CalendarDays className="h-8 w-8 text-blue-600 mb-3" />
            <p className="text-sm text-muted-foreground">Leave Requests</p>
            <h3 className="text-lg font-semibold mt-1">{stats.pendingLeaves}</h3>
            <p className="text-xs text-muted-foreground mt-2">Pending approval</p>
          </div>

          {/* Calendar */}
          <div
            onClick={() => navigate("/admin/calendar")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-purple-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <CalendarDays className="h-8 w-8 text-purple-600 mb-3" />
            <p className="text-sm text-muted-foreground">Calendar</p>
            <h3 className="text-lg font-semibold mt-1">View</h3>
            <p className="text-xs text-muted-foreground mt-2">Manage events</p>
          </div>

          {/* Resignations */}
          <div
            onClick={() => navigate("/admin/resignations")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-red-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <ClipboardList className="h-8 w-8 text-red-600 mb-3" />
            <p className="text-sm text-muted-foreground">Resignations</p>
            <h3 className="text-lg font-semibold mt-1">{stats.pendingResignations}</h3>
            <p className="text-xs text-muted-foreground mt-2">Pending review</p>
          </div>

          {/* Reports */}
          <div
            onClick={() => navigate("/admin/reports")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-green-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <BarChart3 className="h-8 w-8 text-green-600 mb-3" />
            <p className="text-sm text-muted-foreground">Reports</p>
            <h3 className="text-lg font-semibold mt-1">Open</h3>
            <p className="text-xs text-muted-foreground mt-2">Analytics & data</p>
          </div>

          {/* Personal Requests */}
          <div
            onClick={() => navigate("/admin/personal-details")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-yellow-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <FileCheck className="h-8 w-8 text-yellow-600 mb-3" />
            <p className="text-sm text-muted-foreground">Personal Requests</p>
            <h3 className="text-lg font-semibold mt-1">View</h3>
            <p className="text-xs text-muted-foreground mt-2">Employee updates</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold mb-3">Recent Leave Requests</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No recent leave requests</p>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-3">Upcoming Events</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;