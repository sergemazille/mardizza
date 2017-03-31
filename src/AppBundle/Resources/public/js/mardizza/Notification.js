import { Notification as uiNotification } from "../ui/Notification";

function displayNotifications() {
    let $notifications = $('.session-notification');
    $notifications.each(function() {
        let message = $(this).data('message');
        let type = $(this).data('type');

        uiNotification.create(message, type);
    });
}

export class Notification {
    static init() {
        displayNotifications();
    }
}
