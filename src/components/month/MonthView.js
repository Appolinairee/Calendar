const m = require("mithril");
const MonthGrid = require("./MonthGrid");

const MonthView = {
    oninit: function (vnode) {
        const { date, events } = vnode.attrs;
        this.month = new Month();
        this.month.update({ date, events });
    },

    view: function (vnode) {
        const { date, events } = vnode.attrs;

        return m('.month', [
            m(MonthGrid, {date, month: this.month}),
            m("p", "Month view not implemented yet."),
        ]);
    }
};

module.exports = MonthView;