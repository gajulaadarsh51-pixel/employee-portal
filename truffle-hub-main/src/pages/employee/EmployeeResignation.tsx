import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockResignations } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmployeeResignation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const existing = mockResignations.find((r) => r.userId === user?.id);
  const [reason, setReason] = useState("");
  const [lastDate, setLastDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !lastDate) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Resignation Submitted", description: "Your resignation request has been submitted." });
    setReason("");
    setLastDate("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <ClipboardList className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resignation</h1>
          <p className="text-sm text-muted-foreground">Submit or track your resignation</p>
        </div>
      </div>

      {existing ? (
        <Card className="glass-card">
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">Existing Resignation Request</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Submitted On</p>
                <p className="font-medium">{existing.submittedOn}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Working Date</p>
                <p className="font-medium">{existing.lastWorkingDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reason</p>
                <p className="font-medium">{existing.reason}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">{existing.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Last Working Date</Label>
                <Input type="date" value={lastDate} onChange={(e) => setLastDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Reason for Resignation</Label>
                <Textarea placeholder="Please provide your reason..." value={reason} onChange={(e) => setReason(e.target.value)} rows={4} />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Resignation
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeResignation;
