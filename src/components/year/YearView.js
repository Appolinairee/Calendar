const m = require("mithril");
const CalendarUtils = require("../../../utils/MiniMonthUtils");
const MonthHeaderGrid = require("../month/MonthHeaderGrid");

const YearView = {
    oninit: function (vnode) {
        this.date = new Date();
        this.currentYear = this.date.getFullYear();
        this.events = vnode.attrs.events;
        this.calendar = vnode.attrs.calendar;
    },

    setCalendarDate: function (date) {
        this.calendar.setCurrentDate(date);
        this.calendar.switchMode('day');
    },

    view: function (vnode) {
        const months = 12;
        const weeks = 6;
        const days = 7;
        const yearComponents = [];

        for (let month = 0; month < months; month++) {
            const firstDayOfMonth = new Date(this.currentYear, month, 1);
            const startingDayOfWeek = firstDayOfMonth.getDay();
            const lastDayOfPreviousMonth = CalendarUtils.getDaysInMonth(this.currentYear, month - 1);

            const monthComponents = CalendarUtils.generateGridCells({
                weeks,
                days,
                firstDayOfMonth,
                startingDayOfWeek,
                lastDayOfPreviousMonth,
                currentYear: this.currentYear,
                currentMonth: month,
                events: this.events,
                calendar: this.calendar,
                setCalendarDate: this.setCalendarDate.bind(this)
            });

            yearComponents.push(m('', [
                m('h4', new Date(this.currentYear, month).toLocaleString('default', { month: 'long' })),
                m('.year-month-view', [
                    m(MonthHeaderGrid),
                    m('.year-month-grid', monthComponents)
                ])
            ]));
        }

        return m('.year-view .year-grid minimize-scrollbar', yearComponents);
    }
};

module.exports = YearView;