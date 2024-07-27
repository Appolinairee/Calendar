const m = require("mithril");

const Popup = {
    view: function (vnode) {
        return m(".popup after", [
            m(".popup-content minimize-scrollbar", [
                m("span", `+ ${vnode.attrs.events.length} events`),
                m(".more-events", vnode.attrs.events.map(event => m(".more-event", [
                    m("p", event.title),
                    m("p.event-datetime", [
                        m('span', `${formatDate(event.startDate)}`),
                        m('', `${formatHour(new Date(event.startDate))} à ${formatHour(new Date(event.endDate))}`),
                    ])
                ]))),
                m("i.fas.fa-xmark", { onclick: vnode.attrs.onClose })
            ])
        ]);
    }
};

module.exports = Popup;