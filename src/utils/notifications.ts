// FILE: src/utils/notifications.ts (Updated with role-based filtering)

export interface Notification {
  id: string;
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
  target: "ADMIN" | "EMPLOYEE"; // 🔥 NEW - Role-based targeting
}

// Helper function to save notifications
const saveNotifications = (notifications: Notification[]) => {
  localStorage.setItem("notifications", JSON.stringify(notifications));
};

export const addNotification = (notification: Omit<Notification, 'createdAt' | 'read'>) => {
  const existing = getNotifications();
  
  const newNotification: Notification = {
    ...notification,
    read: false,
    createdAt: new Date().toISOString()
  };

  saveNotifications([newNotification, ...existing]);
  
  // Dispatch custom event to update navbar in real-time
  window.dispatchEvent(new Event('notifications-updated'));
};

export const getNotifications = (): Notification[] => {
  const all = JSON.parse(localStorage.getItem("notifications") || "[]");
  
  // Get current user role
  const user = JSON.parse(localStorage.getItem("hr_user") || "{}");
  const userRole = user.role;
  
  // Filter notifications based on user role
  if (userRole === "ADMIN") {
    return all.filter((n: Notification) => n.target === "ADMIN");
  } else if (userRole === "EMPLOYEE") {
    return all.filter((n: Notification) => n.target === "EMPLOYEE");
  }
  
  return [];
};

export const markAsRead = (id: string) => {
  const existing = JSON.parse(localStorage.getItem("notifications") || "[]");
  
  // REMOVE notification instead of marking read
  const updated = existing.filter((n: Notification) => n.id !== id);
  
  saveNotifications(updated);
  
  window.dispatchEvent(new Event("notifications-updated"));
};

export const markAllAsRead = () => {
  // CLEAR all notifications
  saveNotifications([]);
  
  window.dispatchEvent(new Event("notifications-updated"));
};

export const deleteNotification = (id: string): void => {
  const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
  const updated = notifications.filter((n: Notification) => n.id !== id);
  saveNotifications(updated);
  window.dispatchEvent(new Event('notifications-updated'));
};