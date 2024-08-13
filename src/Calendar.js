const m = require("mithril");
const CalendarView = require("./CalendarView");
const TopBar = require("./components/topbar/TopBar");
const SideBar = require("./components/sidebar/SideBar");

const CalendarApp = {
    oninit: function (vnode) {
        const initialDate = new Date();
        this.calendar = new Calendar({
            date: initialDate,
            events: vnode.attrs.events,
            mode: 'day',
            attributeNames: vnode.attrs.attributeNames
        });
    },

    onupdate: function (vnode) {
        if (vnode.attrs.events !== this.calendar.events || vnode.attrs.attributeNames !== this.calendar.attributeNames) {
            this.calendar = new Calendar({
                date: this.calendar.date,
                events: vnode.attrs.events,
                mode: this.calendar.currentMode,
                attributeNames: vnode.attrs.attributeNames
            });
        }
    },

    view: function (vnode) {
        return m('.all-calendar', [
            m(SideBar, {
                calendar: this.calendar
            }),
            m('.app', [
                m(TopBar, {
                    calendar: this.calendar
                }),
                m(CalendarView, {
                    calendar: this.calendar
                })
            ])
        ]);
    }
}

module.exports = CalendarApp;