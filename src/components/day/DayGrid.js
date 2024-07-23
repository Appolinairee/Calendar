const m = require("mithril");
const SeeMoreGrid = require('./SeeMoreGrid');
const DayEventsGrid = require("./DayEventsGrid");

const DayGrid = {
    renderCell: function (i, j) {
        let styleClass = '';
        styleClass = (i % 4 === 0) ? ' active after' : '';
        styleClass += (i === 95) ? ' bottom' : '';
        return m('.calendar-grid-cell', { key: i, class: styleClass });
    },

    view: function (vnode) {
        const components = [];

        for (let i = 0; i < 96; i++) {
            for (let j = 0; j < 3; j++) {
                components.push(this.renderCell(i, j));
            }
        }

        return m('.grid-container', [
            m(".calendar-grid.grid-background", [
                components,
                m(DayEventsGrid, vnode.attrs)
            ]),
            m(SeeMoreGrid, { moreCases: vnode.attrs.day.seemoreCases })
        ]);
    }
};

module.exports = DayGrid;