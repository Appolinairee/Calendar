const m = require("mithril");
const SideBarMonthGrid = require("./SideBarMonthGrid");

const SideBar = {
    view: function (vnode) {
        return m('.sidebar',
            m(SideBarMonthGrid, vnode.attrs)
        );
    },
};

module.exports = SideBar;