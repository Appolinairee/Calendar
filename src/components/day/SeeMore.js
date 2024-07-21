const m = require("mithril");
const Popup = require("./PopUp");
const SeeMoreButton = require('./SeeMoreButton');

const SeeMore = {
    oninit: function (vnode) {
        this.showPopup = false;
        this.events = vnode.attrs.events;
        this.popupRef = null;
        this.buttonRef = null;

        console.log(this.events)
    },

    view: function (vnode) {
        return this.events.length > 0 && m('.see-more-container', [
            m(SeeMoreButton, {
                onClick: () => {
                    this.showPopup = true;
                    m.redraw();
                }
            }),
            this.showPopup && m(Popup, {
                visible: this.showPopup,
                events: this.events,
                onClose: () => {
                    this.showPopup = false;
                    m.redraw();
                }
            })
        ]);
    }
};

module.exports = SeeMore;