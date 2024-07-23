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
        
        vnode.attrs.day.cases.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                components.push(this.renderCell(rowIndex, colIndex));
            });
        });

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