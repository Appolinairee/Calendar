import m from "mithril";
import Popup from "./PopUp";
import SeeMoreButton from './SeeMoreButton';

const SeeMore = {
    oninit: function (vnode) {
        this.showPopup = false;
    },

    view: function (vnode) {
        return vnode.attrs.events.length > 0 && m('.see-more-container', [
            m(SeeMoreButton, {
                onClick: () => {
                    this.showPopup = !this.showPopup;
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

export default  SeeMore;