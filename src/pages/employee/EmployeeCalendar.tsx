// FILE: src/pages/employee/EmployeeCalendar.tsx

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "Holiday" | "Event" | "Meeting" | "Birthday";
}

const EmployeeCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
    setEvents(stored);
    setLoading(false);
  }, []);

  // Helper to get type badge styles
  const getTypeBadge = (type: CalendarEvent["type"]) => {
    const classes = {
      Holiday: "event-holiday",
      Event: "event-event",
      Meeting: "event-meeting",
      Birthday: "event-birthday",
    };
    return classes[type];
  };

  // Group events by month
  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(event);
    return groups;
  }, {} as Record<string, CalendarEvent[]>);

  // Sort events within each group by date
  Object.keys(groupedEvents).forEach(month => {
    groupedEvents[month].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  // Sort months chronologically
  const sortedMonths = Object.keys(groupedEvents).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  if (loading) {
    return <div className="flex justify-center py-12">Loading calendar...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Company Calendar</h2>
        <p className="text-muted-foreground">
          View all holidays, events, meetings, and birthdays.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="card text-center py-12">
          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No events available at this time.</p>
          <p className="text-sm text-muted-foreground">Check back later for updates.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedMonths.map((month) => (
            <div key={month} className="space-y-3">
              <h3 className="text-xl font-semibold sticky top-16 bg-background/80 backdrop-blur-sm py-2 z-10">
                {month}
              </h3>
              <div className="grid gap-3">
                {groupedEvents[month].map((event) => (
                  <div key={event.id} className="card flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-medium">{event.title}</p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className={`${getTypeBadge(event.type)} inline-block`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeCalendar;