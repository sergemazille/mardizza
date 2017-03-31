import './header';
import './home';
import { Notification } from './Notification';
import { Form } from './Form';

export function mardizzaInit() {
    Notification.init();
    Form.init();
}
