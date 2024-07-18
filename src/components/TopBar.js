const m = require("mithril");

const TopBar = {
    view: function () {
        return m('.top-bar.flex', [
            m('.top-bar-date.flex', [
                m('i.fas.fa-chevron-left'),
                m('span', 'Today'),
                m('i.fas.fa-chevron-right'),
            ]),

            m('.top-bar-mode.flex', [
                m('span', 'Day'),
                m('span.active', 'Week'),
                m('span', 'Month'),
                m('span', 'Year')
            ]),
            m('.top-bar-search', [
                m('.i.fas.fa-magnifying-glass'),
                m('input[type=text][placeholder=Rechercher...]', {
                    oninput: function(event) {
                        // 
                    }
                }),
            ])
        ]);
    }
}

module.exports = TopBar;