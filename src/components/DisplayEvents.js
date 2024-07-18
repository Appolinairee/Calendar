const m = require("mithril");

const DisplayEvents = {
    view: function (vnode) {
        const cases = vnode.attrs.events;
        return m('.events .calendar-grid', cases.map((e, index) => {
            const start = new Date(e.startDate).getHours() * 4 + new Date(e.startDate).getMinutes() / 15 + 1;
            const end = new Date(e.endDate).getHours() * 4 + new Date(e.endDate).getMinutes() / 15 + 1;
            const style = index
                ? `grid-column: 2/4; grid-row: ${start}/${end}; background: green; position: absolute;`
                : `grid-column: 1/2; grid-row: ${start}/${end}; background: red; position: absolute;`;

            return m('div', { style: style }, m('span', e.title));
        }));
    }
};

module.exports = DisplayEvents;