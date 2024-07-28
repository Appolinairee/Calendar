const m = require("mithril");
const EventManager = require("./EventManager");

const eventManager = new EventManager('events');

const EventList = {
    view: function () {
        return m('.events-container',
            [
                m('p', "Liste des événements"),
                m('div',
                    eventManager.getEvents().map(event =>
                        m('div', [
                            m('h3', event.title),
                            m('p', `Start: ${event.startDate}`),
                            m('p', `End: ${event.endDate}`),
                            m('button', { onclick: () => eventManager.deleteEvent(event.id) }, 'Delete')
                        ])
                    ))
            ]
        );
    }
};

module.exports = EventList;
