const m = require("mithril");

function getEventKey(event, colIndex) {
    return `${event.title}-${event.startDate}-${event.endDate}-${colIndex}`;
}

function formatDate(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

const DisplayEvents = {
    displayedEvents: new Set(),

    view: function (vnode) {
        const day = vnode.attrs.day;

        DisplayEvents.resetDisplayedEvents();

        const eventsVNodes = [];

        for (let rowIndex = 0; rowIndex < day.cases.length; rowIndex++) {
            const row = day.cases[rowIndex];

            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                const e = row[colIndex];

                if (e != null) {
                    const eventKey = getEventKey(e, colIndex);

                    if (DisplayEvents.displayedEvents.has(eventKey)) {
                        continue;
                    }

                    DisplayEvents.displayedEvents.add(eventKey);

                    const style = day.buildEventStyle(e, day.findPosition(e.startDate), day.findPosition(e.endDate));

                    eventsVNodes.push(
                        m('.event', { style: style, key: `event-${rowIndex}-${colIndex}` }, [
                            m('span', e.title),
                            m('p', [
                                m('span', formatDate(new Date(e.startDate))),
                                m('span', ' à '),
                                m('span', formatDate(new Date(e.endDate))),
                            ])
                        ])
                    );
                }
            }
        }

        return m('.events.calendar-grid', eventsVNodes);
    },

    resetDisplayedEvents: function () {
        DisplayEvents.displayedEvents.clear();
    }
};

module.exports = DisplayEvents;