import { useState } from "react";
import { mockLeaveRequests } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LeaveRequest } from "@/types/hr";

const AdminLeaves = () => {
  const { toast } = useToast();
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaveRequests);

  const handleAction = (id: string, action: "Approved" | "Rejected") => {
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status: action } : l)));
    toast({ title: `Leave ${action}`, description: `Leave request has been ${action.toLowerCase()}.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <CalendarDays className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Requests</h1>
          <p className="text-sm text-muted-foreground">Manage employee leave requests</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.employeeName}</TableCell>
                  <TableCell>{l.leaveType}</TableCell>
                  <TableCell>{l.startDate}</TableCell>
                  <TableCell>{l.endDate}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{l.reason}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      l.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                      l.status === "Approved" ? "bg-green-100 text-green-800 border-green-200" :
                      "bg-red-100 text-red-800 border-red-200"
                    }>{l.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {l.status === "Pending" && (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="text-green-700 hover:bg-green-50" onClick={() => handleAction(l.id, "Approved")}>
                          <CheckCircle className="mr-1 h-3 w-3" />Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-700 hover:bg-red-50" onClick={() => handleAction(l.id, "Rejected")}>
                          <XCircle className="mr-1 h-3 w-3" />Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLeaves;
