// FILE: src/pages/employee/EmployeeCalendar.tsx (Classic Professional Colors)

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Sparkles, Clock } from "lucide-react";
import BackButton from "@/components/BackButton";

interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: "Holiday" | "Event" | "Meeting" | "Birthday";
}

const EmployeeCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
    setEvents(stored);
    setLoading(false);
  }, []);

  const getTypeStyles = (type: CalendarEvent["type"]) => {
    const styles = {
      Holiday: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "🎉",
        badge: "bg-amber-100 text-amber-700",
      },
      Event: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "📅",
        badge: "bg-blue-100 text-blue-700",
      },
      Meeting: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "🤝",
        badge: "bg-purple-100 text-purple-700",
      },
      Birthday: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        icon: "🎂",
        badge: "bg-pink-100 text-pink-700",
      },
    };
    return styles[type] || styles.Event;
  };

  const getMonthOptions = () => {
    const months = new Set();
    events.forEach(event => {
      const month = new Date(event.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      months.add(month);
    });
    return Array.from(months) as string[];
  };

  const filteredEvents = selectedMonth === "all" 
    ? events 
    : events.filter(event => {
        const month = new Date(event.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        return month === selectedMonth;
      });

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const upcomingEvents = sortedEvents.filter(event => new Date(event.startDate) >= new Date());
  const pastEvents = sortedEvents.filter(event => new Date(event.startDate) < new Date());

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackButton />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-8 w-8" />
          <h2 className="text-2xl font-bold tracking-tight">Company Calendar</h2>
        </div>
        <p className="text-slate-300">
          Stay updated with holidays, events, meetings, and celebrations
        </p>
        {upcomingEvents.length > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <span className="text-sm">🎯</span>
            <span className="text-sm font-medium">{upcomingEvents.length} upcoming events</span>
          </div>
        )}
      </div>

      {/* Filter Section */}
      {getMonthOptions().length > 0 && (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-slate-700">Filter by month:</span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedMonth("all")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedMonth === "all"
                    ? "bg-slate-800 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {getMonthOptions().map(month => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedMonth === month
                      ? "bg-slate-800 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {sortedEvents.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg text-center py-16 border border-slate-200">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-slate-500 text-lg">No events available</p>
          <p className="text-sm text-slate-400 mt-1">Check back later for updates</p>
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-emerald-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-800">Upcoming Events</h3>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  {upcomingEvents.length}
                </span>
              </div>
              <div className="grid gap-4">
                {upcomingEvents.map((event) => {
                  const isSingle = event.startDate === event.endDate;
                  const styles = getTypeStyles(event.type);
                  const daysUntil = Math.ceil((new Date(event.startDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                  
                  return (
                    <div 
                      key={event.id} 
                      className={`${styles.bg} ${styles.border} border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{styles.icon}</span>
                            <div>
                              <p className="font-bold text-slate-800 text-lg">{event.title}</p>
                              <span className={`inline-block mt-1 ${styles.badge} text-xs px-2 py-0.5 rounded-full`}>
                                {event.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-3.5 w-3.5 text-slate-500" />
                            <span className="text-slate-600">
                              {isSingle
                                ? new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                                : `${new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} → ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                              }
                            </span>
                          </div>
                          {daysUntil > 0 && daysUntil <= 7 && (
                            <div className="inline-flex items-center gap-1 bg-amber-100 rounded-full px-2 py-0.5">
                              <span className="text-xs text-amber-700">⏰ {daysUntil} day{daysUntil !== 1 ? 's' : ''} to go</span>
                            </div>
                          )}
                        </div>
                        {!isSingle && (
                          <div className="bg-white rounded-lg px-3 py-1.5 text-center min-w-[100px] shadow-sm">
                            <p className="text-xs text-slate-500">Duration</p>
                            <p className="text-sm font-semibold text-slate-700">
                              {Math.ceil((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 3600 * 24)) + 1} days
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="space-y-3 mt-8">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-slate-400 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-600">Past Events</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {pastEvents.length}
                </span>
              </div>
              <div className="grid gap-3 opacity-75">
                {pastEvents.map((event) => {
                  const isSingle = event.startDate === event.endDate;
                  const styles = getTypeStyles(event.type);
                  
                  return (
                    <div 
                      key={event.id} 
                      className={`${styles.bg} ${styles.border} border rounded-xl p-4 shadow-sm`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{styles.icon}</span>
                          <div>
                            <p className="font-medium text-slate-700">{event.title}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(event.startDate).toLocaleDateString()}
                              {!isSingle && ` → ${new Date(event.endDate).toLocaleDateString()}`}
                            </p>
                          </div>
                        </div>
                        <span className={`${styles.badge} text-xs px-2 py-0.5 rounded-full opacity-70`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeCalendar;