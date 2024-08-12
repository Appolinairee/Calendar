const m = require("mithril");
const AddEvent = require('./AddEvent');
const EventItem = require('./EventItem')

const EventList = {
    view: function (vnode) {
        return m('div.event-list flex minimize-scrollbar',
            vnode.attrs.eventManager.getEvents().map(event =>
                m(EventItem, { event, eventManager: vnode.attrs.eventManager })
            )
        );
    }
};

const EventsView = {
    view: function (vnode) {
        return m('div.events-view flex', [
            m(AddEvent, { eventManager: vnode.attrs.eventManager }),
            m(EventList, { eventManager: vnode.attrs.eventManager })
        ]);
    }
};

module.exports = EventsView;