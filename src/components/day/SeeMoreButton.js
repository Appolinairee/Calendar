const m = require("mithril");

const SeeMoreButton = {
    view: function (vnode) {
        return m('.see-more-btn.flex', {
            onclick: vnode.attrs.onClick
        }, [
            m('i.far.fa-square-plus'),
            m('p', `${vnode.attrs.length} events`)
        ]);
    }
};

module.exports = SeeMoreButton;