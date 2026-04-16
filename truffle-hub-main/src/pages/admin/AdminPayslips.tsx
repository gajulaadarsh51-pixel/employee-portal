import { mockPayslips, mockEmployees } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPayslips = () => {
  const { toast } = useToast();

  const enriched = mockPayslips.map((p) => ({
    ...p,
    employeeName: mockEmployees.find((e) => e.id === p.userId)?.name || "Unknown",
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payslips</h1>
            <p className="text-sm text-muted-foreground">Manage employee payslips</p>
          </div>
        </div>
        <Button onClick={() => toast({ title: "Upload", description: "Payslip upload feature coming soon." })}>
          <Upload className="mr-1 h-4 w-4" />Upload Payslip
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Basic</TableHead>
                <TableHead>Net Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.employeeName}</TableCell>
                  <TableCell>{p.month} {p.year}</TableCell>
                  <TableCell>₹{p.basicSalary.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">₹{p.netSalary.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayslips;
