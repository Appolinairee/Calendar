const m = require("mithril");
const SeeMore = require("./SeeMore");

const SeeMoreGrid = {
    oninit: function (vnode) {
        this.moreEvents = vnode.attrs.moreEvents;
    },

    view: function (vnode) {
        const components = [];

        for (let i = 0; i < 24; i++) {
            components.push(
                m('.see-more-grid-cell.after', { key: i },
                    m(SeeMore, {
                        events: this.moreEvents[i]
                    })
                )
            );
        }

        return m(".see-more-grid", components);
    }
};

module.exports = SeeMoreGrid;