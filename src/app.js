const m = require("mithril");
const CalendarView = require("./CalendarView");
const TopBar = require('./components/TopBar');

const App = {
    oninit: function (vnode) {
        vnode.state.currentDate = new Date();
        vnode.state.activeMode = 'Day';
    },

    view: function (vnode) {
        return m('.app', [
            m(TopBar, {
                currentDate: vnode.state.currentDate,
                activeMode: vnode.state.activeMode,
                setCurrentDate: (date) => vnode.state.currentDate = date,
                setActiveMode: (mode) => vnode.state.activeMode = mode
            }),
            m(CalendarView, {
                currentDate: vnode.state.currentDate,
                activeMode: vnode.state.activeMode
            })
        ]);
    }
}

m.mount(document.body, {
    view: () => m(App)
});