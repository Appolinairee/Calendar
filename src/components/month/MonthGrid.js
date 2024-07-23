const m = require("mithril");

const MonthGrid = {
    oninit: function (vnode) {
        const { date, events } = vnode.attrs;
        this.month = new Month();
        this.month.update({ date, events });
    },

    renderCell: function (day, isCurrentMonth) {
        const styleClass = isCurrentMonth ? 'current-month' : 'other-month';
        return m('.month-grid-cell', { key: day.date, class: styleClass }, [
            m('span', day.day)
        ]);
    },

    view: function (vnode) {
        // const { date, events } = vnode.attrs;
        // const days = this.month.getDaysInMonth(); 
        // const weeks = this.month.getWeeks();

        return m('.month-grid-container minimize-scrollbar', [
            m('.month-grid-header', [
                m('div', 'Sun'),
                m('div', 'Mon'),
                m('div', 'Tue'),
                m('div', 'Wed'),
                m('div', 'Thu'),
                m('div', 'Fri'),
                m('div', 'Sat')
            ]),
        ]);
    }
};

module.exports = MonthGrid;
