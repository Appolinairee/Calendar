const m = require("mithril");
const AddEvent = require('./AddEvent');

const EventsView = {
    view: function (vnode) {
        return m('div.events-view flex', m(AddEvent, { eventManager: vnode.attrs.eventManager }),
        );
    }
};

module.exports = EventsView;