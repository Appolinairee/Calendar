const m = require("mithril");

const HourList = {
    view: function () {
        return m('.hourList', Array.from({ length: 25 }, (_, i) => {
            return m(".hour-item", `${i}:00`);
        }))
    }
}

module.exports = HourList;