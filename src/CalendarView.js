const m = require("mithril");
const DayView = require("./components/day/DayView");
const MonthView = require("./components/month/MonthView");

const CalendarView = {

    view: function (vnode) {
        const { currentMode, date, events } = vnode.attrs.calendar;

        switch (currentMode) {
            case 'day':
                return m(DayView, { date, events });
            case 'month':
                return m(MonthView, { date, events });
            default:
                return m(DayView, { date, events });
        }
    }
};

module.exports = CalendarView;
