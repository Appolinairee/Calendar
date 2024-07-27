const m = require("mithril");
const SeeMore = require("./SeeMore");

const SeeMoreGrid = {
    view: function (vnode) {
        const components = [];

        console.log(vnode.attrs.moreCases[0])

        for (let i = 0; i < 24; i++) {
            components.push(
                m('.see-more-grid-cell.after', { key: i },
                    m(SeeMore, {
                        events: vnode.attrs.moreCases[i]
                    })
                )
            );
        }

        return m(".see-more-grid", components);
    }
};

module.exports = SeeMoreGrid;