import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Briefcase, 
  Calendar, 
  Hash, 
  Activity,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  CalendarDays,
  Users,
  CreditCard,
  TrendingUp,
  Target,
  CalendarCheck,
  Bell,
  Calendar as CalendarIcon,
  Check,
  X,
  Clock as ClockIcon,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Job Calendar Component with 12 months support
const JobCalendar = ({ onBack }: { onBack: () => void }) => {
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Complete holiday and event data for all 12 months of 2024
  const calendarEvents: { [key: string]: any[] } = {
    // January 2024
    "2024-01-01": [{ id: 1, title: "New Year's Day", type: "holiday", description: "Public holiday - New Year celebration" }],
    "2024-01-15": [{ id: 2, title: "Pongal/Makar Sankranti", type: "holiday", description: "Harvest festival celebration" }],
    "2024-01-26": [{ id: 3, title: "Republic Day", type: "holiday", description: "National holiday - Republic Day celebration" }],
    "2024-01-10": [{ id: 4, title: "Team Building Workshop", type: "event", description: "Mandatory team building workshop at 10:00 AM" }],
    "2024-01-20": [{ id: 5, title: "Quarterly Review Meeting", type: "meeting", description: "Q4 review meeting with all departments" }],
    "2024-01-25": [{ id: 6, title: "Employee Appreciation Day", type: "event", description: "Celebration of employee achievements" }],
    
    // February 2024
    "2024-02-14": [{ id: 7, title: "Valentine's Day", type: "event", description: "Office celebration and fun activities" }],
    "2024-02-19": [{ id: 8, title: "Shivaji Jayanti", type: "holiday", description: "Public holiday" }],
    "2024-02-25": [{ id: 9, title: "Product Launch Meeting", type: "meeting", description: "New product launch strategy meeting" }],
    
    // March 2024
    "2024-03-08": [{ id: 10, title: "International Women's Day", type: "event", description: "Celebration and recognition of women employees" }],
    "2024-03-25": [{ id: 11, title: "Holi", type: "holiday", description: "Festival of colors - Public holiday" }],
    "2024-03-29": [{ id: 12, title: "Good Friday", type: "holiday", description: "Public holiday" }],
    "2024-03-31": [{ id: 13, title: "Financial Year End", type: "meeting", description: "Year end closing meeting" }],
    
    // April 2024
    "2024-04-01": [{ id: 14, title: "New Financial Year", type: "event", description: "Start of new financial year" }],
    "2024-04-09": [{ id: 15, title: "Gudi Padwa", type: "holiday", description: "Maharashtra New Year" }],
    "2024-04-14": [{ id: 16, title: "Ambedkar Jayanti", type: "holiday", description: "Public holiday" }],
    "2024-04-17": [{ id: 17, title: "Ram Navami", type: "holiday", description: "Public holiday" }],
    "2024-04-20": [{ id: 18, title: "Quarterly Planning", type: "meeting", description: "Q2 planning meeting" }],
    
    // May 2024
    "2024-05-01": [{ id: 19, title: "Labor Day", type: "holiday", description: "International Workers' Day" }],
    "2024-05-10": [{ id: 20, title: "Performance Review", type: "meeting", description: "Mid-year performance reviews" }],
    "2024-05-23": [{ id: 21, title: "Buddha Purnima", type: "holiday", description: "Public holiday" }],
    
    // June 2024
    "2024-06-07": [{ id: 22, title: "Annual Conference", type: "event", description: "Company annual conference" }],
    "2024-06-17": [{ id: 23, title: "Bakri Eid", type: "holiday", description: "Public holiday" }],
    "2024-06-21": [{ id: 24, title: "International Yoga Day", type: "event", description: "Yoga session at office" }],
    
    // July 2024
    "2024-07-06": [{ id: 25, title: "Team Outing", type: "event", description: "Annual team building outing" }],
    "2024-07-17": [{ id: 26, title: "Muharram", type: "holiday", description: "Public holiday" }],
    "2024-07-25": [{ id: 27, title: "Mid-Year Review", type: "meeting", description: "Half-yearly business review" }],
    
    // August 2024
    "2024-08-15": [{ id: 28, title: "Independence Day", type: "holiday", description: "National holiday" }],
    "2024-08-19": [{ id: 29, title: "Raksha Bandhan", type: "event", description: "Celebration at office" }],
    "2024-08-26": [{ id: 30, title: "Janmashtami", type: "holiday", description: "Public holiday" }],
    
    // September 2024
    "2024-09-05": [{ id: 31, title: "Teachers' Day", type: "event", description: "Celebration and recognition" }],
    "2024-09-07": [{ id: 32, title: "Ganesh Chaturthi", type: "holiday", description: "Public holiday" }],
    "2024-09-20": [{ id: 33, title: "Quarterly Review", type: "meeting", description: "Q3 business review" }],
    
    // October 2024
    "2024-10-02": [{ id: 34, title: "Gandhi Jayanti", type: "holiday", description: "National holiday" }],
    "2024-10-12": [{ id: 35, title: "Dussehra", type: "holiday", description: "Public holiday" }],
    "2024-10-20": [{ id: 36, title: "Diwali Celebration", type: "event", description: "Office Diwali party" }],
    "2024-10-31": [{ id: 37, title: "Diwali", type: "holiday", description: "Festival of lights" }],
    
    // November 2024
    "2024-11-01": [{ id: 38, title: "Diwali Holidays", type: "holiday", description: "Public holiday" }],
    "2024-11-15": [{ id: 39, title: "Guru Nanak Jayanti", type: "holiday", description: "Public holiday" }],
    "2024-11-25": [{ id: 40, title: "Annual Budget Meeting", type: "meeting", description: "Next year budget planning" }],
    
    // December 2024
    "2024-12-15": [{ id: 41, title: "Christmas Party", type: "event", description: "Annual Christmas celebration" }],
    "2024-12-25": [{ id: 42, title: "Christmas Day", type: "holiday", description: "Public holiday" }],
    "2024-12-31": [{ id: 43, title: "New Year's Eve", type: "event", description: "Year end celebration party" }]
  };

  const getEventsForDate = (year: number, month: number, date: number) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    return calendarEvents[dateStr] || [];
  };

  const getEventColor = (type: string) => {
    switch(type) {
      case 'holiday':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'event':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'meeting':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDateClick = (date: number, events: any[]) => {
    if (events.length > 0) {
      const fullDate = new Date(currentYear, currentMonth, date);
      setSelectedDate(fullDate);
      setSelectedEvent(events[0]);
      setShowDetails(true);
    }
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const changeMonth = (delta: number) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Count events by type for current month
  const monthlyStats = () => {
    let holidays = 0, events = 0, meetings = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const evts = calendarEvents[dateStr] || [];
      evts.forEach(e => {
        if (e.type === 'holiday') holidays++;
        else if (e.type === 'event') events++;
        else if (e.type === 'meeting') meetings++;
      });
    }
    return { holidays, events, meetings };
  };

  const stats = monthlyStats();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Job Calendar</h2>
          <p className="text-muted-foreground">View holidays, events, and meetings</p>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Monthly Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100/20 border-2 border-red-200 text-center">
          <p className="text-sm font-medium text-red-600">Holidays</p>
          <p className="text-2xl font-bold text-red-700">{stats.holidays}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100/20 border-2 border-green-200 text-center">
          <p className="text-sm font-medium text-green-600">Events</p>
          <p className="text-2xl font-bold text-green-700">{stats.events}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/20 border-2 border-blue-200 text-center">
          <p className="text-sm font-medium text-blue-600">Meetings</p>
          <p className="text-2xl font-bold text-blue-700">{stats.meetings}</p>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4">
        <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <span className="text-xl font-bold">{monthNames[currentMonth]}</span>
          <span className="text-xl font-bold text-muted-foreground ml-2">{currentYear}</span>
        </div>
        <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {weekDays.map((day, index) => (
              <div key={index} className="p-3 text-center font-semibold text-sm border-r last:border-r-0 bg-muted/30">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-fr">
            {calendarDays.map((day, index) => {
              const events = day ? getEventsForDate(currentYear, currentMonth, day) : [];
              const hasEvents = events.length > 0;
              const mainEvent = hasEvents ? events[0] : null;
              return (
                <div
                  key={index}
                  onClick={() => day && handleDateClick(day, events)}
                  className={`min-h-[100px] p-2 border-b border-r last:border-r-0 transition-all ${
                    day ? 'bg-card cursor-pointer hover:bg-accent/20' : 'bg-muted/20'
                  }`}
                >
                  {day && (
                    <>
                      <span className={`text-sm font-medium ${hasEvents ? 'font-bold' : ''}`}>
                        {day}
                      </span>
                      {mainEvent && (
                        <div className={`mt-1 p-1 rounded text-xs ${getEventColor(mainEvent.type)} border`}>
                          <p className="font-medium truncate">{mainEvent.title}</p>
                        </div>
                      )}
                      {events.length > 1 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          +{events.length - 1} more
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex justify-center gap-6 flex-wrap p-4 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-muted-foreground">Holiday</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-muted-foreground">Event</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-muted-foreground">Meeting</span>
        </div>
      </div>

      {/* Event Details Modal */}
      {showDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full p-6 shadow-xl animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-2 ${getEventColor(selectedEvent.type)}`}>
                  {selectedEvent.type.toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-foreground">{selectedEvent.title}</h3>
              </div>
              <button
                onClick={closeDetails}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm">
                  {selectedDate?.toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <p className="text-foreground">{selectedEvent.description}</p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={closeDetails} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Leave Balance Page Component
const LeaveBalancePage = ({ onBack }: { onBack: () => void }) => {
  const leaveBalanceDetails = {
    totalLeaves: 24,
    usedLeaves: 12,
    remainingLeaves: 12,
    sickLeave: 8,
    casualLeave: 10,
    earnedLeave: 6,
    sickLeaveUsed: 3,
    casualLeaveUsed: 5,
    earnedLeaveUsed: 4,
    sickLeaveRemaining: 5,
    casualLeaveRemaining: 5,
    earnedLeaveRemaining: 2,
    lastUpdated: "15 January 2024",
    leaveHistory: [
      { id: 1, type: "Sick Leave", from: "2024-01-10", to: "2024-01-12", status: "Approved", days: 3 },
      { id: 2, type: "Casual Leave", from: "2024-01-05", to: "2024-01-06", status: "Approved", days: 2 },
      { id: 3, type: "Earned Leave", from: "2023-12-20", to: "2023-12-22", status: "Approved", days: 3 },
      { id: 4, type: "Sick Leave", from: "2023-12-05", to: "2023-12-06", status: "Approved", days: 2 }
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Leave Balance</h2>
          <p className="text-muted-foreground">View your leave summary and history</p>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/20 border-2 border-blue-200">
          <p className="text-sm font-medium text-blue-600 mb-2">Total Leaves</p>
          <p className="text-3xl font-bold text-blue-700">{leaveBalanceDetails.totalLeaves}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100/20 border-2 border-red-200">
          <p className="text-sm font-medium text-red-600 mb-2">Used Leaves</p>
          <p className="text-3xl font-bold text-red-700">{leaveBalanceDetails.usedLeaves}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100/20 border-2 border-green-200">
          <p className="text-sm font-medium text-green-600 mb-2">Remaining Leaves</p>
          <p className="text-3xl font-bold text-green-700">{leaveBalanceDetails.remainingLeaves}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Sick Leave</p>
            <Badge className="bg-blue-100 text-blue-700">Total: {leaveBalanceDetails.sickLeave}</Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Used:</span>
              <span className="font-semibold">{leaveBalanceDetails.sickLeaveUsed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining:</span>
              <span className="font-semibold text-green-600">{leaveBalanceDetails.sickLeaveRemaining}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(leaveBalanceDetails.sickLeaveUsed / leaveBalanceDetails.sickLeave) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Casual Leave</p>
            <Badge className="bg-purple-100 text-purple-700">Total: {leaveBalanceDetails.casualLeave}</Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Used:</span>
              <span className="font-semibold">{leaveBalanceDetails.casualLeaveUsed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining:</span>
              <span className="font-semibold text-green-600">{leaveBalanceDetails.casualLeaveRemaining}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(leaveBalanceDetails.casualLeaveUsed / leaveBalanceDetails.casualLeave) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Earned Leave</p>
            <Badge className="bg-green-100 text-green-700">Total: {leaveBalanceDetails.earnedLeave}</Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Used:</span>
              <span className="font-semibold">{leaveBalanceDetails.earnedLeaveUsed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining:</span>
              <span className="font-semibold text-green-600">{leaveBalanceDetails.earnedLeaveRemaining}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(leaveBalanceDetails.earnedLeaveUsed / leaveBalanceDetails.earnedLeave) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaveBalanceDetails.leaveHistory.map((leave) => (
              <div key={leave.id} className="p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{leave.type}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(leave.from).toLocaleDateString("en-IN")} - {new Date(leave.to).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-700 mb-1">{leave.status}</Badge>
                    <p className="text-sm font-semibold text-foreground">{leave.days} days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">Last Updated: {leaveBalanceDetails.lastUpdated}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Tasks Page Component
const TasksPage = ({ onBack }: { onBack: () => void }) => {
  const tasks = [
    { id: 1, title: "Complete Q4 Report", description: "Prepare and submit the quarterly financial report", status: "In Progress", priority: "High", dueDate: "2024-01-30", assignee: "John Doe" },
    { id: 2, title: "Team Meeting", description: "Weekly sync with development team", status: "Completed", priority: "Medium", dueDate: "2024-01-25", assignee: "Sarah Johnson" },
    { id: 3, title: "Client Presentation", description: "Prepare slides for client demo", status: "Pending", priority: "High", dueDate: "2024-01-28", assignee: "Michael Chen" },
    { id: 4, title: "Code Review", description: "Review pull requests for feature branch", status: "In Progress", priority: "Medium", dueDate: "2024-01-27", assignee: "Emily Davis" }
  ];

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in progress': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'in progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
          <p className="text-muted-foreground">Manage and track your tasks</p>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100/20 border-2 border-yellow-200 text-center">
          <p className="text-sm font-medium text-yellow-600">In Progress</p>
          <p className="text-2xl font-bold text-yellow-700">{tasks.filter(t => t.status === "In Progress").length}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100/20 border-2 border-green-200 text-center">
          <p className="text-sm font-medium text-green-600">Completed</p>
          <p className="text-2xl font-bold text-green-700">{tasks.filter(t => t.status === "Completed").length}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100/20 border-2 border-red-200 text-center">
          <p className="text-sm font-medium text-red-600">Pending</p>
          <p className="text-2xl font-bold text-red-700">{tasks.filter(t => t.status === "Pending").length}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <h4 className="font-semibold text-foreground">{task.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString("en-IN")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Assignee: {task.assignee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Attendance Page Component
const AttendancePage = ({ onBack }: { onBack: () => void }) => {
  const attendanceData = {
    present: 18,
    absent: 2,
    late: 1,
    holiday: 4,
    totalDays: 25,
    attendancePercentage: 90,
    currentMonth: "January 2024"
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Attendance</h2>
          <p className="text-muted-foreground">Track your monthly attendance</p>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100/20 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-600">Present</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{attendanceData.present} days</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100/20 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <X className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-600">Absent</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{attendanceData.absent} days</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100/20 border-2 border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon className="h-5 w-5 text-yellow-600" />
            <p className="text-sm font-medium text-yellow-600">Late</p>
          </div>
          <p className="text-3xl font-bold text-yellow-700">{attendanceData.late} days</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/20 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-600">Attendance %</p>
          </div>
          <p className="text-3xl font-bold text-blue-700">{attendanceData.attendancePercentage}%</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Summary - {attendanceData.currentMonth}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Working Days</span>
              <span className="font-semibold">{attendanceData.totalDays}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: `${attendanceData.attendancePercentage}%` }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Present Rate</p>
                <p className="text-xl font-bold text-green-600">{((attendanceData.present / attendanceData.totalDays) * 100).toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Absent Rate</p>
                <p className="text-xl font-bold text-red-600">{((attendanceData.absent / attendanceData.totalDays) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Personal Details Page Component
const PersonalDetailsPage = ({ onBack }: { onBack: () => void }) => {
  const { user } = useAuth();
  const personalDetails = {
    aadharNumber: "XXXX-XXXX-XXXX",
    panNumber: "ABCDE1234F",
    fatherName: "Rajesh Kumar",
    motherName: "Sunita Devi",
    maritalStatus: "Married",
    employeeId: user?.employeeId || "EMP001",
    fullName: user?.name || "John Doe",
    dateOfBirth: "1995-05-15",
    gender: "Male",
    email: user?.email || "john@example.com",
    phoneNumber: user?.phone || "+91 9876543210",
    address: "123, Green Valley Apartments, Sector 62, Noida, Uttar Pradesh - 201301",
    designation: "Software Engineer",
    department: user?.department || "Engineering",
    batch: "Batch 2022",
    batchYear: "2022",
    qualification: "B.Tech - Computer Science",
    registrationNumber: "REG2022001234",
    joiningDate: "10 March 2022",
    experience: "2.5 Years"
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Personal Details</h2>
          <p className="text-muted-foreground">View your personal and work information</p>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Employee ID</p>
              <p className="font-medium text-foreground">{personalDetails.employeeId}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Full Name</p>
              <p className="font-medium text-foreground">{personalDetails.fullName}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Date of Birth</p>
              <p className="font-medium text-foreground">{personalDetails.dateOfBirth}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Gender</p>
              <p className="font-medium text-foreground">{personalDetails.gender}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Email</p>
              <p className="font-medium text-foreground text-sm">{personalDetails.email}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Phone Number</p>
              <p className="font-medium text-foreground">{personalDetails.phoneNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            ID & Family Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Aadhar Number</p>
              <p className="font-medium text-foreground">{personalDetails.aadharNumber}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">PAN Number</p>
              <p className="font-medium text-foreground">{personalDetails.panNumber}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Father's Name</p>
              <p className="font-medium text-foreground">{personalDetails.fatherName}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Mother's Name</p>
              <p className="font-medium text-foreground">{personalDetails.motherName}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Marital Status</p>
              <p className="font-medium text-foreground">{personalDetails.maritalStatus}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30 sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground">Address</p>
              <p className="font-medium text-foreground text-sm">{personalDetails.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Designation</p>
              <p className="font-medium text-foreground">{personalDetails.designation}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Department</p>
              <p className="font-medium text-foreground">{personalDetails.department}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Batch</p>
              <p className="font-medium text-foreground">{personalDetails.batch}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Batch Year</p>
              <p className="font-medium text-foreground">{personalDetails.batchYear}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Qualification</p>
              <p className="font-medium text-foreground">{personalDetails.qualification}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Registration Number</p>
              <p className="font-medium text-foreground">{personalDetails.registrationNumber}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Joining Date</p>
              <p className="font-medium text-foreground">{personalDetails.joiningDate}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground">Experience</p>
              <p className="font-medium text-foreground">{personalDetails.experience}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Notifications Page Component
const NotificationsPage = ({ onBack }: { onBack: () => void }) => {
  const notifications = [
    { id: 1, title: "Team Meeting", message: "Weekly sync meeting at 3:00 PM today", time: "2 hours ago", type: "meeting", read: false },
    { id: 2, title: "Project Deadline", message: "Q4 Report submission deadline tomorrow", time: "1 day ago", type: "deadline", read: false },
    { id: 3, title: "Leave Approved", message: "Your leave request has been approved", time: "2 days ago", type: "leave", read: true },
    { id: 4, title: "New Task Assigned", message: "You have been assigned a new task", time: "3 days ago", type: "task", read: true }
  ];

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'deadline': return <AlertCircle className="h-4 w-4" />;
      case 'leave': return <CalendarCheck className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with latest notifications</p>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/20 border-2 border-blue-200 text-center">
          <p className="text-sm font-medium text-blue-600">Total Notifications</p>
          <p className="text-2xl font-bold text-blue-700">{notifications.length}</p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100/20 border-2 border-red-200 text-center">
          <p className="text-sm font-medium text-red-600">Unread</p>
          <p className="text-2xl font-bold text-red-700">{notifications.filter(n => !n.read).length}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border-2 transition-all ${
                !notification.read ? 'bg-blue-50 border-blue-200' : 'border-border hover:border-primary/50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    !notification.read ? 'bg-blue-200' : 'bg-muted'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-foreground">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    {!notification.read && <Badge className="mt-2 bg-blue-100 text-blue-700">New</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  if (!user) return null;

  const stats = [
    { label: "Employee ID", value: "EMP001", icon: <Hash className="h-6 w-6" />, color: "bg-accent/20 text-accent", bgColor: "bg-gradient-to-br from-accent/10 to-accent/5" },
    { label: "Designation", value: "Software Engineer", icon: <Briefcase className="h-6 w-6" />, color: "bg-primary/20 text-primary", bgColor: "bg-gradient-to-br from-primary/10 to-primary/5" },
    { label: "Joining Date", value: "10 March 2022", icon: <Calendar className="h-6 w-6" />, color: "bg-accent/20 text-accent", bgColor: "bg-gradient-to-br from-accent/10 to-accent/5" },
    { label: "Work Status", value: "Active", icon: <Activity className="h-6 w-6" />, color: "bg-green-100 text-green-700", bgColor: "bg-gradient-to-br from-green-50 to-green-100/20" },
    { label: "Performance", value: "94%", icon: <TrendingUp className="h-6 w-6" />, color: "bg-blue-100 text-blue-700", bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/20" },
    { label: "Projects", value: "8", icon: <Target className="h-6 w-6" />, color: "bg-purple-100 text-purple-700", bgColor: "bg-gradient-to-br from-purple-50 to-purple-100/20" }
  ];

  const statsRow1 = stats.slice(0, 3);
  const statsRow2 = stats.slice(3, 6);

  // Render different pages based on currentPage state
  if (currentPage === "leaveBalance") {
    return <LeaveBalancePage onBack={() => setCurrentPage("dashboard")} />;
  }
  if (currentPage === "tasks") {
    return <TasksPage onBack={() => setCurrentPage("dashboard")} />;
  }
  if (currentPage === "attendance") {
    return <AttendancePage onBack={() => setCurrentPage("dashboard")} />;
  }
  if (currentPage === "personal") {
    return <PersonalDetailsPage onBack={() => setCurrentPage("dashboard")} />;
  }
  if (currentPage === "notifications") {
    return <NotificationsPage onBack={() => setCurrentPage("dashboard")} />;
  }
  if (currentPage === "calendar") {
    return <JobCalendar onBack={() => setCurrentPage("dashboard")} />;
  }

  // Dashboard View
  return (
    <div className="space-y-6 animate-fade-in p-4 max-w-full">
      {/* Welcome Banner */}
      <div className="rounded-2xl gradient-chocolate p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card/20 backdrop-blur-sm">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-foreground">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-primary-foreground/70">{user.department} · Software Engineer</p>
          </div>
        </div>
      </div>

      {/* Stats Grid - Row 1 */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {statsRow1.map((stat) => (
          <Card key={stat.label} className={`${stat.bgColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 w-full`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Grid - Row 2 */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {statsRow2.map((stat) => (
          <Card key={stat.label} className={`${stat.bgColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 w-full`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 6 Grid Cards in 2 rows of 3 columns */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Leave Balance Card */}
        <Card className="glass-card overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setCurrentPage("leaveBalance")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold">Leave Balance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">days remaining</p>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card className="glass-card overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setCurrentPage("tasks")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold">Tasks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
            <p className="text-sm text-muted-foreground">active tasks</p>
          </CardContent>
        </Card>

        {/* Attendance Card */}
        <Card className="glass-card overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setCurrentPage("attendance")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold">Attendance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">90%</p>
            <p className="text-sm text-muted-foreground">this month</p>
          </CardContent>
        </Card>

        {/* Personal Details Card */}
        <Card className="glass-card overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setCurrentPage("personal")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <User className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold">Personal Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="glass-card overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setCurrentPage("notifications")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-700">
                <Bell className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold">Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">unread</p>
          </CardContent>
        </Card>

        {/* Job Calendar Card */}
        <Card className="glass-card overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setCurrentPage("calendar")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <CalendarDays className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold">Job Calendar</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">View Holidays & Events</p>
            <p className="text-sm text-muted-foreground">All 12 months</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;