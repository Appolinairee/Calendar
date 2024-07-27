const m = require("mithril");
const MonthGrid = require("./MonthGrid");
const MonthHeaderGrid = require('./MonthHeaderGrid');

const MonthView = {
    oninit: function (vnode) {
        const { date, events } = vnode.attrs;
        this.month = new Month();
        this.month.update({ date, events });
    },

    onbeforeupdate: function (vnode) {
        const { date, events } = vnode.attrs;
        if (date !== this.date || events !== this.events) {
            this.month.update({ date, events });
        }
    },

    view: function (vnode) {
        const { date, events } = vnode.attrs;

        return m('.month', [
            m(MonthHeaderGrid),
            m(MonthGrid, {date, month: this.month})
        ]);
    }
};

module.exports = MonthView;