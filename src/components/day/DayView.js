import m from "mithril";
import HourList from "./HourList";
import DayGrid from "./DayGrid";
import Day from "../../classes/Day";

const DayView = {
    oninit: function (vnode) {
        this.day = new Day();
        this.day.update({ date: vnode.attrs.date, events: vnode.attrs.events });
    },

    onbeforeupdate: function (vnode) {
        this.day.update({ date: vnode.attrs.date, events: vnode.attrs.events });
    },

    view: function (vnode) {
        const { date } = vnode.attrs;

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

export default DayView;