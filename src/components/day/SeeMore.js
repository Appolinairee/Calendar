const m = require("mithril");
const Popup = require("./PopUp");
const SeeMoreButton = require('./SeeMoreButton');

const SeeMore = {
    oninit: function (vnode) {
        this.showPopup = false;
        this.popupRef = null;
        this.buttonRef = null;
    },

    view: function (vnode) {
        return vnode.attrs.events.length > 0 && m('.see-more-container', [
            m(SeeMoreButton, {
                onClick: () => {
                    this.showPopup = true;
                },
                length: vnode.attrs.events.length,
            }),
            this.showPopup && m(Popup, {
                visible: this.showPopup,
                events: vnode.attrs.events,
                onClose: () => {
                    this.showPopup = false;
                }
            })
        ]);
    }
};

module.exports = SeeMore;