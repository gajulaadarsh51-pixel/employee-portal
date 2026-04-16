// FILE: src/pages/employee/EmployeeResignation.tsx (With BackButton)

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addNotification } from "@/utils/notifications";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

const EmployeeResignation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    lastWorkingDay: "",
    reason: "",
    comments: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resignations = JSON.parse(localStorage.getItem("resignations") || "[]");
    const newResignation = {
      id: Date.now().toString(),
      employeeName: user?.name,
      employeeId: user?.id,
      ...formData,
      status: "Pending",
      submittedOn: new Date().toISOString(),
    };
    resignations.push(newResignation);
    localStorage.setItem("resignations", JSON.stringify(resignations));

    addNotification({
      id: Date.now().toString(),
      title: "New Resignation Request",
      message: `${user?.name} has submitted resignation`,
      link: "/admin/resignations",
      read: false,
    });

    toast({
      title: "Resignation Submitted",
      description: "Your resignation has been submitted successfully.",
    });

    setFormData({
      lastWorkingDay: "",
      reason: "",
      comments: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton />
      
      <h2 className="text-2xl font-bold tracking-tight mb-6">Submit Resignation</h2>
      
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lastWorkingDay">Last Working Day</Label>
          <Input
            id="lastWorkingDay"
            type="date"
            required
            value={formData.lastWorkingDay}
            onChange={(e) => setFormData({ ...formData, lastWorkingDay: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Resignation</Label>
          <select
            id="reason"
            required
            className="w-full border rounded-md px-3 py-2"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          >
            <option value="">Select reason</option>
            <option value="Better Opportunity">Better Opportunity</option>
            <option value="Higher Studies">Higher Studies</option>
            <option value="Personal Reasons">Personal Reasons</option>
            <option value="Relocation">Relocation</option>
            <option value="Health Issues">Health Issues</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Additional Comments (Optional)</Label>
          <Textarea
            id="comments"
            placeholder="Any additional information..."
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
          Submit Resignation
        </Button>
      </form>
    </div>
  );
};

export default EmployeeResignation;