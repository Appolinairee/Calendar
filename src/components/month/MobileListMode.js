import m from "mithril";
import { formatDate } from "../../../utils/date.utils";

const MobileListMode = () => {
    return {
        view: (vnode) => {
            const events = vnode.attrs.calendar.getCurrentDayEvents();

            return m('div', { class: "list-mode-container" }, [
                m("div", { class: "list-mode" }, [
                    m('div.flex.header', [
                        m("div", "Events for"),

                        m('div', { class: "list-mode-date" }, formatDate(vnode.attrs.calendar._currentDate)),
                    ]),

                    events.length > 0 ? m("div", { class: "list-mode-events" }, (
                        events.map(event =>
                            m("div", { class: "event-item" }, [
                                m("p.title", event.title),

                                m("div", [
                                    m("span", { class: "event-date-label" }, "Start: "),
                                    m("span", formatDate(new Date(event.startDate).toLocaleString()))
                                ]),
                                m("div", [
                                    m("span", { class: "event-date-label" }, "End: "),
                                    m("span", formatDate(new Date(event.endDate).toLocaleString()))
                                ])
                            ])
                        ))
                    ) : m("div", { style: "text-align: center; margin-top: 20px;" }, "No events.")
                ]),

                m("div", {
                    class: "overlay",
                    onclick: () => vnode.attrs.calendar.desactiveMobileListMode(),
                }),
            ])
        }
    }
}

export default MobileListMode;