const m = require("mithril");
const DisplayEvents = require("./components/DisplayEvents");
const HourList = require('./components/HourList');
const { events } = require('./assets/datas');

const CalendarGrid = {
    oninit: function (vnode) {
        this.day = new Day({
            date: new Date(),
            events: vnode.attrs.events
        });
    },
    view: function () {
        function renderCell(i) {
            return m('.calendar-grid-cell', { key: i, class: (i % 4 == 0) ? 'active' : '' });
        }
        const components = [];

        for (i = 0; i < 96; i++) {
            for (let j = 0; j < 4; j++) {
                components.push(renderCell(i));
            }
        }

        return m(".calendar-grid", [
            components,
            m(DisplayEvents, { events: this.day.events })
        ]);
    }
};

const CalendarView = {
    view: function () {
        return m('.day', [
            m(HourList),
            m(CalendarGrid, { events }),
        ]);
    }
};

module.exports = CalendarView;
