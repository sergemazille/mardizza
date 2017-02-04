import { uiInit } from './ui/uiBootstrap';
import { mardizzaInit } from './mardizza/mardizzaBootstrap';

window.onload = function() {

    // load ui scripts
    uiInit();

    // load custom scripts
    mardizzaInit();
};