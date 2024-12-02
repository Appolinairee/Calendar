import m from "mithril";
import AddEvent from './AddEvent';

const EventsView = {
    view: function (vnode) {
        return m('div.events-view flex', [
            // m(AddEvent, { eventManager: vnode.attrs.eventManager })
        ]);
    }
};

export default  EventsView;
