export type LeaveType = "Casual" | "Sick" | "Earned" | "Maternity" | "Paternity" | "Unpaid";
export type LeaveStatus = "Pending" | "Approved" | "Rejected";
export type ResignationStatus = "Pending" | "Accepted" | "Rejected" | "Withdrawn";
export type WorkStatus = "Active" | "On Leave" | "Notice Period" | "Resigned";

export interface LeaveRequest {
  id: string;
  userId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
}

export interface Payslip {
  id: string;
  userId: string;
  month: string;
  year: number;
  basicSalary: number;
  hra: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  pdfUrl?: string;
}

export interface ResignationRequest {
  id: string;
  userId: string;
  employeeName: string;
  reason: string;
  submittedOn: string;
  lastWorkingDate: string;
  status: ResignationStatus;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  designation: string;
  department: string;
  joiningDate: string;
  phone: string;
  workStatus: WorkStatus;
  role: "EMPLOYEE";
}
