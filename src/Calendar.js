const m = require("mithril");
const CalendarView = require("./CalendarView");
const TopBar = require("./components/topbar/TopBar");
const SideBar = require("./components/sidebar/SideBar");

require("./styles/index.css");
require("./styles/topBar.css");

require("./styles/topBar.css");
require("./styles/sidebar.css");

require("./styles/day/day.css");
require("./styles/day/grid.css");
require("./styles/day/event.css");

require("./styles/month/month.css");
require("./styles/month/monthGrid.css");
require("./styles/month/month-event.css");

require("./styles/year/year.css");
require("./styles/week/week.css");

const Calendar = require("./classes/Calendar");
require("../utils/date.utils");

const CalendarApp = {
    oninit: function (vnode) {
        const initialDate = new Date();
        vnode.state.calendar = new Calendar({
            date: initialDate,
            events: vnode.attrs.events,
            mode: 'month',
            attributeNames: vnode.attrs.attributeNames
        });
    },

    view: function (vnode) {
        return m('.all-calendar', [
            m(SideBar, {
                calendar: vnode.state.calendar
            }),
            m('.app', [
                m(TopBar, {
                    calendar: vnode.state.calendar
                }),
                m(CalendarView, {
                    calendar: vnode.state.calendar, events: vnode.attrs.events
                })
            ])
        ]);
    }
}

module.exports = CalendarApp;