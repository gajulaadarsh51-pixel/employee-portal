import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const EmployeePersonalDetails = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    aadhaar: "",
    pan: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!form.fullName || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("personalRequests") || "[]");

    const newRequest = {
      id: Date.now(),
      ...form,
      status: "PENDING",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("personalRequests", JSON.stringify([...existing, newRequest]));

    toast.success("Personal details request submitted successfully!");

    // Reset form
    setForm({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      aadhaar: "",
      pan: "",
      bankName: "",
      accountNumber: "",
      ifsc: "",
      emergencyContact: "",
      emergencyPhone: "",
    });
  };

  return (
    <Card className="shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle>Personal Details Form</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill in your personal details. This information will be reviewed by admin.
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input id="fullName" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="City" value={form.city} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" placeholder="State" value={form.state} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <Input id="aadhaar" name="aadhaar" placeholder="Aadhaar Number" value={form.aadhaar} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input id="pan" name="pan" placeholder="PAN Number" value={form.pan} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" name="bankName" placeholder="Bank Name" value={form.bankName} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" name="accountNumber" placeholder="Account Number" value={form.accountNumber} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ifsc">IFSC Code</Label>
            <Input id="ifsc" name="ifsc" placeholder="IFSC Code" value={form.ifsc} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
            <Input id="emergencyContact" name="emergencyContact" placeholder="Emergency Contact Name" value={form.emergencyContact} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emergencyPhone">Emergency Phone</Label>
            <Input id="emergencyPhone" name="emergencyPhone" placeholder="Emergency Phone" value={form.emergencyPhone} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleSubmit} className="w-full">
            Submit to Admin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeePersonalDetails;