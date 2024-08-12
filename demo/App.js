const m = require("mithril");
const Calendar = require('../src/Calendar');
const { events } = require('../src/assets/datas');
const EventManager = require('./EventManager');
const EventsView = require('./event/EventsView')

const App = {
    oninit: function (vnode) {
        vnode.state.eventManager = new EventManager(events);
    },

    view: function (vnode) {
        return m('.app', [
            m(EventsView, { eventManager: vnode.state.eventManager }),
            m(Calendar, { events: vnode.state.eventManager.getEvents() })
        ]);
    }
}

m.mount(document.body, {
    view: () => m(App)
});