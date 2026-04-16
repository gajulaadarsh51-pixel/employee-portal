import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/contexts/AuthContext";

const AppLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Logout Button Bottom Left - Optional, you can keep or remove */}
      <button
        onClick={logout}
        className="fixed bottom-4 left-4 text-red-600 hover:text-red-700 transition-colors text-sm opacity-50 hover:opacity-100"
      >
        Logout
      </button>
    </div>
  );
};

export default AppLayout;