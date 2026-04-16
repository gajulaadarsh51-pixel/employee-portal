import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LeaveType } from "@/types/hr";

const leaveTypes: LeaveType[] = ["Casual", "Sick", "Earned", "Maternity", "Paternity", "Unpaid"];

const ApplyLeave = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    // Get existing leave requests from localStorage
    const existing = JSON.parse(localStorage.getItem("leaveRequests") || "[]");

    // Create new leave request
    const newLeave = {
      id: Date.now().toString(),
      userId: user?.id,
      employeeName: user?.name,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };

    // Save to localStorage
    localStorage.setItem("leaveRequests", JSON.stringify([...existing, newLeave]));

    toast({
      title: "Leave Applied",
      description: "Your leave request has been submitted successfully.",
    });

    // Reset form
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <Send className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Apply for Leave</h1>
          <p className="text-sm text-muted-foreground">Submit your leave request</p>
        </div>
      </div>

      <Card className="bg-white border rounded-xl shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Leave Type *</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Reason *</Label>
              <Textarea 
                placeholder="Describe the reason for leave..." 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                rows={4} 
              />
            </div>
            
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Submit Leave Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplyLeave;