// FILE: src/pages/admin/AdminPayslips.tsx (With BackButton)

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
}

const AdminPayslips = () => {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    year: new Date().getFullYear().toString(),
    basicSalary: "",
    allowances: "",
    deductions: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPayslips();
    loadEmployees();
  }, []);

  const loadPayslips = () => {
    const stored = JSON.parse(localStorage.getItem("payslips") || "[]");
    setPayslips(stored);
  };

  const loadEmployees = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const employeesList = users.filter((u: any) => u.role === "EMPLOYEE");
    setEmployees(employeesList);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employee = employees.find(emp => emp.id === formData.employeeId);
    const basic = parseFloat(formData.basicSalary) || 0;
    const allowances = parseFloat(formData.allowances) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    const netSalary = basic + allowances - deductions;
    
    const newPayslip: Payslip = {
      id: Date.now().toString(),
      employeeId: formData.employeeId,
      employeeName: employee?.name || "Unknown",
      month: formData.month,
      year: formData.year,
      basicSalary: basic,
      allowances: allowances,
      deductions: deductions,
      netSalary: netSalary,
    };
    
    const updated = [...payslips, newPayslip];
    setPayslips(updated);
    localStorage.setItem("payslips", JSON.stringify(updated));
    
    toast({ title: "Success", description: "Payslip generated successfully" });
    setIsOpen(false);
    setFormData({
      employeeId: "",
      month: "",
      year: new Date().getFullYear().toString(),
      basicSalary: "",
      allowances: "",
      deductions: "",
    });
  };

  const handleDownload = (payslip: Payslip) => {
    // Simulate download - in real app would generate PDF
    const content = `
      PAYSLIP
      Employee: ${payslip.employeeName}
      Month: ${payslip.month} ${payslip.year}
      Basic Salary: ₹${payslip.basicSalary}
      Allowances: ₹${payslip.allowances}
      Deductions: ₹${payslip.deductions}
      Net Salary: ₹${payslip.netSalary}
    `;
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payslip_${payslip.employeeName}_${payslip.month}_${payslip.year}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({ title: "Download Started", description: "Payslip is being downloaded" });
  };

  return (
    <div className="space-y-6">
      <BackButton />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Payslips</h2>
          <p className="text-muted-foreground">Manage employee salary records</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Generate Payslip
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Payslip</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee</Label>
                <select
                  id="employeeId"
                  required
                  className="w-full border border-gray-200 rounded-md px-3 py-2"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <select
                    id="month"
                    required
                    className="w-full border border-gray-200 rounded-md px-3 py-2"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="basicSalary">Basic Salary (₹)</Label>
                <Input
                  id="basicSalary"
                  type="number"
                  required
                  placeholder="0"
                  value={formData.basicSalary}
                  onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowances">Allowances (₹)</Label>
                <Input
                  id="allowances"
                  type="number"
                  required
                  placeholder="0"
                  value={formData.allowances}
                  onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deductions">Deductions (₹)</Label>
                <Input
                  id="deductions"
                  type="number"
                  required
                  placeholder="0"
                  value={formData.deductions}
                  onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                Generate Payslip
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Month/Year</TableHead>
              <TableHead>Basic Salary</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payslips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No payslips generated yet
                </TableCell>
              </TableRow>
            ) : (
              payslips.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell className="font-medium">{payslip.employeeName}</TableCell>
                  <TableCell>{payslip.month} {payslip.year}</TableCell>
                  <TableCell>₹{payslip.basicSalary.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ₹{payslip.netSalary.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(payslip)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPayslips;