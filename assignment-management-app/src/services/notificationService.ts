import { Notification } from '../components/Notification';

class NotificationService {
    private notifications: string[] = [];

    addNotification(message: string) {
        this.notifications.push(message);
        this.displayNotification(message);
    }

    displayNotification(message: string) {
        // Logic to display notification to the user
        // This could involve updating state in a React component
        console.log("Notification: ", message);
    }

    getNotifications() {
        return this.notifications;
    }

    clearNotifications() {
        this.notifications = [];
    }
}

const notificationService = new NotificationService();
export default notificationService;