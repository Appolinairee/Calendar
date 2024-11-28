import m from "mithril";

const HourList = {
    view: function () {
        return m('.hourList', Array.from({ length: 24 }, (_, i) => {
            const hour = String(i).padStart(2, '0');
            return m(".hour-item", `${hour}:00`);
        }))
    }
}

export default  HourList;