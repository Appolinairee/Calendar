const m = require("mithril");

const WeekGrid = {
    view: function (vnode) {
        const cells = 7 * 24;
        
        return m('.week-grid', 
            Array.from({ length: cells }).map((_, index) =>
                m('.week-cell')
            )
        );
    }
}

module.exports = WeekGrid;