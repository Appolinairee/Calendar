const m = require("mithril");
const DisplayEvents = require("./components/DisplayEvents");
const HourList = require('./components/HourList');
const { events } = require('./assets/datas');

const CalendarGrid = {
    oninit: function (vnode) {
        this.day = new Day({
            date: vnode.attrs.currentDate,
            events: vnode.attrs.events
        });
    },
    view: function () {
        function renderCell(i, j) {
            let styleClass = '';

            styleClass = (i % 4 == 0) ? ' active after' : '';
            styleClass += (i == 95) ? ' bottom' : '';

            return m('.calendar-grid-cell', { key: i, class: styleClass });
        }
        const components = [];

        for (i = 0; i < 96; i++) {
            for (let j = 0; j < 4; j++) {
                components.push(renderCell(i, j));
            }
        }

        return m(".calendar-grid grid-background", [
            components,
            m(DisplayEvents, { events: this.day.events })
        ]);
    }
};

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
            ]),
            m('.dayLabel', [
                m("span", formattedDate[0]),
                m("p", formattedDate[1]),
            ]),
        ]);
    }
};

module.exports = CalendarView;
