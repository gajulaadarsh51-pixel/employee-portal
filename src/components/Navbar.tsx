// FILE: src/components/Navbar.tsx (Updated with Calendar links)

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Coffee,
  LayoutDashboard,
  Users,
  FileText,
  CalendarDays,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Send,
  CheckCircle,
  UserCircle,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Employees", path: "/admin/employees", icon: <Users className="h-4 w-4" /> },
  { label: "Payslips", path: "/admin/payslips", icon: <FileText className="h-4 w-4" /> },
  { label: "Leave Requests", path: "/admin/leaves", icon: <CalendarDays className="h-4 w-4" /> },
  { label: "Calendar", path: "/admin/calendar", icon: <CalendarDays className="h-4 w-4" /> },
  { label: "Resignations", path: "/admin/resignations", icon: <ClipboardList className="h-4 w-4" /> },
  { label: "Reports", path: "/admin/reports", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Personal Requests", path: "/admin/personal-details", icon: <FileCheck className="h-4 w-4" /> },
];

const employeeNav: NavItem[] = [
  { label: "Dashboard", path: "/employee/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Payslips", path: "/employee/payslips", icon: <FileText className="h-4 w-4" /> },
  { label: "Apply Leave", path: "/employee/apply-leave", icon: <Send className="h-4 w-4" /> },
  { label: "Leave Status", path: "/employee/leave-status", icon: <CheckCircle className="h-4 w-4" /> },
  { label: "Calendar", path: "/employee/calendar", icon: <CalendarDays className="h-4 w-4" /> },
  { label: "Resignation", path: "/employee/resignation", icon: <ClipboardList className="h-4 w-4" /> },
  { label: "Personal Details", path: "/employee/personal-details", icon: <UserCircle className="h-4 w-4" /> },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const navItems = user.role === "ADMIN" ? adminNav : employeeNav;
  const profilePath = user.role === "ADMIN" ? "/admin/profile" : "/employee/profile";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link to={user.role === "ADMIN" ? "/admin/dashboard" : "/employee/dashboard"} className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-chocolate transition-transform group-hover:scale-105">
              <Coffee className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:block" style={{ fontFamily: "'Playfair Display', serif" }}>
              TruffleHR
            </span>
          </Link>

          {/* Center: Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Profile + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-muted transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-foreground leading-tight">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate(profilePath)}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/40 bg-card/95 backdrop-blur-xl animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
            
            {/* Logout in mobile menu */}
            <div className="pt-2 border-t mt-2">
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;