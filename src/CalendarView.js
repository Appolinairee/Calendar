const m = require("mithril");
const DayView = require("./components/day/DayView");
const MonthView = require("./components/month/MonthView");
const WeekView = require("./components/week/WeekView");
const YearView = require("./components/year/YearView");

const CalendarView = {

    view: function (vnode) {
        const { currentMode, date, events } = vnode.attrs.calendar;

        switch (currentMode) {
            case 'day':
                return m(DayView, { date, events });
            case 'month':
                return m(MonthView, { date, events });
            case 'year':
                return m(YearView, { date, events });
            case 'week':
                return m(WeekView, { date, events });
            default:
                return m(DayView, { date, events });
        }
    }
};

module.exports = CalendarView;
