import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Update mockUsers in localStorage when adding employee
const updateMockUsers = (newEmployee: any) => {
  const existingUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
  const userForAuth = {
    id: newEmployee.id,
    email: newEmployee.email,
    password: newEmployee.password,
    name: newEmployee.name,
    role: "EMPLOYEE",
    employeeId: newEmployee.employeeId,
    designation: newEmployee.designation,
    joiningDate: newEmployee.joiningDate,
    department: newEmployee.department,
    phone: newEmployee.phone,
  };
  const updatedUsers = [...existingUsers, userForAuth];
  localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
};

// Remove user from mockUsers when employee is deleted
const removeFromMockUsers = (email: string) => {
  const existingUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
  const updatedUsers = existingUsers.filter((user: any) => user.email !== email);
  localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
};

const AdminEmployees = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
  });

  // Load employees from localStorage on component mount
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(storedEmployees);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEmp.name || !newEmp.email || !newEmp.password || !newEmp.employeeId) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    // Check if employee already exists
    const existingEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
    
    // Check for duplicate email
    const emailExists = existingEmployees.some((emp: any) => emp.email === newEmp.email);
    if (emailExists) {
      toast({
        title: "Error",
        description: "Employee with this email already exists",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate Employee ID
    const idExists = existingEmployees.some((emp: any) => emp.employeeId === newEmp.employeeId);
    if (idExists) {
      toast({
        title: "Error",
        description: "Employee ID already exists. Please use a unique ID",
        variant: "destructive",
      });
      return;
    }

    // Create new employee object
    const newEmployee = {
      id: Date.now().toString(),
      name: newEmp.name,
      email: newEmp.email,
      password: newEmp.password,
      employeeId: newEmp.employeeId,
      designation: "New Employee",
      department: "General",
      joiningDate: new Date().toISOString().split("T")[0],
      phone: "",
      workStatus: "Active",
      role: "EMPLOYEE",
    };

    // Save to localStorage
    const updatedEmployees = [...existingEmployees, newEmployee];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    
    // Also update mockUsers for authentication
    updateMockUsers(newEmployee);
    
    // Update state
    setEmployees(updatedEmployees);

    toast({
      title: "Employee Created",
      description: `${newEmp.name} added successfully with ID: ${newEmp.employeeId}`,
    });

    // Reset form
    setNewEmp({ name: "", email: "", password: "", employeeId: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string, email: string, name: string) => {
    // Filter out the employee to delete
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    
    // Update state and localStorage
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    
    // Remove from mockUsers so they can't login
    removeFromMockUsers(email);
    
    toast({
      title: "Employee Removed",
      description: `${name} has been removed from the system`,
    });
  };

  // Filter employees based on search
  const filtered = employees.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employees</h1>
            <p className="text-sm text-muted-foreground">{employees.length} total employees</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search employees..." 
              className="pl-9 w-60" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Employee Account</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input 
                    value={newEmp.name} 
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })} 
                    placeholder="John Doe" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input 
                    type="email" 
                    value={newEmp.email} 
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })} 
                    placeholder="john@company.com" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employee ID *</Label>
                  <Input
                    value={newEmp.employeeId}
                    onChange={(e) => setNewEmp({ ...newEmp, employeeId: e.target.value })}
                    placeholder="EMP001"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Enter a unique Employee ID (e.g., EMP001, E1001)</p>
                </div>
                <div className="space-y-2">
                  <Label>Password *</Label>
                  <Input 
                    type="password" 
                    value={newEmp.password} 
                    onChange={(e) => setNewEmp({ ...newEmp, password: e.target.value })} 
                    placeholder="Set initial password" 
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Create Employee</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No employees yet</h3>
              <p className="text-sm text-muted-foreground">
                Click "Add Employee" button above to create your first employee
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-mono text-sm">{e.employeeId}</TableCell>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{e.designation}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{e.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        {e.workStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(e.id, e.email, e.name)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
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

export default AdminEmployees;