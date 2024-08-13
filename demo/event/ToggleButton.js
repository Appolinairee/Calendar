const m = require("mithril");

const ToggleButton = {
    view: function (vnode) {
        return m('div.button flex', {
            onclick: vnode.attrs.onToggle
        }, [
            m('i.fa-solid fa-plus'),
            m('p', 'Ajouter')
        ]);
    }
};

module.exports = ToggleButton;