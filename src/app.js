const m = require("mithril");
const CalendarView = require("./CalendarView");
const { events } = require('./assets/datas');
const TopBar = require("./components/topbar/TopBar");
const SideBar = require("./components/sidebar/SideBar");
const EventList = require("./components/events/Events");

const App = {
    oninit: function (vnode) {
        const initialDate = new Date();
        vnode.state.calendar = new Calendar({ date: initialDate, events: events, mode: 'month' });
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
                    calendar: vnode.state.calendar
                })
            ]),
            // m(EventList)
        ]);
    }
}

m.mount(document.body, {
    view: () => m(App)
});