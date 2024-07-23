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
        const day = vnode.attrs.day;

        this.resetDisplayedEvents();

        const eventsVNodes = [];

        day.cases.forEach((row, rowIndex) => {
            row.forEach((e, colIndex) => {
                if (e) {
                    const eventKey = this.getEventKey(e, colIndex);

                    if (this.displayedEvents.has(eventKey)) return;

                    this.displayedEvents.add(eventKey);

                    const style = day.buildEventStyle(e, rowIndex, day.findPosition(e.endDate));

                    eventsVNodes.push(this.createEventVNode(e, style, rowIndex, colIndex));
                }
            });
        });

        return m('.events.calendar-grid', eventsVNodes);
    }
}

module.exports = DayEventsGrid;