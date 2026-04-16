// FILE: src/pages/admin/AdminResignations.tsx (With BackButton)

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { addNotification } from "@/utils/notifications";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

interface Resignation {
  id: string;
  employeeName: string;
  employeeId: string;
  lastWorkingDay: string;
  reason: string;
  comments: string;
  status: string;
  submittedOn: string;
}

const AdminResignations = () => {
  const [resignations, setResignations] = useState<Resignation[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadResignations();
  }, []);

  const loadResignations = () => {
    const stored = JSON.parse(localStorage.getItem("resignations") || "[]");
    setResignations(stored);
  };

  const handleApprove = (resignation: Resignation) => {
    const updated = resignations.map(r =>
      r.id === resignation.id ? { ...r, status: "Approved" } : r
    );
    localStorage.setItem("resignations", JSON.stringify(updated));
    loadResignations();

    addNotification({
      id: Date.now().toString(),
      title: "Resignation Approved",
      message: `Your resignation has been approved. Last working day: ${resignation.lastWorkingDay}`,
      link: "/employee/resignation",
      read: false,
    });

    toast({
      title: "Resignation Approved",
      description: `${resignation.employeeName}'s resignation has been approved.`,
    });
  };

  const handleReject = (resignation: Resignation) => {
    const updated = resignations.map(r =>
      r.id === resignation.id ? { ...r, status: "Rejected" } : r
    );
    localStorage.setItem("resignations", JSON.stringify(updated));
    loadResignations();

    addNotification({
      id: Date.now().toString(),
      title: "Resignation Rejected",
      message: `Your resignation request has been rejected. Please contact HR.`,
      link: "/employee/resignation",
      read: false,
    });

    toast({
      title: "Resignation Rejected",
      description: `${resignation.employeeName}'s resignation has been rejected.`,
      variant: "destructive",
    });
  };

  const pendingResignations = resignations.filter(r => r.status === "Pending");
  const approvedResignations = resignations.filter(r => r.status === "Approved");
  const rejectedResignations = resignations.filter(r => r.status === "Rejected");

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Resignations</h2>
        <p className="text-muted-foreground">Manage employee resignation requests</p>
      </div>

      {/* Pending Resignations */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Pending Resignations ({pendingResignations.length})</h3>
        {pendingResignations.length === 0 ? (
          <div className="card text-center py-8 text-muted-foreground">
            No pending resignation requests
          </div>
        ) : (
          <div className="grid gap-3">
            {pendingResignations.map((resignation) => (
              <div key={resignation.id} className="card">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="space-y-1">
                    <p className="font-medium">{resignation.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      Last Working Day: {resignation.lastWorkingDay}
                    </p>
                    <p className="text-sm">Reason: {resignation.reason}</p>
                    {resignation.comments && (
                      <p className="text-sm text-muted-foreground">Comments: {resignation.comments}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Submitted on: {new Date(resignation.submittedOn).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleApprove(resignation)}>
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(resignation)}>
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Resignations */}
      {approvedResignations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Approved Resignations ({approvedResignations.length})</h3>
          <div className="grid gap-3">
            {approvedResignations.map((resignation) => (
              <div key={resignation.id} className="card bg-green-50">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <p className="font-medium">{resignation.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      Last Working Day: {resignation.lastWorkingDay}
                    </p>
                  </div>
                  <span className="text-green-700 text-sm font-medium">✓ Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Resignations */}
      {rejectedResignations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Rejected Resignations ({rejectedResignations.length})</h3>
          <div className="grid gap-3">
            {rejectedResignations.map((resignation) => (
              <div key={resignation.id} className="card bg-red-50">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <p className="font-medium">{resignation.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      Last Working Day: {resignation.lastWorkingDay}
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

export default AdminResignations;