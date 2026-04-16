import { useState } from "react";
import { mockResignations } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResignationRequest } from "@/types/hr";

const AdminResignations = () => {
  const { toast } = useToast();
  const [resignations, setResignations] = useState<ResignationRequest[]>(mockResignations);

  const handleAction = (id: string, action: "Accepted" | "Rejected") => {
    setResignations((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
    toast({ title: `Resignation ${action}`, description: `Resignation has been ${action.toLowerCase()}.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <ClipboardList className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resignation Requests</h1>
          <p className="text-sm text-muted-foreground">Review and manage resignations</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead>Last Working Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resignations.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.employeeName}</TableCell>
                  <TableCell>{r.reason}</TableCell>
                  <TableCell>{r.submittedOn}</TableCell>
                  <TableCell>{r.lastWorkingDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      r.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                      r.status === "Accepted" ? "bg-green-100 text-green-800 border-green-200" :
                      "bg-red-100 text-red-800 border-red-200"
                    }>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {r.status === "Pending" && (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="text-green-700 hover:bg-green-50" onClick={() => handleAction(r.id, "Accepted")}>
                          <CheckCircle className="mr-1 h-3 w-3" />Accept
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-700 hover:bg-red-50" onClick={() => handleAction(r.id, "Rejected")}>
                          <XCircle className="mr-1 h-3 w-3" />Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {resignations.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No resignation requests.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResignations;
