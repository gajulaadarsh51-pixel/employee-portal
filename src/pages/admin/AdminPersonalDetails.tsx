// FILE: src/pages/admin/AdminPersonalDetails.tsx (With BackButton)

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

interface PersonalRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  phone: string;
  address: string;
  emergencyContact: string;
  bankAccount: string;
  panNumber: string;
  status: string;
  submittedOn: string;
}

const AdminPersonalDetails = () => {
  const [requests, setRequests] = useState<PersonalRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    // Get all employees and their personal details
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const employees = users.filter((u: any) => u.role === "EMPLOYEE");
    
    const allRequests: PersonalRequest[] = [];
    employees.forEach((emp: any) => {
      const details = JSON.parse(localStorage.getItem(`personal_details_${emp.id}`) || "{}");
      if (Object.keys(details).length > 0) {
        allRequests.push({
          id: `${emp.id}_${Date.now()}`,
          employeeName: emp.name,
          employeeId: emp.id,
          ...details,
          status: "Pending",
          submittedOn: new Date().toISOString(),
        });
      }
    });
    
    setRequests(allRequests);
  };

  const handleApprove = (request: PersonalRequest) => {
    toast({
      title: "Request Approved",
      description: `${request.employeeName}'s personal details have been updated.`,
    });
    setRequests(requests.filter(r => r.id !== request.id));
  };

  const handleReject = (request: PersonalRequest) => {
    toast({
      title: "Request Rejected",
      description: `${request.employeeName}'s request has been rejected.`,
      variant: "destructive",
    });
    setRequests(requests.filter(r => r.id !== request.id));
  };

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Personal Details Requests</h2>
        <p className="text-muted-foreground">Review employee personal information update requests</p>
      </div>

      {requests.length === 0 ? (
        <div className="card text-center py-8 text-muted-foreground">
          No pending personal details requests
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request.id} className="card">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-lg">{request.employeeName}</p>
                  <div className="grid gap-2 text-sm">
                    {request.phone && <p><span className="font-medium">Phone:</span> {request.phone}</p>}
                    {request.address && <p><span className="font-medium">Address:</span> {request.address}</p>}
                    {request.emergencyContact && <p><span className="font-medium">Emergency Contact:</span> {request.emergencyContact}</p>}
                    {request.bankAccount && <p><span className="font-medium">Bank Account:</span> {request.bankAccount}</p>}
                    {request.panNumber && <p><span className="font-medium">PAN Number:</span> {request.panNumber}</p>}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Submitted on: {new Date(request.submittedOn).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(request)}>
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(request)}>
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPersonalDetails;