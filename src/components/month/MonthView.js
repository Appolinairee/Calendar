import m from "mithril";
import MonthGrid from "./MonthGrid";
import MonthHeaderGrid from "./MonthHeaderGrid";
import Month from "../../classes/Month";
import CalendarUtils from "../../../utils/MiniMonthUtils";
import MobileListMode from "./MobileListMode";

const MonthView = {
  oninit: function (vnode) {
    const { date, events } = vnode.attrs;
    this.month = new Month();
    this.month.update({ date, events });
    this.isMobile = window.matchMedia("(max-width: 768px)").matches;
    this.events = events;
    this.calendar = vnode.attrs.calendar;
  },

  onbeforeupdate: function (vnode) {
    const { date, events } = vnode.attrs;
    if (date !== this.date || events !== this.events) {
      this.month.update({ date, events });
      return true;
    }
    return false;
  },

  setCalendarDate: function (date) {
    this.calendar.setCurrentDate(date);
    const targetMode = this.isMobile ? "month" : "day";
    this.calendar.switchMode(targetMode);
  },

  view: function (vnode) {
    const { date, events } = vnode.attrs;
    const weeks = 6;
    const days = 7;

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const lastDayOfPreviousMonth = CalendarUtils.getDaysInMonth(
      date.getFullYear(),
      date.getMonth() - 1
    );

    const mobileMonthGrid = CalendarUtils.generateGridCells({
      weeks,
      days,
      firstDayOfMonth,
      startingDayOfWeek,
      lastDayOfPreviousMonth,
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      events: this.events,
      calendar: this.calendar,
      setCalendarDate: this.setCalendarDate.bind(this),
    });

    return this.isMobile
      ? m("div", [
          m(".sidebar-month-view", { style: "margin-top: 20px;" }, [
            m(MonthHeaderGrid),
            m(".sidebar-month-grid", mobileMonthGrid),
          ]),
          m(MobileListMode, { calendar: vnode.attrs.calendar }),
        ])
      : m(".month", [
          m(MonthHeaderGrid),
          m(MonthGrid, { date, month: this.month }),
        ]);
  },
};

export default MonthView;
