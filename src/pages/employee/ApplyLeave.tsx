// FILE: src/pages/employee/ApplyLeave.tsx (Updated with target)

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNotification } from "@/utils/notifications";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

const ApplyLeave = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    type: "Sick",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const newLeave = {
      id: Date.now().toString(),
      employeeName: user?.name,
      employeeId: user?.id,
      ...formData,
      status: "Pending",
      appliedOn: new Date().toISOString(),
    };
    leaves.push(newLeave);
    localStorage.setItem("leaveRequests", JSON.stringify(leaves));

    // 🔔 Notification for ADMIN only
    addNotification({
      id: Date.now().toString(),
      title: "New Leave Request",
      message: `${user?.name} applied for ${formData.type} leave from ${formData.startDate} to ${formData.endDate}`,
      link: "/admin/leaves",
      target: "ADMIN", // 🔥 Only admin sees this
    });

    toast({
      title: "Leave Applied",
      description: "Your leave request has been submitted successfully.",
    });

    setFormData({
      startDate: "",
      endDate: "",
      type: "Sick",
      reason: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton />
      
      <h2 className="text-2xl font-bold tracking-tight mb-6">Apply for Leave</h2>
      
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Leave Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select leave type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sick">Sick Leave</SelectItem>
              <SelectItem value="Casual">Casual Leave</SelectItem>
              <SelectItem value="Annual">Annual Leave</SelectItem>
              <SelectItem value="Emergency">Emergency Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason</Label>
          <Textarea
            id="reason"
            placeholder="Please provide reason for leave"
            required
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Submit Leave Request
        </Button>
      </form>
    </div>
  );
};

export default ApplyLeave;