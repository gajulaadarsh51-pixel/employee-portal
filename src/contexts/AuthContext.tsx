import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AuthContextType, User } from "@/types/auth";
import { mockUsers } from "@/data/mockData";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("hr_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    
    // Check in mockUsers first (admin)
    let found = mockUsers.find((u) => u.email === email && u.password === password);
    
    // If not found, check in localStorage employees
    if (!found) {
      const employees = JSON.parse(localStorage.getItem("employees") || "[]");
      found = employees.find((u: any) => u.email === email && u.password === password);
    }
    
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("hr_user", JSON.stringify(userData));
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("hr_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};