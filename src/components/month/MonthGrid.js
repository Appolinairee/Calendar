const m = require("mithril");
const BackgroundGrid = require("./BackgroundGrid");
const MonthEventsGrid = require("./MonthEventsGrid");

const MonthGrid = {

    view: function (vnode) {
        return m('.month-grid-container minimize-scrollbar', [
            m(BackgroundGrid, vnode.attrs),
            // m(MonthEventsGrid, vnode.attrs),
        ]);
    }

};

module.exports = MonthGrid;