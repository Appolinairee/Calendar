const m = require("mithril");
const TopBarDate = require("./TopBarDate");
const TopBarMode = require("./TopBarMode");
const TopBarSearch = require("./TopBarSearch");

const TopBar = {
    view: function (vnode) {
        const { calendar } = vnode.attrs;

        return m('.navSection', m('.top-bar.flex', [
            m(TopBarDate, { calendar }),
            m(TopBarMode, { calendar }),
            m(TopBarSearch)
        ]));
    }
};

module.exports = TopBar;