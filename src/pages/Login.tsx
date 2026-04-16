// FILE: src/pages/Login.tsx (Updated with Laptop icon and gradient styling)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Laptop } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginType, setLoginType] = useState<"admin" | "employee">("admin");

  const [adminEmail, setAdminEmail] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const userId = loginType === "admin" ? adminEmail : employeeEmail;

    const success = await login(userId, password);

    if (success) {
      const stored = JSON.parse(localStorage.getItem("hr_user") || "{}");
      navigate(
        stored.role === "ADMIN"
          ? "/admin/dashboard"
          : "/employee/dashboard"
      );
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg">
        <CardContent className="p-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
                <Laptop className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to your account
            </p>
          </div>

          {/* LOGIN TYPE TOGGLE */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLoginType("admin")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                loginType === "admin"
                  ? "bg-white shadow-md text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setLoginType("employee")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                loginType === "employee"
                  ? "bg-white shadow-md text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Employee
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL / USERNAME INPUT */}
            <Input
              placeholder={loginType === "admin" ? "Admin Email" : "Email"}
              type="email"
              value={loginType === "admin" ? adminEmail : employeeEmail}
              onChange={(e) => {
                if (loginType === "admin") {
                  setAdminEmail(e.target.value);
                } else {
                  setEmployeeEmail(e.target.value);
                }
              }}
              className="h-11"
            />

            {/* PASSWORD INPUT */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 h-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

          

            {/* LOGIN BUTTON */}
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;