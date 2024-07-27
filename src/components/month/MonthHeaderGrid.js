const m = require("mithril");

const MonthHeaderGrid = {
    view: function () {
        return m('.month-grid-header', [
            m('div', 'Dim'),
            m('div', 'Lun'),
            m('div', 'Mar'),
            m('div', 'Mer'),
            m('div', 'Jeu'),
            m('div', 'Ven'),
            m('div', 'Sam')
        ])
    }
};

module.exports = MonthHeaderGrid;