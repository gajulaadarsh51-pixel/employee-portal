// FILE: src/pages/admin/AdminEmployees.tsx (Complete with all fields)

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
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
  joinDate: string;
  // Job Details
  designation: string;
  salary: string;
  // Experience
  totalExperience: string;
  relevantExperience: string;
  previousCompany: string;
  // Education
  qualification: string;
  college: string;
  yearOfPassing: string;
  // Bank Details
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifsc: string;
  // Address
  currentAddress: string;
  permanentAddress: string;
  temporaryAddress: string;
  // Documents
  certificates: string;
}

const AdminEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    // Job
    designation: "",
    salary: "",
    // Experience
    totalExperience: "",
    relevantExperience: "",
    previousCompany: "",
    // Education
    qualification: "",
    college: "",
    yearOfPassing: "",
    // Bank
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifsc: "",
    // Address
    currentAddress: "",
    permanentAddress: "",
    temporaryAddress: "",
    // Documents
    certificates: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const stored = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(stored);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEmployee) {
      // Update existing employee
      const updated = employees.map((emp) =>
        emp.id === editingEmployee.id
          ? { 
              ...emp, 
              name: formData.name, 
              email: formData.email, 
              department: formData.department,
              designation: formData.designation,
              salary: formData.salary,
              totalExperience: formData.totalExperience,
              relevantExperience: formData.relevantExperience,
              previousCompany: formData.previousCompany,
              qualification: formData.qualification,
              college: formData.college,
              yearOfPassing: formData.yearOfPassing,
              bankName: formData.bankName,
              branchName: formData.branchName,
              accountNumber: formData.accountNumber,
              ifsc: formData.ifsc,
              currentAddress: formData.currentAddress,
              permanentAddress: formData.permanentAddress,
              temporaryAddress: formData.temporaryAddress,
              certificates: formData.certificates,
            }
          : emp
      );
      localStorage.setItem("employees", JSON.stringify(updated));
      toast({ title: "Success", description: "Employee updated successfully" });
    } else {
      // Add new employee - PASSWORD IS REQUIRED
      if (!formData.password) {
        toast({ title: "Error", description: "Password is required", variant: "destructive" });
        return;
      }
      
      const newEmployee: Employee = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "EMPLOYEE",
        department: formData.department,
        joinDate: new Date().toISOString(),
        // Job Details
        designation: formData.designation,
        salary: formData.salary,
        // Experience
        totalExperience: formData.totalExperience,
        relevantExperience: formData.relevantExperience,
        previousCompany: formData.previousCompany,
        // Education
        qualification: formData.qualification,
        college: formData.college,
        yearOfPassing: formData.yearOfPassing,
        // Bank Details
        bankName: formData.bankName,
        branchName: formData.branchName,
        accountNumber: formData.accountNumber,
        ifsc: formData.ifsc,
        // Address
        currentAddress: formData.currentAddress,
        permanentAddress: formData.permanentAddress,
        temporaryAddress: formData.temporaryAddress,
        // Documents
        certificates: formData.certificates,
      };
      
      const updated = [...employees, newEmployee];
      localStorage.setItem("employees", JSON.stringify(updated));
      toast({ title: "Success", description: "Employee added successfully" });
    }
    
    loadEmployees();
    setIsOpen(false);
    setEditingEmployee(null);
    setFormData({ 
      name: "", 
      email: "", 
      password: "", 
      department: "",
      designation: "",
      salary: "",
      totalExperience: "",
      relevantExperience: "",
      previousCompany: "",
      qualification: "",
      college: "",
      yearOfPassing: "",
      bankName: "",
      branchName: "",
      accountNumber: "",
      ifsc: "",
      currentAddress: "",
      permanentAddress: "",
      temporaryAddress: "",
      certificates: "",
    });
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      password: "",
      department: employee.department,
      designation: employee.designation || "",
      salary: employee.salary || "",
      totalExperience: employee.totalExperience || "",
      relevantExperience: employee.relevantExperience || "",
      previousCompany: employee.previousCompany || "",
      qualification: employee.qualification || "",
      college: employee.college || "",
      yearOfPassing: employee.yearOfPassing || "",
      bankName: employee.bankName || "",
      branchName: employee.branchName || "",
      accountNumber: employee.accountNumber || "",
      ifsc: employee.ifsc || "",
      currentAddress: employee.currentAddress || "",
      permanentAddress: employee.permanentAddress || "",
      temporaryAddress: employee.temporaryAddress || "",
      certificates: employee.certificates || "",
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      const updated = employees.filter((emp) => emp.id !== id);
      localStorage.setItem("employees", JSON.stringify(updated));
      loadEmployees();
      toast({ title: "Success", description: "Employee deleted successfully" });
    }
  };

  return (
    <div className="space-y-6">
      <BackButton />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Employees</h2>
          <p className="text-muted-foreground">Manage employee accounts and information</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {!editingEmployee && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Employee will use this password to login</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              {/* Job Details */}
              <div className="pt-2">
                <div className="font-semibold text-foreground mb-2">Job Details</div>
                <div className="space-y-2">
                  <Input
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                  <Input
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  />
                </div>
              </div>

              {/* Experience Details */}
              <div className="pt-2">
                <div className="font-semibold text-foreground mb-2">Experience Details</div>
                <div className="space-y-2">
                  <Input
                    placeholder="Total Experience (Years)"
                    value={formData.totalExperience}
                    onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                  />
                  <Input
                    placeholder="Relevant Experience (Years)"
                    value={formData.relevantExperience}
                    onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                  />
                  <Input
                    placeholder="Previous Company"
                    value={formData.previousCompany}
                    onChange={(e) => setFormData({ ...formData, previousCompany: e.target.value })}
                  />
                </div>
              </div>

              {/* Education */}
              <div className="pt-2">
                <div className="font-semibold text-foreground mb-2">Education</div>
                <div className="space-y-2">
                  <Input
                    placeholder="Highest Qualification"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  />
                  <Input
                    placeholder="College / University"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                  <Input
                    placeholder="Year of Passing"
                    value={formData.yearOfPassing}
                    onChange={(e) => setFormData({ ...formData, yearOfPassing: e.target.value })}
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div className="pt-2">
                <div className="font-semibold text-foreground mb-2">Bank Details</div>
                <div className="space-y-2">
                  <Input
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  />
                  <Input
                    placeholder="Branch Name"
                    value={formData.branchName}
                    onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                  />
                  <Input
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  />
                  <Input
                    placeholder="IFSC Code"
                    value={formData.ifsc}
                    onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                  />
                </div>
              </div>

              {/* Address Details */}
              <div className="pt-2">
                <div className="font-semibold text-foreground mb-2">Address Details</div>
                <div className="space-y-2">
                  <Input
                    placeholder="Current Address"
                    value={formData.currentAddress}
                    onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                  />
                  <Input
                    placeholder="Permanent Address"
                    value={formData.permanentAddress}
                    onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                  />
                  <Input
                    placeholder="Temporary Address"
                    value={formData.temporaryAddress}
                    onChange={(e) => setFormData({ ...formData, temporaryAddress: e.target.value })}
                  />
                </div>
              </div>

              {/* Documents */}
              <div className="pt-2">
                <div className="font-semibold text-foreground mb-2">Documents</div>
                <div className="space-y-2">
                  <Input
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certificates: e.target.files?.[0]?.name || "",
                      })
                    }
                  />
                  {formData.certificates && (
                    <p className="text-xs text-green-600">Selected: {formData.certificates}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full mt-4">
                {editingEmployee ? "Update" : "Add"} Employee
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department || "—"}</TableCell>
                  <TableCell>{emp.designation || "—"}</TableCell>
                  <TableCell>{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(emp)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(emp.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
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

export default AdminEmployees;