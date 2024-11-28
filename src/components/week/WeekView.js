import m from "mithril";
import HourList from "../day/HourList";
import WeekDaysList from "./WeekDaysList";
import WeekGrid from "./WeekGrid";

const WeekView = {
    view: function (vnode) {
        const { date, events } = vnode.attrs;

        const formattedDate = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }).split(' ');
        formattedDate[0] = formattedDate[0].replace('.', '');

        return m('.week-view', [
            m(WeekDaysList),
            m('.week flex minimize-scrollbar', [
                m(HourList),
                m(WeekGrid, { day: this.day }),
                m(HourList),
            ])
        ]);
    }
}

export default  WeekView;