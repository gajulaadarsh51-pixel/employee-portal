// FILE: src/pages/admin/AdminCalendar.tsx (Fixed with Classic Professional Colors)

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Trash2, Plus, Sparkles, Clock } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addNotification } from "@/utils/notifications";
import BackButton from "@/components/BackButton";

interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: "Holiday" | "Event" | "Meeting" | "Birthday";
}

const AdminCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [title, setTitle] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [type, setType] = useState<CalendarEvent["type"]>("Holiday");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
    setEvents(stored);
  }, []);

  const handleAdd = () => {
    if (!title.trim() || selectedDates.length === 0) return;

    const sortedDates = [...selectedDates].sort(
      (a, b) => a.getTime() - b.getTime()
    );

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      startDate: sortedDates[0].toISOString(),
      endDate: sortedDates[sortedDates.length - 1].toISOString(),
      type,
    };

    const updated = [...events, newEvent];
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));

    addNotification({
      id: Date.now().toString() + "_notif",
      title: "New Calendar Update",
      message: `${title} added (${type})`,
      link: "/employee/calendar",
      read: false,
    });

    setTitle("");
    setSelectedDates([]);
  };

  const handleDelete = (id: string, eventTitle: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));

    addNotification({
      id: Date.now().toString() + "_notif",
      title: "Calendar Updated",
      message: `${eventTitle} was removed from calendar`,
      link: "/employee/calendar",
      read: false,
    });
  };

  const getTypeStyles = (type: CalendarEvent["type"]) => {
    const styles = {
      Holiday: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "🎉",
        text: "text-amber-700",
        badge: "bg-amber-100 text-amber-700",
        hover: "hover:bg-amber-100",
      },
      Event: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "📅",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
        hover: "hover:bg-blue-100",
      },
      Meeting: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "🤝",
        text: "text-purple-700",
        badge: "bg-purple-100 text-purple-700",
        hover: "hover:bg-purple-100",
      },
      Birthday: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        icon: "🎂",
        text: "text-pink-700",
        badge: "bg-pink-100 text-pink-700",
        hover: "hover:bg-pink-100",
      },
    };
    return styles[type] || styles.Event;
  };

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold tracking-tight">Manage Calendar</h2>
        <p className="text-slate-300 mt-1">
          Create and manage holidays, events, meetings, and birthdays
        </p>
      </div>

      {/* Add Event Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
            <Sparkles className="h-5 w-5 text-slate-600" />
            Create New Event
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid gap-4">
            <Input
              placeholder="Event title (e.g., Diwali, Team Meeting)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-base py-6"
            />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Select value={type} onValueChange={(val: CalendarEvent["type"]) => setType(val)}>
                  <SelectTrigger className="border-slate-200 focus:border-slate-400">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Holiday">🎉 Holiday</SelectItem>
                    <SelectItem value="Event">📅 Event</SelectItem>
                    <SelectItem value="Meeting">🤝 Meeting</SelectItem>
                    <SelectItem value="Birthday">🎂 Birthday</SelectItem>
                    <SelectItem value="Festival">🙏 Festival</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Select Date Range
              </label>
              <div className="border-2 border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-colors">
                <DayPicker
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => setSelectedDates(dates || [])}
                  className="mx-auto"
                />
              </div>
              {selectedDates.length > 0 && (
                <div className="bg-slate-100 rounded-lg p-3 mt-2">
                  <p className="text-sm text-slate-700">
                    ✓ {selectedDates.length} date{selectedDates.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedDates.map(d => d.toLocaleDateString()).join(" • ")}
                  </p>
                  {selectedDates.length > 1 && (
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      Range: {new Date(Math.min(...selectedDates.map(d => d.getTime()))).toLocaleDateString()} → {new Date(Math.max(...selectedDates.map(d => d.getTime()))).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <Button 
            onClick={handleAdd} 
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-6 text-base shadow-md hover:shadow-lg transition-all"
            disabled={!title.trim() || selectedDates.length === 0}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Event ({selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''})
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
            <CalendarIcon className="h-5 w-5 text-slate-600" />
            All Events ({sortedEvents.length})
          </h3>
        </div>
        
        {sortedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg text-center py-16 border border-slate-200">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-500">No events added yet</p>
            <p className="text-sm text-slate-400">Create your first event above</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedEvents.map((event) => {
              const isSingle = event.startDate === event.endDate;
              const styles = getTypeStyles(event.type);
              return (
                <div 
                  key={event.id} 
                  className={`${styles.bg} ${styles.border} border rounded-xl p-4 shadow-sm ${styles.hover} transition-all duration-200`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{styles.icon}</span>
                        <p className="font-semibold text-slate-800 text-lg">{event.title}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                        <span className="text-slate-600">
                          {isSingle
                            ? new Date(event.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                            : `${new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} → ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                          }
                        </span>
                      </div>
                      {!isSingle && (
                        <div className="inline-flex items-center gap-1 bg-white rounded-full px-2 py-1">
                          <span className="text-xs text-slate-500">📅 Full range:</span>
                          <span className="text-xs font-medium text-slate-600">
                            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`${styles.badge} px-3 py-1 rounded-full text-xs font-medium shadow-sm`}>
                        {event.type}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(event.id, event.title)}
                        className="hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCalendar;