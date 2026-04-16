// FILE: src/pages/employee/EmployeeDashboard.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Send, 
  CheckCircle, 
  CalendarDays, 
  ClipboardList, 
  UserCircle,
  FileText,
  TrendingUp,
  Bell
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalLeaves: 0,
    approvedLeaves: 0,
    pendingLeaves: 0,
    unreadNotifications: 0
  });

  useEffect(() => {
    // Load leave data
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const userLeaves = leaves.filter((l: any) => l.employeeName === user?.name);
    
    // Load notifications
    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    const unreadNotifications = notifications.filter((n: any) => !n.read).length;
    
    setStats({
      totalLeaves: userLeaves.length,
      approvedLeaves: userLeaves.filter((l: any) => l.status === "Approved").length,
      pendingLeaves: userLeaves.filter((l: any) => l.status === "Pending").length,
      unreadNotifications
    });
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Employee Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Leaves</p>
            <p className="text-2xl font-bold">{stats.totalLeaves}</p>
          </div>
          <FileText className="h-8 w-8 text-primary opacity-75" />
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Approved Leaves</p>
            <p className="text-2xl font-bold">{stats.approvedLeaves}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600 opacity-75" />
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
            <p className="text-sm text-muted-foreground">Notifications</p>
            <p className="text-2xl font-bold">{stats.unreadNotifications}</p>
          </div>
          <Bell className="h-8 w-8 text-purple-600 opacity-75" />
        </div>
      </div>

      {/* EMPLOYEE ACTION GRID */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Apply Leave */}
          <div
            onClick={() => navigate("/employee/apply-leave")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-blue-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <Send className="h-8 w-8 text-blue-600 mb-3" />
            <p className="text-sm text-muted-foreground">Apply Leave</p>
            <h3 className="text-lg font-semibold mt-1">New</h3>
          </div>

          {/* Leave Status */}
          <div
            onClick={() => navigate("/employee/leave-status")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-green-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
            <p className="text-sm text-muted-foreground">Leave Status</p>
            <h3 className="text-lg font-semibold mt-1">View</h3>
          </div>

          {/* Calendar */}
          <div
            onClick={() => navigate("/employee/calendar")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-purple-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <CalendarDays className="h-8 w-8 text-purple-600 mb-3" />
            <p className="text-sm text-muted-foreground">Calendar</p>
            <h3 className="text-lg font-semibold mt-1">Open</h3>
          </div>

          {/* Resignation */}
          <div
            onClick={() => navigate("/employee/resignation")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-red-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <ClipboardList className="h-8 w-8 text-red-600 mb-3" />
            <p className="text-sm text-muted-foreground">Resignation</p>
            <h3 className="text-lg font-semibold mt-1">Submit</h3>
          </div>

          {/* Personal Details */}
          <div
            onClick={() => navigate("/employee/personal-details")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-yellow-50 to-white border hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <UserCircle className="h-8 w-8 text-yellow-600 mb-3" />
            <p className="text-sm text-muted-foreground">Personal Details</p>
            <h3 className="text-lg font-semibold mt-1">Update</h3>
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
          <h3 className="font-semibold mb-3">Upcoming Holidays</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No upcoming holidays</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;