import { User } from "@/types/auth";
import { Employee, LeaveRequest, Payslip, ResignationRequest } from "@/types/hr";

export const mockUsers: (User & { password: string })[] = [
  {
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
  },
  {
    id: "emp-1",
    email: "anita@company.com",
    password: "emp123",
    name: "Anita Sharma",
    role: "EMPLOYEE",
    employeeId: "EMP001",
    designation: "Software Engineer",
    joiningDate: "2022-03-10",
    department: "Engineering",
    phone: "+91 9876543211",
  },
  {
    id: "emp-2",
    email: "vikram@company.com",
    password: "emp123",
    name: "Vikram Patel",
    role: "EMPLOYEE",
    employeeId: "EMP002",
    designation: "UI/UX Designer",
    joiningDate: "2021-07-22",
    department: "Design",
    phone: "+91 9876543212",
  },
  {
    id: "emp-3",
    email: "priya@company.com",
    password: "emp123",
    name: "Priya Nair",
    role: "EMPLOYEE",
    employeeId: "EMP003",
    designation: "Marketing Lead",
    joiningDate: "2023-01-05",
    department: "Marketing",
    phone: "+91 9876543213",
  },
];

export const mockEmployees: Employee[] = mockUsers
  .filter((u) => u.role === "EMPLOYEE")
  .map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    employeeId: u.employeeId,
    designation: u.designation,
    department: u.department,
    joiningDate: u.joiningDate,
    phone: u.phone,
    workStatus: "Active" as const,
    role: "EMPLOYEE" as const,
  }));

export const mockLeaveRequests: LeaveRequest[] = [
  { id: "l1", userId: "emp-1", employeeName: "Anita Sharma", leaveType: "Casual", startDate: "2024-12-20", endDate: "2024-12-22", reason: "Family function", status: "Pending", appliedOn: "2024-12-15" },
  { id: "l2", userId: "emp-2", employeeName: "Vikram Patel", leaveType: "Sick", startDate: "2024-12-10", endDate: "2024-12-11", reason: "Not feeling well", status: "Approved", appliedOn: "2024-12-09" },
  { id: "l3", userId: "emp-1", employeeName: "Anita Sharma", leaveType: "Earned", startDate: "2024-11-01", endDate: "2024-11-05", reason: "Vacation", status: "Approved", appliedOn: "2024-10-20" },
  { id: "l4", userId: "emp-3", employeeName: "Priya Nair", leaveType: "Casual", startDate: "2024-12-25", endDate: "2024-12-27", reason: "Personal work", status: "Pending", appliedOn: "2024-12-18" },
];

export const mockPayslips: Payslip[] = [
  { id: "p1", userId: "emp-1", month: "November", year: 2024, basicSalary: 50000, hra: 20000, allowances: 10000, deductions: 8000, netSalary: 72000 },
  { id: "p2", userId: "emp-1", month: "October", year: 2024, basicSalary: 50000, hra: 20000, allowances: 10000, deductions: 8000, netSalary: 72000 },
  { id: "p3", userId: "emp-2", month: "November", year: 2024, basicSalary: 45000, hra: 18000, allowances: 8000, deductions: 7000, netSalary: 64000 },
  { id: "p4", userId: "emp-2", month: "October", year: 2024, basicSalary: 45000, hra: 18000, allowances: 8000, deductions: 7000, netSalary: 64000 },
  { id: "p5", userId: "emp-3", month: "November", year: 2024, basicSalary: 55000, hra: 22000, allowances: 12000, deductions: 9000, netSalary: 80000 },
];

export const mockResignations: ResignationRequest[] = [
  { id: "r1", userId: "emp-3", employeeName: "Priya Nair", reason: "Better opportunity", submittedOn: "2024-12-01", lastWorkingDate: "2025-01-31", status: "Pending" },
];
