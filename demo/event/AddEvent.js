const m = require("mithril");
const ToggleButton = require("./ToggleButton");
const EventForm = require("./EventForm");

const AddEvent = {
    oninit: function (vnode) {
        vnode.state.showForm = false;
        vnode.state.newEvent = {
            title: '',
            startDate: '',
            endDate: ''
        };
    },

    view: function (vnode) {
        return m('div.add-event', [
            m(ToggleButton, {
                showForm: vnode.state.showForm,
                onToggle: () => vnode.state.showForm = !vnode.state.showForm
            }),

            vnode.state.showForm && m(EventForm, {
                event: vnode.state.newEvent,
                onFieldChange: (field, value) => {
                    vnode.state.newEvent[field] = value;
                },
                onSubmit: () => {
                    vnode.attrs.eventManager.addEvent(
                        vnode.state.newEvent.title,
                        vnode.state.newEvent.startDate,
                        vnode.state.newEvent.endDate
                    );

                    vnode.state.newEvent = { title: '', startDate: '', endDate: '' };
                    vnode.state.showForm = false;
                },
                submitLabel: 'Ajouter'
            })
        ]);
    }
};

module.exports = AddEvent;