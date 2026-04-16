import { useAuth } from "@/contexts/AuthContext";
import { mockPayslips } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmployeePayslips = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const payslips = mockPayslips.filter((p) => p.userId === user?.id);

  const handleDownload = (month: string, year: number) => {
    toast({ title: "Download Started", description: `Payslip for ${month} ${year} is being downloaded.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <FileText className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Payslips</h1>
          <p className="text-sm text-muted-foreground">View and download your salary slips</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Basic</TableHead>
                <TableHead>HRA</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.month} {p.year}</TableCell>
                  <TableCell>₹{p.basicSalary.toLocaleString()}</TableCell>
                  <TableCell>₹{p.hra.toLocaleString()}</TableCell>
                  <TableCell>₹{p.allowances.toLocaleString()}</TableCell>
                  <TableCell className="text-destructive">-₹{p.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">₹{p.netSalary.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => handleDownload(p.month, p.year)}>
                      <Download className="mr-1 h-3 w-3" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {payslips.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No payslips available yet.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePayslips;
