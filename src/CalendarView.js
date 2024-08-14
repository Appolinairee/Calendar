const m = require("mithril");
const DayView = require("./components/day/DayView");
const MonthView = require("./components/month/MonthView");
const WeekView = require("./components/week/WeekView");
const YearView = require("./components/year/YearView");

const CalendarView = {
    view: function (vnode) {
        const { currentMode, date } = vnode.attrs.calendar;

        switch (currentMode) {
            case 'day':
                return m(DayView, { date, events: vnode.attrs.events });
            case 'month':
                return m(MonthView, { date, events: vnode.attrs.events });
            case 'year':
                return m(YearView, { date, events: vnode.attrs.events, calendar: vnode.attrs.calendar });
            case 'week':
                return m(WeekView, { date, events: vnode.attrs.events });
            default:
                return m(DayView, { date, events: vnode.attrs.events });
        }
    }
};

module.exports = CalendarView;