const DisplayEvents = require("./day/DisplayEvents");
const SeeMoreGrid = require('./day/SeeMoreGrid');

const CalendarGrid = {
    oninit: function (vnode) {
        this.day = new Day();

        this.day.update({
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
            for (let j = 0; j < 3; j++) {
                components.push(renderCell(i, j));
            }
        }

        return m('.grid-container', [
            m(".calendar-grid grid-background", [
                components,
                m(DisplayEvents, { day: this.day })
            ]),
            m(SeeMoreGrid, {moreEvents: this.day.seemoreCases})
        ])

        return;
    }
};

module.exports = CalendarGrid;