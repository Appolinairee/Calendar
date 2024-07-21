const m = require("mithril");

const Popup = {
    view: function (vnode) {
        return vnode.attrs.visible ? m(".popup", [
            m(".popup-content after", [
                m("span", "Événements"),
                m(".more-events", vnode.attrs.events.map(event => m(".more-event", [
                    m("p", event.title),
                    m("p.event-datetime", [
                        m('span', `${formatDate(event.startDate)}`),
                        m('', `${formatHour(new Date(event.startDate))} à ${formatHour(new Date(event.endDate))}`),
                    ])
                ]))),
                m("i.fas.fa-xmark", { onclick: vnode.attrs.onClose })
            ])
        ]) : null;
    }
};

module.exports = Popup;