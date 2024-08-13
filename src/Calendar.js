const m = require("mithril");
const CalendarView = require("./CalendarView");
const TopBar = require("./components/topbar/TopBar");
const SideBar = require("./components/sidebar/SideBar");

const CalendarApp = {
    oninit: function (vnode) {
        const initialDate = new Date();
        vnode.state.calendar = new Calendar({ date: initialDate, events: vnode.attrs.events, mode: 'day' });
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
                    calendar: vnode.state.calendar
                })
            ])
        ]);
    }
}

module.exports = CalendarApp;