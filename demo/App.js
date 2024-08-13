const m = require("mithril");
const Calendar = require('../src/Calendar');
const { events } = require('../src/assets/datas');
const EventManager = require('./EventManager');
const EventsView = require('./event/EventsView');
const CalendarApp = require("../src/Calendar");

const App = {
    oninit: function (vnode) {
        const attributeNames = {
            title: 'hello',
            startDate: 'start',
            endDate: 'end'
        };
        vnode.state.eventManager = new EventManager(events);
        vnode.state.calendarAttributes = attributeNames;
    },

    view: function (vnode) {
        return m('.app', [
            m(EventsView, { eventManager: vnode.state.eventManager }),
            m(CalendarApp, { 
                events: vnode.state.eventManager.getEvents(),
                attributeNames: vnode.state.calendarAttributes
            })
        ]);
    }
}

m.mount(document.body, {
    view: () => m(App)
});