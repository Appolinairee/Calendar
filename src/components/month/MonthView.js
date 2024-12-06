import m from "mithril";
import MonthGrid from "./MonthGrid";
import MonthHeaderGrid from './MonthHeaderGrid';

import Month from "../../classes/Month";

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
            return true;
        }
        return false;
    },

    view: function (vnode) {
        const { date, events } = vnode.attrs;

        return m('.month', [
            m(MonthHeaderGrid),
            m(MonthGrid, {date, month: this.month}),
        ]);
    }
};

export default  MonthView;