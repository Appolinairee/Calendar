import m from "mithril";
import DayView from "./components/day/DayView";
import MonthView from "./components/month/MonthView";
import WeekView from "./components/week/WeekView";
import YearView from "./components/year/YearView";
import MobileListMode from "./components/month/MobileListMode";

const CalendarView = {
    view: function (vnode) {
        const { currentMode, date } = vnode.attrs.calendar;

        console.log(vnode.attrs.calendar?._isMobileListMode)

        switch (currentMode) {
            case 'day':
                return m(DayView, { date, events: vnode.attrs.events });
            case 'month':
                return m('div', [
                    m(MonthView, { date, events: vnode.attrs.events }),
                    vnode.attrs.calendar._isMobileListMode && m(MobileListMode, { calendar: vnode.attrs.calendar })
                ])
            case 'year':
                return m(YearView, { date, events: vnode.attrs.events, calendar: vnode.attrs.calendar });
            case 'week':
                return m(WeekView, { date, events: vnode.attrs.events });
            default:
                return m(DayView, { date, events: vnode.attrs.events });
        }
    }
};

export default CalendarView;