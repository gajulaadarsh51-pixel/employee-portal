import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LeaveRequest } from "@/types/hr";

const AdminLeaves = () => {
  const { toast } = useToast();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  // Load leaves from localStorage on component mount
  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    setLeaves(storedLeaves);
  }, []);

  const handleAction = (id: string, action: "Approved" | "Rejected") => {
    const updated = leaves.map((l) => (l.id === id ? { ...l, status: action } : l));
    setLeaves(updated);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
    
    toast({ 
      title: `Leave ${action}`, 
      description: `Leave request has been ${action.toLowerCase()}.` 
    });
  };

  const handleDelete = (id: string) => {
    const updated = leaves.filter((l) => l.id !== id);
    setLeaves(updated);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
    
    toast({
      title: "Deleted",
      description: "Leave request removed successfully",
    });
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

      <Card className="bg-white border rounded-xl shadow-sm">
        <CardContent className="p-0">
          {leaves.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No leave requests</h3>
              <p className="text-sm text-muted-foreground">
                No leave requests have been submitted yet
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Applied On</TableHead>
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
                    <TableCell>{l.appliedOn || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        l.status === "Pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                        l.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" :
                        "bg-red-50 text-red-700 border-red-200"
                      }>
                        {l.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* Pending → Approve / Reject buttons */}
                        {l.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-700 hover:bg-green-50"
                              onClick={() => handleAction(l.id, "Approved")}
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-700 hover:bg-red-50"
                              onClick={() => handleAction(l.id, "Rejected")}
                            >
                              <XCircle className="mr-1 h-3 w-3" />
                              Reject
                            </Button>
                          </>
                        )}

                        {/* Approved / Rejected → Delete button */}
                        {l.status !== "Pending" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(l.id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLeaves;