const m = require("mithril");

const EventForm = {
    view: function (vnode) {
        const { event, onFieldChange, onSubmit, submitLabel } = vnode.attrs;

        return m('div.event-form-container', [
            m('div.event-form-overlay', [
                m('div.event-form', [
                    m('input[type=text][placeholder="Titre de l\'événement"]', {
                        value: event.title,
                        oninput: e => onFieldChange('title', e.target.value)
                    }),
                    m('input[type=datetime-local][placeholder="Date de début"]', {
                        value: event.startDate,
                        oninput: e => onFieldChange('startDate', e.target.value)
                    }),
                    m('input[type=datetime-local][placeholder="Date de fin"]', {
                        value: event.endDate,
                        oninput: e => onFieldChange('endDate', e.target.value)
                    }),
                    m('button', {
                        onclick: () => {
                            if (event.title.trim() !== '' && event.startDate !== '' && event.endDate !== '') {
                                onSubmit();
                            }
                        }
                    }, submitLabel || 'Ajouter')
                ])
            ])
        ]);
    }
};

module.exports = EventForm;
