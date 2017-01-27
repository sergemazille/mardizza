import { Form } from './Form';
import { Pagination } from './Pagination';
import { Notification } from './Notification';
import { Tab } from './Tab';
import { Dialog } from './Dialog';
import { Filter } from './Filter';
import { ViewPort } from './ViewPort';

export function uiInit() {
    ViewPort.init();
    Form.init();
    Pagination.init();
    Notification.init();
    Tab.init();
    Dialog.init();
    Filter.init();

    // methods to reload on page resize
    window.onresize = function() {
        Pagination.init();
    };
}