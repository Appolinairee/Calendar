const m = require("mithril");
const { events } = require('../src/assets/datas');
const EventManager = require('./EventManager');
const EventsView = require('./event/EventsView');
const CalendarApp = require("../src/Calendar");

let eventManager = new EventManager(events);

const App = {
    oninit: function (vnode) {
        const attributeNames = {
            title: 'title',
            startDate: 'startDate',
            endDate: 'endDate'
        };
        vnode.state.calendarAttributes = attributeNames;
    },

    view: function (vnode) {
        return m('.app', [
            m(EventsView, { eventManager }),
            m(CalendarApp, {
                events: eventManager.getEvents(),
                attributeNames: vnode.state.calendarAttributes
            })
        ]);
    }
}

m.mount(document.body, {
    view: () => m(App)
});