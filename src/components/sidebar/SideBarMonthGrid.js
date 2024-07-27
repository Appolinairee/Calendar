const m = require("mithril");
const MonthHeaderGrid = require("../month/MonthHeaderGrid");
const SideBarMonthNavigation = require("./SideBarMonthNavigation");

const SideBarMonthGrid = {
    oninit: function (vnode) {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.currentDay = this.date.getDate();
        this.events = vnode.attrs.calendar.events;
    },

    getEventsCountForDay: function (date) {
        const day = new Day();
        day._date = date;

        return this.events.filter(event => day.isCurrentDayEvent(event)).length;
    },

    updateDate: function (offset) {
        this.currentMonth += offset;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.date = new Date(this.currentYear, this.currentMonth, this.currentDay);
        m.redraw();
    },

    getDaysInMonth: function (year, month) {
        return new Date(year, month + 1, 0).getDate();
    },

    generateCellContent: function (dayCounter, startingDayOfWeek, week, day, lastDayOfPreviousMonth, nextMonthDayCounter) {
        let content = dayCounter;
        let isCurrentMonth = true;
        let isToday = false;
        let eventPoints = [];

        if (week === 0 && day < startingDayOfWeek) {
            content = lastDayOfPreviousMonth - (startingDayOfWeek - day - 1);
            isCurrentMonth = false;
        } else if (dayCounter > this.getDaysInMonth(this.currentYear, this.currentMonth)) {
            content = nextMonthDayCounter;
            isCurrentMonth = false;
        }

        if (isCurrentMonth) {
            isToday = this.currentYear === new Date().getFullYear() &&
                this.currentMonth === new Date().getMonth() &&
                dayCounter === new Date().getDate();


            const eventCount = this.getEventsCountForDay(new Date(this.currentYear, this.currentMonth, dayCounter));
            eventPoints = Array(Math.min(eventCount, 5)).fill('•');
        }

        return {
            content,
            isCurrentMonth,
            isToday,
            eventPoints
        };
    },

    view: function (vnode) {
        const weeks = 6;
        const days = 7;
        const components = [];

        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
        const startingDayOfWeek = firstDayOfMonth.getDay();
        const lastDayOfPreviousMonth = this.getDaysInMonth(this.currentYear, this.currentMonth - 1);

        let dayCounter = 1;
        let nextMonthDayCounter = 1;

        for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < days; day++) {
                const cellInfo = this.generateCellContent(dayCounter, startingDayOfWeek, week, day, lastDayOfPreviousMonth, nextMonthDayCounter);

                if (cellInfo.isCurrentMonth) {
                    dayCounter++;
                } else {
                    nextMonthDayCounter++;
                }

                const cellClass = cellInfo.isCurrentMonth ? (cellInfo.isToday ? 'today' : '') : 'non-current-month';


                components.push(m('.cell', { class: cellClass }, [
                    m('p', [
                        m('span', cellInfo.content),
                        cellInfo.eventPoints.length > 0 ? m('.event-points', cellInfo.eventPoints.map((point, index) => m('span.point', { key: index }, point))) : null,
                    ]),
                ]));
            }
        }

        return m('.sidebar-month-view', [
            m(SideBarMonthNavigation, { date: this.date, updateDate: this.updateDate.bind(this) }),
            m(MonthHeaderGrid),
            m('.sidebar-month-grid', components)
        ]);
    }
};

module.exports = SideBarMonthGrid;