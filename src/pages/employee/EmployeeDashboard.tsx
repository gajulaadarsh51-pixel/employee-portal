// FILE: src/pages/employee/EmployeeDashboard.tsx (Updated with Payslips card)

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
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Employee Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Leaves</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalLeaves}</p>
            </div>
            <FileText className="h-8 w-8 text-primary opacity-75" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved Leaves</p>
              <p className="text-2xl font-bold text-foreground">{stats.approvedLeaves}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600 opacity-75" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Leaves</p>
              <p className="text-2xl font-bold text-foreground">{stats.pendingLeaves}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-600 opacity-75" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Notifications</p>
              <p className="text-2xl font-bold text-foreground">{stats.unreadNotifications}</p>
            </div>
            <Bell className="h-8 w-8 text-purple-600 opacity-75" />
          </div>
        </div>
      </div>

      {/* EMPLOYEE ACTION GRID */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Quick Actions</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {/* Apply Leave */}
          <div
            onClick={() => navigate("/employee/apply-leave")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-blue-50 to-white border border-blue-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <Send className="h-8 w-8 text-blue-600 mb-3" />
            <p className="text-sm text-muted-foreground">Apply Leave</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">New</h3>
          </div>

          {/* Leave Status */}
          <div
            onClick={() => navigate("/employee/leave-status")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-green-50 to-white border border-green-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
            <p className="text-sm text-muted-foreground">Leave Status</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">View</h3>
          </div>

          {/* Calendar */}
          <div
            onClick={() => navigate("/employee/calendar")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <CalendarDays className="h-8 w-8 text-purple-600 mb-3" />
            <p className="text-sm text-muted-foreground">Calendar</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">Open</h3>
          </div>

          {/* Resignation */}
          <div
            onClick={() => navigate("/employee/resignation")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-red-50 to-white border border-red-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <ClipboardList className="h-8 w-8 text-red-600 mb-3" />
            <p className="text-sm text-muted-foreground">Resignation</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">Submit</h3>
          </div>

          {/* Personal Details */}
          <div
            onClick={() => navigate("/employee/personal-details")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <UserCircle className="h-8 w-8 text-yellow-600 mb-3" />
            <p className="text-sm text-muted-foreground">Personal Details</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">Update</h3>
          </div>

          {/* Payslips */}
          <div
            onClick={() => navigate("/employee/payslips")}
            className="p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <FileText className="h-8 w-8 text-indigo-600 mb-3" />
            <p className="text-sm text-muted-foreground">Payslips</p>
            <h3 className="text-lg font-semibold mt-1 text-foreground">View</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3 text-foreground">Recent Leave Requests</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No recent leave requests</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3 text-foreground">Upcoming Holidays</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No upcoming holidays</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;