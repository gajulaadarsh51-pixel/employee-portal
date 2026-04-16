import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Coffee } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginType, setLoginType] = useState<"email" | "employeeId">("email");
  const [useOtp, setUseOtp] = useState(false);

  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // 🔥 MAIN LOGIN
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const userId = loginType === "email" ? email : employeeId;
    const pass = useOtp ? otp : password;

    const success = await login(userId, pass);

    if (success) {
      const stored = JSON.parse(localStorage.getItem("hr_user") || "{}");
      navigate(stored.role === "ADMIN" ? "/admin/dashboard" : "/employee/dashboard");
    }
  };

  // 🔥 ADMIN QUICK LOGIN
  const handleAdminLogin = async () => {
    await login("admin@company.com", "admin123");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-black">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-center items-center text-white p-10 relative">

        <div className="absolute w-72 h-72 bg-blue-500/10 blur-3xl rounded-full top-20 left-20"></div>

        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <Coffee className="h-10 w-10" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">TruffleHR</h1>
          <p className="mt-2 text-gray-400">Enterprise Employee Management</p>

          <div className="mt-8 space-y-2 text-sm text-gray-400">
            <p>✔ Smart Employee Management</p>
            <p>✔ Payroll & Payslips</p>
            <p>✔ Leave & Attendance</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6">

        <Card className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
          <CardContent className="p-6">

            <h2 className="text-2xl text-white font-semibold text-center">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm text-center mb-6">
              Sign in to continue
            </p>

            {/* LOGIN TYPE */}
            <div className="flex mb-4 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setLoginType("email")}
                className={`flex-1 py-1 text-sm rounded-md ${
                  loginType === "email" ? "bg-blue-600 text-white" : "text-gray-400"
                }`}
              >
                Email
              </button>

              <button
                onClick={() => setLoginType("employeeId")}
                className={`flex-1 py-1 text-sm rounded-md ${
                  loginType === "employeeId" ? "bg-blue-600 text-white" : "text-gray-400"
                }`}
              >
                Employee ID
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">

              {/* EMAIL / EMPLOYEE */}
              {loginType === "email" ? (
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              ) : (
                <Input
                  placeholder="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              )}

              {/* PASSWORD */}
              {!useOtp && (
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              )}

              {/* OTP */}
              {useOtp && (
                <Input
                  placeholder="Enter OTP (demo: 1234)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              )}

              {/* OPTIONS */}
              <div className="flex justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => alert("Reset link sent (demo)")}
                  className="hover:text-white"
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Sign In
              </Button>

              {/* OTP SWITCH */}
              <button
                type="button"
                onClick={() => setUseOtp(!useOtp)}
                className="text-sm text-blue-400 w-full"
              >
                {useOtp ? "Use Password Instead" : "Login with OTP"}
              </button>

              {/* ADMIN BUTTON */}
              <Button
                type="button"
                onClick={handleAdminLogin}
                className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white"
              >
                Login as Admin
              </Button>

            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;