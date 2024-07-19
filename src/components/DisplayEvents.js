const m = require("mithril");

const DisplayEvents = {
    view: function (vnode) {
        const cases = vnode.attrs.events;
        return m('.events .calendar-grid', cases.map((e, index) => {
            const start = new Date(e.startDate).getHours() * 4 + new Date(e.startDate).getMinutes() / 15 + 1;
            const end = new Date(e.endDate).getHours() * 4 + new Date(e.endDate).getMinutes() / 15 + 1;
            const style = index == 1
                ? `grid-column: 1/5; grid-row: 1/5;`
                : `grid-column: 1/2; grid-row: 6/8;`;

            return m('.event', { style: style }, [
                m('span', e.title),
                m('span', e.startDate),
                m('span', e.endDate),
            ]);
        }));
    }
};

module.exports = DisplayEvents;