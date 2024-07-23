const m = require("mithril");

const MonthEventsGrid = {
    createEventVNode(event, style, rowIndex, colIndex) {
        // 
    },

    view(vnode) {
        this.displayedEvents = new Set();
        const month = vnode.attrs.month;
        const eventsVNodes = [];

        return m('.events.calendar-grid', eventsVNodes);
    }
}

module.exports = MonthEventsGrid;