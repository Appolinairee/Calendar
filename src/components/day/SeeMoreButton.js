import m from "mithril";

const SeeMoreButton = {
    view: function (vnode) {
        return m('.see-more-btn.flex after', {
            onclick: vnode.attrs.onClick
        }, [
            m('i.far.fa-plus'),
            m('p', [
                m('p.number', vnode.attrs.length),
                m('p.label', ' events')
            ])
        ]);
    }
};

export default SeeMoreButton;