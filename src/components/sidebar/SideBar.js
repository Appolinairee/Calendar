const m = require("mithril");
const SideBarMonthGrid = require("./SideBarMonthGrid");

const SideBar = {
    isVisible: true,

    toggleVisibility: function () {
        SideBar.isVisible = !SideBar.isVisible;
    },

    view: function (vnode) {
        return m('.sidebar-container', [
            m('i.fas.fa-bars menu-icon', { onclick: SideBar.toggleVisibility }),

            SideBar.isVisible && m('.sidebar', m(SideBarMonthGrid, vnode.attrs))
        ]);
    },
};

module.exports = SideBar;