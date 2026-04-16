// FILE: src/pages/employee/LeaveStatus.tsx (With BackButton)

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import BackButton from "@/components/BackButton";

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: string;
  appliedOn: string;
}

const LeaveStatus = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const userLeaves = stored.filter((l: LeaveRequest) => l.employeeName === user?.name);
    setLeaves(userLeaves.sort((a, b) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime()));
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Leave Status</h2>
        <p className="text-muted-foreground">Track your leave requests</p>
      </div>

      {leaves.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-muted-foreground">No leave requests found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leaves.map((leave) => (
            <div key={leave.id} className="card">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(leave.status)}
                    <p className="font-medium">{leave.type} Leave</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {leave.startDate} to {leave.endDate}
                  </p>
                  <p className="text-sm">{leave.reason}</p>
                  <p className="text-xs text-muted-foreground">
                    Applied on: {new Date(leave.appliedOn).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                  {leave.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveStatus;