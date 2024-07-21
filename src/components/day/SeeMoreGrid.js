const m = require("mithril");
const SeeMore = require("./SeeMore");

const SeeMoreGrid = {
    view: function (vnode) {
        const components = [];

        for (let i = 0; i < 24; i++) {
            components.push(
                m('.see-more-grid-cell.after', { key: i },
                    m(SeeMore, {
                        events: vnode.attrs.moreEvents[i]
                    })
                )
            );
        }

        return m(".see-more-grid", components);
    }
};

module.exports = SeeMoreGrid;