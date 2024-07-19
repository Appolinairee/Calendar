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
        const { currentDate, activeMode, setCurrentDate, setActiveMode } = vnode.attrs;

        return m('.navSection', m('.top-bar.flex', [
            m('.top-bar-date.flex', [
                m('span', { onclick: () => setCurrentDate(new Date()) }, 'Today'),
                m('.chevrons.flex', [
                    m('i.fas.fa-chevron-left', { onclick: () => setCurrentDate(this.adjustDate(currentDate, -1)) }),
                    m('i.fas.fa-chevron-right', { onclick: () => setCurrentDate(this.adjustDate(currentDate, 1)) })
                ]),
                m('p', this.formatDate(currentDate)),
            ]),

            m('.top-bar-mode.flex', [
                m('span', { class: activeMode === 'Day' ? 'active' : '', onclick: () => setActiveMode('Day') }, 'Day'),
                m('span', { class: activeMode === 'Week' ? 'active' : '', onclick: () => setActiveMode('Week') }, 'Week'),
                m('span', { class: activeMode === 'Month' ? 'active' : '', onclick: () => setActiveMode('Month') }, 'Month'),
                m('span', { class: activeMode === 'Year' ? 'active' : '', onclick: () => setActiveMode('Year') }, 'Year')
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