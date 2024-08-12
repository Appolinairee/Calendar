const m = require("mithril");

const ToggleButton = {
    view: function(vnode) {
        return m('button', {
            onclick: vnode.attrs.onToggle
        }, vnode.attrs.showForm ? '-' : '+');
    }
};

module.exports = ToggleButton;