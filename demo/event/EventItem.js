const m = require("mithril");
const EventForm = require('./EventForm');

const EventItem = {
    oninit: function (vnode) {
        vnode.state.isEditing = false;
    },
    view: function (vnode) {
        const { event, eventManager } = vnode.attrs;
        return m('div.event-item', [
            vnode.state.isEditing
                ? m(EventForm, {
                    event,
                    onSubmit: updatedEvent => {
                        eventManager.updateEvent(event.id, updatedEvent);
                        vnode.state.isEditing = false;
                    }
                })
                : [
                    m('p', event.title),
                    m('p', formatDate(event.startDate)),
                    m('div.buttons flex', [
                        m('button', {
                            onclick: () => vnode.state.isEditing = true
                        }, [m('i.fa-solid fa-pen')]),
                        m('button', {
                            onclick: () => eventManager.deleteEvent(event.id)
                        }, [m('i.fa-solid fa-trash')])])
                ]
        ]);
    }
};
{/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */ }
module.exports = EventItem;