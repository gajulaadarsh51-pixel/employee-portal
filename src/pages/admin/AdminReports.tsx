// FILE: src/pages/admin/AdminReports.tsx (With BackButton)

import BackButton from "@/components/BackButton";

const AdminReports = () => {
  return (
    <div className="space-y-6">
      <BackButton />
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">View analytics and reports</p>
      </div>

      <div className="card">
        <p className="text-center text-muted-foreground py-8">
          Reports feature coming soon...
        </p>
      </div>
    </div>
  );
};

export default AdminReports;