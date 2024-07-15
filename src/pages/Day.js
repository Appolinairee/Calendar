const m = require("mithril");

const cases = [
    { title: "Réunion", startDate: "2024-07-14T09:00:00Z", endDate: "2024-07-14T10:00:00Z" },
    { title: "Atelier", startDate: "2024-07-14T11:00:00Z", endDate: "2024-07-14T12:30:00Z" }
];

const CalendarDayView = {
    oninit: function (vnode) {
        this.day = new Day({
            date: new Date(),
            events: vnode.attrs.events
        });
    },
    view: function () {
        const day = this.day;
        const components = [];

        for (i = 0; i < 96; i++) {
            for (let j = 0; j < 4; j++) {
                const style = (i % 4 == 0) ? 'border: none; border-top: 1px solid black;' : '';

                components.push(m(".calendar-event", {
                    style: style
                }, []));
            }
        }

        return m(".calendar-day-view", {
            style: day.getBoardStyle() + ' z-index: 5;'
        }, [components, m(DisplayEvents),]);
    }
};

const HourList = {
    view: function () {
        return m('.hourList', Array.from({ length: 25 }, (_, i) => {
            return m(".hour-item", `${i}:00`);
        }))
    }
}

const DisplayEvents = {
    view: function () {
        return m('.events', cases.map((e, index) => {
            let style;

            if (index) {
                style = 'grid-column: 2/ 4; grid-row: 6/7; background: green;'
            } else {
                style = 'grid-column: 1/2; grid-row: 1/5; background: red;'
            }

            return m('div', { style: style }, m('span',
                e.title
            ))
        }));
    }
}


const Component = {
    view: function () {
        return m('.day', [
            m(HourList),
            m(CalendarDayView, { events:cases }),
        ])
    }
}

module.exports = Component;