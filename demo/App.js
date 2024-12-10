import m from "mithril";
import { events } from "../src/assets/datas";
import EventManager from "./EventManager";
import EventsView from "./event/EventsView";
import CalendarApp from "../src/Calendar";

let eventManager = new EventManager(events);

const App = {
  oninit: function (vnode) {
    const attributeNames = {
      title: "title",
      startDate: "startDate",
      endDate: "endDate",
    };
    vnode.state.calendarAttributes = attributeNames;
  },

  view: function (vnode) {
    return m(".app", [
      m(EventsView, { eventManager }),
      m(
        "p",
        m(CalendarApp, {
          events: eventManager.getEvents(),
          attributeNames: vnode.state.calendarAttributes,
        })
      ),
    ]);
  },
};

m.mount(document.body, {
  view: () => m(App),
});
