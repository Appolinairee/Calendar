const m = require("mithril");

const TopBar = {
    formatDate: function (date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    },

    adjustDate: function (currentDate, days) {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    },

    view: function (vnode) {
        const { calendar } = vnode.attrs;

        return m('.navSection', m('.top-bar.flex', [
            m('.top-bar-date.flex', [
                m('span', { onclick: () => calendar.setCurrentDate(new Date()) }, 'Today'),
                m('.chevrons.flex', [
                    m('i.fas.fa-chevron-left', { onclick: () => calendar.setCurrentDate(this.adjustDate(calendar.date, -1)) }),
                    m('i.fas.fa-chevron-right', { onclick: () => calendar.setCurrentDate(this.adjustDate(calendar.date, 1)) })
                ]),
                m('p', this.formatDate(calendar.date)),
            ]),

            m('.top-bar-mode.flex', [
                m('span', { class: calendar.currentMode === 'day' ? 'active' : '', onclick: () => calendar.switchMode('day') }, 'Day'),
                m('span', { class: calendar.currentMode === 'month' ? 'active' : '', onclick: () => calendar.switchMode('month') }, 'Month'),
                m('span', { class: calendar.currentMode === 'year' ? 'active' : '' }, 'Year'),
                m('span', { class: calendar.currentMode === 'week' ? 'active' : '' }, 'Week')
            ]),

            m('.top-bar-search', [
                m('i.fas.fa-magnifying-glass'),
                m('input[type=text][placeholder=Rechercher...]', {
                    oninput: function (event) {
                        // Logic
                    }
                }),
            ])
        ]));
    }
};

module.exports = TopBar;