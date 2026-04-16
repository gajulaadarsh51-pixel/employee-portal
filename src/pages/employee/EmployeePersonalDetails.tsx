// FILE: src/pages/employee/EmployeePersonalDetails.tsx (With BackButton)

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addNotification } from "@/utils/notifications";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";

const EmployeePersonalDetails = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    emergencyContact: "",
    bankAccount: "",
    panNumber: "",
    requestType: "Update",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`personal_details_${user?.id}`) || "{}");
    setFormData(prev => ({ ...prev, ...saved }));
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    localStorage.setItem(`personal_details_${user?.id}`, JSON.stringify(formData));

    addNotification({
      id: Date.now().toString(),
      title: "Personal Details Update Request",
      message: `${user?.name} requested to update personal information`,
      link: "/admin/personal-details",
      read: false,
    });

    toast({
      title: "Request Submitted",
      description: "Your personal details update request has been sent to admin.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton />
      
      <h2 className="text-2xl font-bold tracking-tight mb-6">Personal Details</h2>
      
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
          <Input
            id="emergencyContact"
            placeholder="Emergency contact number"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankAccount">Bank Account Number</Label>
          <Input
            id="bankAccount"
            placeholder="Bank account number"
            value={formData.bankAccount}
            onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="panNumber">PAN Number</Label>
          <Input
            id="panNumber"
            placeholder="PAN number"
            value={formData.panNumber}
            onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full">Submit Update Request</Button>
      </form>
    </div>
  );
};

export default EmployeePersonalDetails;