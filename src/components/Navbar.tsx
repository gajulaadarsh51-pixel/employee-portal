// FILE: src/components/Navbar.tsx (Updated with Compact Notification UI)

import { useState, useEffect } from "react";
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
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getNotifications, markAsRead, markAllAsRead, Notification } from "@/utils/notifications";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Employees", path: "/admin/employees", icon: <Users className="h-4 w-4" /> },
  { label: "Payslips", path: "/admin/payslips", icon: <FileText className="h-4 w-4" /> },
];

const employeeNav: NavItem[] = [
  { label: "Dashboard", path: "/employee/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Payslips", path: "/employee/payslips", icon: <FileText className="h-4 w-4" /> },
  
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const loadNotifications = () => {
      const stored = getNotifications();
      setNotifications(stored);
    };

    loadNotifications();
    
    window.addEventListener('notifications-updated', loadNotifications);
    
    return () => {
      window.removeEventListener('notifications-updated', loadNotifications);
    };
  }, []);

  if (!user) return null;

  const navItems = user.role === "ADMIN" ? adminNav : employeeNav;
  const profilePath = user.role === "ADMIN" ? "/admin/profile" : "/employee/profile";
  const unreadCount = notifications.length; // All notifications are unread now

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setNotifications(getNotifications());
    navigate(notification.link);
    setNotifOpen(false);
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
    setNotifications(getNotifications());
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

          {/* Right: Notifications + Profile + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown - Compact UI */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-3 py-2 font-semibold text-sm border-b bg-gray-50">
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({unreadCount})
                      </span>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <Bell className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <p className="text-xs text-muted-foreground">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-2 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <p className="text-xs font-semibold text-gray-800">{notification.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div
                      className="px-3 py-1.5 text-center text-xs text-blue-600 cursor-pointer hover:bg-blue-50 transition-colors border-t"
                      onClick={handleMarkAllRead}
                    >
                      Clear all
                    </div>
                  )}
                </div>
              )}
            </div>

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