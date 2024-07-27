const m = require("mithril");

const SideBarMonthNavigation = {
    view: function(vnode) {
        const { date, updateDate } = vnode.attrs;
        return m('.sidebar-navigation', [
            m('.nav-button', { onclick: () => updateDate(-1) }, '<'),
            m('div', `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`),
            m('.nav-button', { onclick: () => updateDate(1) }, '>')
        ]);
    }
};

module.exports = SideBarMonthNavigation;