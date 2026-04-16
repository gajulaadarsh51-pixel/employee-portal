import { useAuth } from "@/contexts/AuthContext";
import { mockLeaveRequests } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, XCircle, CalendarDays } from "lucide-react";

const statusConfig = {
  Pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: <Clock className="h-3 w-3" /> },
  Approved: { color: "bg-green-100 text-green-800 border-green-200", icon: <CheckCircle className="h-3 w-3" /> },
  Rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: <XCircle className="h-3 w-3" /> },
};

const LeaveStatus = () => {
  const { user } = useAuth();
  const leaves = mockLeaveRequests.filter((l) => l.userId === user?.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <CalendarDays className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Status</h1>
          <p className="text-sm text-muted-foreground">Track your leave applications</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.leaveType}</TableCell>
                  <TableCell>{l.startDate}</TableCell>
                  <TableCell>{l.endDate}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{l.reason}</TableCell>
                  <TableCell>{l.appliedOn}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusConfig[l.status].color} gap-1`}>
                      {statusConfig[l.status].icon}
                      {l.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {leaves.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No leave requests found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveStatus;
