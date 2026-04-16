// FILE: src/App.tsx (Updated with Calendar routes)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";

import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// Employee pages
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeePayslips from "./pages/employee/EmployeePayslips";
import ApplyLeave from "./pages/employee/ApplyLeave";
import LeaveStatus from "./pages/employee/LeaveStatus";
import EmployeeResignation from "./pages/employee/EmployeeResignation";
import EmployeePersonalDetails from "./pages/employee/EmployeePersonalDetails";
import EmployeeCalendar from "./pages/employee/EmployeeCalendar";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminPayslips from "./pages/admin/AdminPayslips";
import AdminLeaves from "./pages/admin/AdminLeaves";
import AdminResignations from "./pages/admin/AdminResignations";
import AdminReports from "./pages/admin/AdminReports";
import AdminPersonalDetails from "./pages/admin/AdminPersonalDetails";
import AdminCalendar from "./pages/admin/AdminCalendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]}><AppLayout /></ProtectedRoute>}>
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee/payslips" element={<EmployeePayslips />} />
              <Route path="/employee/apply-leave" element={<ApplyLeave />} />
              <Route path="/employee/leave-status" element={<LeaveStatus />} />
              <Route path="/employee/resignation" element={<EmployeeResignation />} />
              <Route path="/employee/profile" element={<Profile />} />
              <Route path="/employee/personal-details" element={<EmployeePersonalDetails />} />
              <Route path="/employee/calendar" element={<EmployeeCalendar />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]}><AppLayout /></ProtectedRoute>}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/employees" element={<AdminEmployees />} />
              <Route path="/admin/payslips" element={<AdminPayslips />} />
              <Route path="/admin/leaves" element={<AdminLeaves />} />
              <Route path="/admin/resignations" element={<AdminResignations />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/personal-details" element={<AdminPersonalDetails />} />
              <Route path="/admin/calendar" element={<AdminCalendar />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;