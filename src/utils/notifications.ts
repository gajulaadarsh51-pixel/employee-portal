// FILE: src/utils/notifications.ts (Updated with remove logic)

export interface Notification {
  id: string;
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
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
  return JSON.parse(localStorage.getItem("notifications") || "[]");
};

export const markAsRead = (id: string) => {
  const existing = getNotifications();
  
  // REMOVE notification instead of marking read
  const updated = existing.filter((n) => n.id !== id);
  
  saveNotifications(updated);
  
  window.dispatchEvent(new Event("notifications-updated"));
};

export const markAllAsRead = () => {
  // CLEAR all notifications
  saveNotifications([]);
  
  window.dispatchEvent(new Event("notifications-updated"));
};

export const deleteNotification = (id: string): void => {
  const notifications = getNotifications();
  const updated = notifications.filter(n => n.id !== id);
  saveNotifications(updated);
  window.dispatchEvent(new Event('notifications-updated'));
};