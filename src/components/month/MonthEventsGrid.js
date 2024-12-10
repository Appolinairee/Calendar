import m from "mithril";
import MonthSeeMoreEvent from "./MonthSeeMore";

const MonthEventsGrid = {
  displayedEvents: new Set(),

  resetDisplayedEvents() {
    this.displayedEvents.clear();
  },

  getEventIdentifier(event) {
    return JSON.stringify(event);
  },

  createEventVNode(e, style, rowIndex, colIndex) {
    const eventClass = e.start === true ? "event-start" : "event-continue";

    return m(".event", { style: style, class: eventClass }, [
      m("span", e.start === true && e.event.title),
    ]);
  },

  view(vnode) {
    this.resetDisplayedEvents();
    const month = vnode.attrs.month;
    const eventsVNodes = [];

    month.cases.forEach((row, rowIndex) => {
      row.forEach((e, colIndex) => {
        if (
          !e ||
          this.displayedEvents.has(
            JSON.stringify({ event: e.event, newline: e.newLine })
          )
        )
          return;

        this.displayedEvents.add(
          JSON.stringify({ event: e.event, newline: e.newLine })
        );

        const style = month.buildEventStyle(e.event, colIndex, rowIndex);

        if (Array.isArray(e)) {
          eventsVNodes.push(
            m(MonthSeeMoreEvent, {
              style,
              events: e,
            })
          );
        } else {
          const eventVNode = this.createEventVNode(
            e,
            style,
            rowIndex,
            colIndex
          );
          if (eventVNode) {
            eventsVNodes.push(eventVNode);
          }
        }
      });
    });

    return m(".month-grid month-events-grid .month-events", eventsVNodes);
  },
};

export default MonthEventsGrid;
