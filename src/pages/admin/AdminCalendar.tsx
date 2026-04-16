// FILE: src/pages/admin/AdminCalendar.tsx

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
import { Calendar as CalendarIcon, Trash2, Plus } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "Holiday" | "Event" | "Meeting" | "Birthday";
}

const AdminCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<CalendarEvent["type"]>("Holiday");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
    setEvents(stored);
  }, []);

  const handleAdd = () => {
    if (!title.trim() || !date) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      date,
      type,
    };

    const updated = [...events, newEvent];
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));

    setTitle("");
    setDate("");
  };

  const handleDelete = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
  };

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

  // Sort events by date (soonest first)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Calendar</h2>
        <p className="text-muted-foreground">
          Add or remove holidays, events, meetings, and birthdays.
        </p>
      </div>

      {/* Add Event Form */}
      <div className="card space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Plus className="h-5 w-5" /> Add New Event
        </h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <Input
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={type} onValueChange={(val: CalendarEvent["type"]) => setType(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Holiday">Holiday</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="Meeting">Meeting</SelectItem>
                <SelectItem value="Birthday">Birthday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          Add Event
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" /> All Events ({sortedEvents.length})
        </h3>
        {sortedEvents.length === 0 ? (
          <div className="card text-center py-8 text-muted-foreground">
            No events added yet. Add your first event above.
          </div>
        ) : (
          <div className="grid gap-3">
            {sortedEvents.map((event) => (
              <div key={event.id} className="card flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-medium">{event.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className={`${getTypeBadge(event.type)} inline-block`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCalendar;