const m = require("mithril");
const ToggleButton = require("./ToggleButton");
const EventForm = require("./EventForm");

const AddEvent = {
    oninit: function (vnode) {
        vnode.state.showForm = false;
    },

    view: function (vnode) {
        return m('div.add-event', [
            m(ToggleButton, {
                showForm: vnode.state.showForm,
                onToggle: () => vnode.state.showForm = !vnode.state.showForm
            }),

            vnode.state.showForm && m(EventForm, {
                onSubmit: (newEvent) => {
                    vnode.attrs.eventManager.addEvent(
                        newEvent.title,
                        newEvent.startDate,
                        newEvent.endDate
                    );
                    vnode.state.showForm = false;
                },
                onClose: () => {
                    vnode.state.showForm = false;
                },
                submitLabel: 'Ajouter'
            })
        ]);
    }
};

module.exports = AddEvent;