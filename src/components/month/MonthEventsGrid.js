const m = require("mithril");
const MonthSeeMore = require("./MonthSeeMore");
const SeeMore = require("../day/SeeMore");
const MonthSeeMoreEvent = require("./MonthSeeMore");

const MonthEventsGrid = {
    displayedEvents: new Set(),

    resetDisplayedEvents() {
        this.displayedEvents.clear();
    },

    getEventIdentifier(event) {
        return JSON.stringify(event);
    },

    createEventVNode(event, style, rowIndex, colIndex) {
        return m('.event', { style: style }, [
            m('span', event.title),
        ]);
    },

    view(vnode) {
        this.resetDisplayedEvents();
        const month = vnode.attrs.month;
        const eventsVNodes = [];

        console.log(month.cases)


        month.cases.forEach((row, rowIndex) => {
            row.forEach((e, colIndex) => {
                if (!e || this.displayedEvents.has(JSON.stringify(e))) return;

                this.displayedEvents.add(JSON.stringify(e));

                const style = month.buildEventStyle(e, colIndex, rowIndex);

                if (Array.isArray(e)) {
                    eventsVNodes.push(m(MonthSeeMoreEvent, {
                        style,
                        events: e
                    }));
                } else {
                    let event = e.event ? e.event : e;
                    const eventVNode = this.createEventVNode(event, style, rowIndex, colIndex);
                    if (eventVNode) {
                        eventsVNodes.push(eventVNode);
                    }
                }

            });
        });

        return m('.month-grid month-events-grid .month-events', eventsVNodes);
    }
};

module.exports = MonthEventsGrid;
