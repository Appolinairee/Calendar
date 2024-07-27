const m = require("mithril");
const HourList = require("./HourList");
const DayGrid = require("./DayGrid");

const DayView = {
    oninit: function (vnode) {
        const { date, events } = vnode.attrs;
        this.day = new Day();
        this.day.update({ date, events });
    },

    onbeforeupdate: function (vnode) {
        const { date, events } = vnode.attrs;
        if (date !== this.date || events !== this.events) {
            this.day.update({ date, events });
            this.date = date;
            this.events = events;
        }
    },

    view: function (vnode) {
        const { date, events } = vnode.attrs;

        const formattedDate = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }).split(' ');
        formattedDate[0] = formattedDate[0].replace('.', '');

        return m('.calendar-view', [
            m('.dayLabel', [
                m("p.text", formattedDate[0]),
                m("p.number", formattedDate[1]),
            ]),
            m('.day minimize-scrollbar', [
                m(HourList),
                m(DayGrid, { day: this.day }),
                m(HourList),
            ])
        ]);
    }
};

module.exports = DayView;