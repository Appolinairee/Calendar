import m from "mithril";
import CalendarUtils from "../../../utils/MiniMonthUtils";
import MonthHeaderGrid from "../month/MonthHeaderGrid";

const YearView = {
    oninit: function (vnode) {
        vnode.attrs.date.getFullYear();
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
            const firstDayOfMonth = new Date(vnode.attrs.date.getFullYear(), month, 1);
            const startingDayOfWeek = firstDayOfMonth.getDay();
            const lastDayOfPreviousMonth = CalendarUtils.getDaysInMonth(vnode.attrs.date.getFullYear(), month - 1);

            const monthComponents = CalendarUtils.generateGridCells({
                weeks,
                days,
                firstDayOfMonth,
                startingDayOfWeek,
                lastDayOfPreviousMonth,
                currentYear: vnode.attrs.date.getFullYear(),
                currentMonth: month,
                events: this.events,
                calendar: this.calendar,
                setCalendarDate: this.setCalendarDate.bind(this)
            });

            yearComponents.push(m('', [
                m('h4', new Date(vnode.attrs.date.getFullYear(), month).toLocaleString('default', { month: 'long' })),
                m('.year-month-view', [
                    m(MonthHeaderGrid),
                    m('.year-month-grid', monthComponents)
                ])
            ]));
        }

        return m('.year-view .year-grid minimize-scrollbar', yearComponents);
    }
};

export default  YearView;