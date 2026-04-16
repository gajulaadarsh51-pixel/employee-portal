// FILE: src/pages/admin/AdminLeaves.tsx (With BackButton)

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { addNotification } from "@/utils/notifications";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: string;
  appliedOn: string;
}

const AdminLeaves = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = () => {
    const stored = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    setLeaves(stored);
  };

  const handleApprove = (leave: LeaveRequest) => {
    const updated = leaves.map(l =>
      l.id === leave.id ? { ...l, status: "Approved" } : l
    );
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
    loadLeaves();

    addNotification({
      id: Date.now().toString(),
      title: "Leave Approved",
      message: `Your ${leave.type} leave from ${leave.startDate} to ${leave.endDate} has been approved`,
      link: "/employee/leave-status",
      read: false,
    });

    toast({
      title: "Leave Approved",
      description: `Leave request for ${leave.employeeName} has been approved.`,
    });
  };

  const handleReject = (leave: LeaveRequest) => {
    const updated = leaves.map(l =>
      l.id === leave.id ? { ...l, status: "Rejected" } : l
    );
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
    loadLeaves();

    addNotification({
      id: Date.now().toString(),
      title: "Leave Rejected",
      message: `Your ${leave.type} leave request has been rejected. Please contact HR for details.`,
      link: "/employee/leave-status",
      read: false,
    });

    toast({
      title: "Leave Rejected",
      description: `Leave request for ${leave.employeeName} has been rejected.`,
      variant: "destructive",
    });
  };

  const pendingLeaves = leaves.filter(l => l.status === "Pending");
  const approvedLeaves = leaves.filter(l => l.status === "Approved");
  const rejectedLeaves = leaves.filter(l => l.status === "Rejected");

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Leave Requests</h2>
        <p className="text-muted-foreground">Manage employee leave requests</p>
      </div>

      {/* Pending Requests */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Pending Requests ({pendingLeaves.length})</h3>
        {pendingLeaves.length === 0 ? (
          <div className="card text-center py-8 text-muted-foreground">
            No pending leave requests
          </div>
        ) : (
          <div className="grid gap-3">
            {pendingLeaves.map((leave) => (
              <div key={leave.id} className="card">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="space-y-1">
                    <p className="font-medium">{leave.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.type} Leave | {leave.startDate} to {leave.endDate}
                    </p>
                    <p className="text-sm">{leave.reason}</p>
                    <p className="text-xs text-muted-foreground">
                      Applied on: {new Date(leave.appliedOn).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleApprove(leave)}>
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(leave)}>
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Requests */}
      {approvedLeaves.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Approved Requests ({approvedLeaves.length})</h3>
          <div className="grid gap-3">
            {approvedLeaves.map((leave) => (
              <div key={leave.id} className="card bg-green-50">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <p className="font-medium">{leave.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.type} Leave | {leave.startDate} to {leave.endDate}
                    </p>
                  </div>
                  <span className="text-green-700 text-sm font-medium">✓ Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Requests */}
      {rejectedLeaves.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Rejected Requests ({rejectedLeaves.length})</h3>
          <div className="grid gap-3">
            {rejectedLeaves.map((leave) => (
              <div key={leave.id} className="card bg-red-50">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <p className="font-medium">{leave.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.type} Leave | {leave.startDate} to {leave.endDate}
                    </p>
                  </div>
                  <span className="text-red-700 text-sm font-medium">✗ Rejected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeaves;