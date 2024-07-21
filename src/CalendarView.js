const m = require("mithril");
const HourList = require('./components/day/HourList');
const CalendarGrid = require('./components/CalendarGrid');
const { events } = require('./assets/datas');

const CalendarView = {
    view: function (vnode) {
        const { currentDate, activeMode } = vnode.attrs;

        const options = { weekday: 'short', day: 'numeric' };

        const formattedDate = currentDate.toLocaleDateString('fr-FR', options).split(' ');

        formattedDate[0] = formattedDate[0].replace('.', '');

        return m('.calendar-view', [
            m('.day', [
                m(HourList),
                m(CalendarGrid, { events, currentDate }),
                m(HourList),
            ]),
            m('.dayLabel', [
                m("p.text", formattedDate[0]),
                m("p.number", formattedDate[1]),
            ]),
        ]);
    }
};

module.exports = CalendarView;