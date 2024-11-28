import m from "mithril";
import SideBarMonthGrid from "./SideBarMonthGrid";

const SideBar = {
    isVisible: false,

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

export default SideBar;