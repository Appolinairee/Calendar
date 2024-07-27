const m = require("mithril");

const TopBarSearch = {
    view: function (vnode) {
        return m('.top-bar-search', [
            m('i.fas.fa-magnifying-glass'),
            m('input[type=text][placeholder=Rechercher...]', {
                oninput: function (event) {
                    // Logic
                }
            }),
        ]);
    }
};

module.exports = TopBarSearch;