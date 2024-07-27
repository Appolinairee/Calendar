const m = require("mithril");
const Popup = require("../day/PopUp");

const MonthSeeMoreEvent = {
    oninit: function (vnode) {
        vnode.state.showPopup = false;
    },
    view: function (vnode) {
        return m('.month-see-more-container', { style: vnode.attrs.style }, [
            m('.see-more-event.flex', {
                onclick: () => {
                    vnode.state.showPopup = !vnode.state.showPopup;
                    m.redraw();
                }
            }, [
                m('i.far.fa-plus'),
                m('p', `${vnode.attrs.events.length} events`)
            ]),
            vnode.state.showPopup && m(Popup, {
                visible: vnode.state.showPopup,
                events: vnode.attrs.events,
                onClose: () => {
                    vnode.state.showPopup = false;
                    m.redraw();
                }
            })
        ]);
    }
};

module.exports = MonthSeeMoreEvent;
