import m from "mithril";
import CalendarView from "./CalendarView";
import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";

import "./styles/index.css";
import "./styles/topBar.css";

import "./styles/topBar.css";
import "./styles/sidebar.css";

import "./styles/day/day.css";
import "./styles/day/grid.css";
import "./styles/day/event.css";

import "./styles/month/month.css";
import "./styles/month/monthGrid.css";
import "./styles/month/month-event.css";

import "./styles/year/year.css";
import "./styles/week/week.css";

import Calendar from "./classes/Calendar";
import "../utils/date.utils";

const CalendarApp = {
    oninit: function (vnode) {
        const initialDate = new Date();
        vnode.state.calendar = new Calendar({
            date: initialDate,
            events: vnode.attrs.events,
            mode: 'month',
            attributeNames: vnode.attrs.attributeNames
        });
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
                    calendar: vnode.state.calendar, events: vnode.attrs.events
                })
            ])
        ]);
    }
}

export default CalendarApp;