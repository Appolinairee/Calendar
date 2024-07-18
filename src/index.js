const m = require("mithril");
const CalendarView = require("./CalendarView");
const TopBar = require('./components/TopBar');

m.mount(document.body, {
    view: () => m(TopBar)
});