import m from "mithril";

const TopBarMode = {
    view: function (vnode) {
        const { calendar } = vnode.attrs;

        return m('.top-bar-mode.flex', [
            m('span', { class: calendar.currentMode === 'day' ? 'active' : '', onclick: () => calendar.switchMode('day') }, 'Day'),

            m('span', { class: calendar.currentMode === 'week' ? 'active' : '', onclick: () => calendar.switchMode('week') }, 'Week'),

            m('span', { class: calendar.currentMode === 'month' ? 'active' : '', onclick: () => calendar.switchMode('month') }, 'Month'),

            m('span', { class: calendar.currentMode === 'year' ? 'active' : '', onclick: () => calendar.switchMode('year') }, 'Year'),

        ]);
    }
};

export default  TopBarMode;