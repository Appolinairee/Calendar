import m from "mithril";
import MonthHeaderGrid from "../month/MonthHeaderGrid";
import SideBarMonthNavigation from "./SideBarMonthNavigation";
import CalendarUtils from "../../../utils/MiniMonthUtils";

const SideBarMonthGrid = {
    oninit: function (vnode) {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.currentDay = this.date.getDate();
        this.events = vnode.attrs.calendar.events;
        this.calendar = vnode.attrs.calendar;
    },

    updateDate: function (offset) {
        this.currentMonth += offset;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.date = new Date(this.currentYear, this.currentMonth, this.currentDay);
    },

    setCalendarDate: function(date){
        this.calendar.setCurrentDate(date);
    },

    view: function (vnode) {
        const weeks = 6;
        const days = 7;

        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
        const startingDayOfWeek = firstDayOfMonth.getDay();
        const lastDayOfPreviousMonth = CalendarUtils.getDaysInMonth(this.currentYear, this.currentMonth - 1);

        const components = CalendarUtils.generateGridCells({
            weeks,
            days,
            firstDayOfMonth,
            startingDayOfWeek,
            lastDayOfPreviousMonth,
            currentYear: this.currentYear,
            currentMonth: this.currentMonth,
            events: this.events,
            calendar: this.calendar,
            setCalendarDate: this.setCalendarDate.bind(this)
        });

        return m('.sidebar-month-view', [
            m(SideBarMonthNavigation, { date: this.date, updateDate: this.updateDate.bind(this) }),
            m(MonthHeaderGrid),
            m('.sidebar-month-grid', components)
        ]);
    }
};

export default  SideBarMonthGrid;