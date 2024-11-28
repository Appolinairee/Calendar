import m from "mithril";
import BackgroundGrid from "./BackgroundGrid";
import MonthEventsGrid from "./MonthEventsGrid";

const MonthGrid = {

    view: function (vnode) {
        return m('.month-grid-container minimize-scrollbar', [
            m(BackgroundGrid, vnode.attrs),
            m(MonthEventsGrid, vnode.attrs),
        ]);
    }

};

export default  MonthGrid;