const m = require("mithril");

const EventForm = {
    oninit: function (vnode) {
        vnode.state.event = {
            title: '',
            startDate: '',
            endDate: ''
        };
        vnode.state.errors = {
            title: '',
            startDate: '',
            endDate: ''
        };
    },

    validate: function (vnode) {
        const errors = {};

        if (!vnode.state.event.title.trim()) {
            errors.title = 'Le titre est requis.';
        }

        if (!vnode.state.event.startDate) {
            errors.startDate = 'La date de début est requise.';
        }

         if (vnode.state.event.startDate && vnode.state.event.endDate && vnode.state.event.endDate < vnode.state.event.startDate) {
            errors.endDate = 'La date de fin doit être après la date de début.';
        }

        vnode.state.errors = errors;
        return Object.keys(errors).length === 0;
    },

    view: function (vnode) {
        const { onSubmit, onClose, submitLabel } = vnode.attrs;

        return m('div.event-form-container', [
            m('div.event-form-overlay', {
                onclick: (e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }
            }, [
                m('div.event-form', {
                    onclick: (e) => e.stopPropagation()
                }, [
                    m('div.field', [
                        m('input[type=text][placeholder="Titre de l\'événement"]', {
                            value: vnode.state.event.title,
                            oninput: e => {
                                vnode.state.event.title = e.target.value;
                                vnode.state.errors.title = '';
                            }
                        }),
                        vnode.state.errors.title && m('div.error', vnode.state.errors.title)
                    ]),
                    m('div.field', [
                        m('input[type=datetime-local][placeholder="Date de début"]', {
                            value: vnode.state.event.startDate,
                            oninput: e => {
                                vnode.state.event.startDate = e.target.value;
                                vnode.state.errors.startDate = '';
                                vnode.state.errors.endDate = ''; 
                            }
                        }),
                        vnode.state.errors.startDate && m('div.error', vnode.state.errors.startDate)
                    ]),
                    m('div.field', [
                        m('input[type=datetime-local][placeholder="Date de fin"]', {
                            value: vnode.state.event.endDate,
                            oninput: e => {
                                vnode.state.event.endDate = e.target.value;
                                vnode.state.errors.endDate = '';
                            }
                        }),
                        vnode.state.errors.endDate && m('div.error', vnode.state.errors.endDate)
                    ]),
                    m('button', {
                        onclick: () => {
                            if (EventForm.validate(vnode)) {
                                onSubmit(vnode.state.event);
                            }
                        }
                    }, submitLabel || 'Ajouter')
                ])
            ])
        ]);
    }
};

module.exports = EventForm;