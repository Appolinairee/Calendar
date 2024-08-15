const m = require("mithril");

const DayEventsGrid = {
    resetDisplayedEvents() {
        this.displayedEvents.clear();
    },

    getEventKey(event, colIndex) {
        return `${event.title}-${event.startDate}-${event.endDate}-${colIndex}`;
    },

    createEventVNode(event, style, rowIndex, colIndex) {
        return m('.event', { style: style, key: `event-${rowIndex}-${colIndex}` }, [
            m('span', event.title),
            m('p', [
                m('span', formatDateForDayEvent(event.startDate)),
                m('span', ' à '),
                m('span', formatDateForDayEvent(event.endDate)),
            ])
        ]);
    },

    view(vnode) {
        this.displayedEvents = new Set();

        this.resetDisplayedEvents();

        const eventsVNodes = [];

        vnode.attrs.day.cases.forEach((row, rowIndex) => {
            row.forEach((e, colIndex) => {
                if (e) {
                    const eventKey = this.getEventKey(e, colIndex);
                    if (this.displayedEvents.has(eventKey)) return;

                    this.displayedEvents.add(eventKey);
                    let endPosition = e.endDate ? vnode.attrs.day.findPosition(e.endDate) : 1;
                    endPosition = endPosition == 0 ? 96 : endPosition;

                    const style = vnode.attrs.day.buildEventStyle(e, rowIndex, endPosition);

                    eventsVNodes.push(this.createEventVNode(e, style, rowIndex, colIndex));
                }
            });
        });

        return m('.events.calendar-grid', eventsVNodes);
    }
}

module.exports = DayEventsGrid;