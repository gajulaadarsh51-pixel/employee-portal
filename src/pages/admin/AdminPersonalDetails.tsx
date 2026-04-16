import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const AdminPersonalDetails = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const data = JSON.parse(localStorage.getItem("personalRequests") || "[]");
    setRequests(data.sort((a: any, b: any) => b.id - a.id));
  };

  const updateStatus = (id: number, status: string) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status, reviewedAt: new Date().toISOString() } : req
    );

    setRequests(updated);
    localStorage.setItem("personalRequests", JSON.stringify(updated));
    
    toast.success(`Request ${status.toLowerCase()} successfully!`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case "DECLINED":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
  };

  if (requests.length === 0) {
    return (
      <Card className="shadow-soft">
        <CardContent className="p-8 text-center text-muted-foreground">
          No personal detail requests found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Personal Detail Requests</h2>
        <Badge variant="outline">{requests.length} Total Requests</Badge>
      </div>
      
      {requests.map((req) => (
        <Card key={req.id} className="shadow-soft hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{req.fullName}</CardTitle>
              {getStatusBadge(req.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <p><span className="font-semibold">Email:</span> {req.email}</p>
              <p><span className="font-semibold">Phone:</span> {req.phone}</p>
              <p><span className="font-semibold">DOB:</span> {req.dob || "Not provided"}</p>
              <p><span className="font-semibold">Gender:</span> {req.gender || "Not provided"}</p>
              <p><span className="font-semibold">Address:</span> {req.address || "Not provided"}</p>
              <p><span className="font-semibold">City:</span> {req.city || "Not provided"}</p>
              <p><span className="font-semibold">State:</span> {req.state || "Not provided"}</p>
              <p><span className="font-semibold">ZIP:</span> {req.zip || "Not provided"}</p>
              <p><span className="font-semibold">Aadhaar:</span> {req.aadhaar || "Not provided"}</p>
              <p><span className="font-semibold">PAN:</span> {req.pan || "Not provided"}</p>
              <p><span className="font-semibold">Bank:</span> {req.bankName || "Not provided"}</p>
              <p><span className="font-semibold">Account:</span> {req.accountNumber || "Not provided"}</p>
              <p><span className="font-semibold">IFSC:</span> {req.ifsc || "Not provided"}</p>
              <p><span className="font-semibold">Emergency Contact:</span> {req.emergencyContact || "Not provided"}</p>
              <p><span className="font-semibold">Emergency Phone:</span> {req.emergencyPhone || "Not provided"}</p>
            </div>
            
            {req.submittedAt && (
              <p className="text-xs text-muted-foreground">
                Submitted: {new Date(req.submittedAt).toLocaleString()}
              </p>
            )}
            
            {req.reviewedAt && (
              <p className="text-xs text-muted-foreground">
                Reviewed: {new Date(req.reviewedAt).toLocaleString()}
              </p>
            )}

            {req.status === "PENDING" && (
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => updateStatus(req.id, "APPROVED")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => updateStatus(req.id, "DECLINED")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminPersonalDetails;