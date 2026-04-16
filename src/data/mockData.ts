import { User } from "@/types/auth";
import { Employee, LeaveRequest, Payslip, ResignationRequest } from "@/types/hr";

// Initialize localStorage with admin user if not exists
const initializeData = () => {
  // Initialize employees
  if (!localStorage.getItem("employees")) {
    localStorage.setItem("employees", JSON.stringify([]));
  }
  
  // Initialize mockUsers for authentication
  if (!localStorage.getItem("mockUsers")) {
    const adminUser = {
      id: "admin-1",
      email: "admin@company.com",
      password: "admin123",
      name: "Rajesh Kumar",
      role: "ADMIN",
      employeeId: "ADM001",
      designation: "HR Manager",
      joiningDate: "2020-01-15",
      department: "Human Resources",
      phone: "+91 9876543210",
    };
    localStorage.setItem("mockUsers", JSON.stringify([adminUser]));
  }
  
  // Initialize other data
  if (!localStorage.getItem("leaveRequests")) {
    localStorage.setItem("leaveRequests", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("payslips")) {
    localStorage.setItem("payslips", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("resignations")) {
    localStorage.setItem("resignations", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("personalRequests")) {
    localStorage.setItem("personalRequests", JSON.stringify([]));
  }
};

// Call initialization
initializeData();

// For backward compatibility, export empty arrays
export const mockUsers: (User & { password: string })[] = JSON.parse(localStorage.getItem("mockUsers") || "[]");
export const mockEmployees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
export const mockLeaveRequests: LeaveRequest[] = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
export const mockPayslips: Payslip[] = JSON.parse(localStorage.getItem("payslips") || "[]");
export const mockResignations: ResignationRequest[] = JSON.parse(localStorage.getItem("resignations") || "[]");