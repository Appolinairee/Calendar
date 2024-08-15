const Day = require('../src/classes/Day');

class CalendarUtils {
    static generateGridCells(params) {
        const {
            weeks,
            days,
            firstDayOfMonth,
            startingDayOfWeek,
            lastDayOfPreviousMonth,
            currentYear,
            currentMonth,
            events,
            calendar,
            setCalendarDate
        } = params;

        let dayCounter = 1;
        let nextMonthDayCounter = 1;
        const components = [];

        for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < days; day++) {
                const cellInfo = this.generateCellContent({
                    dayCounter,
                    startingDayOfWeek,
                    week,
                    day,
                    lastDayOfPreviousMonth,
                    nextMonthDayCounter,
                    currentYear,
                    currentMonth,
                    events,
                    calendar
                });

                if (cellInfo.isCurrentMonth) {
                    dayCounter++;
                } else {
                    nextMonthDayCounter++;
                }

                const cellClass = [
                    cellInfo.isCurrentMonth ? (cellInfo.isToday ? 'today' : '') : 'non-current-month',
                    cellInfo.isSelected ? 'selected' : '',
                    cellInfo.eventPoints.length > 0 ? 'with-dots' : '',
                ].join(' ');

                components.push(m('.cell', {
                    class: cellClass,
                    onclick: () => setCalendarDate(new Date(currentYear, currentMonth, cellInfo.content))
                }, [
                    m('p', [
                        m('span', cellInfo.content),
                        cellInfo.eventPoints.length > 0 ? m('.event-points', cellInfo.eventPoints.map((point, index) => m('span.point', { key: index }, point))) : null,
                    ]),
                ]));
            }
        }
        return components;
    }

    static generateCellContent(params) {
        const {
            dayCounter,
            startingDayOfWeek,
            week,
            day,
            lastDayOfPreviousMonth,
            nextMonthDayCounter,
            currentYear,
            currentMonth,
            events,
            calendar
        } = params;

        let content = dayCounter;
        let isCurrentMonth = true;
        let isToday = false;
        let isSelected = false;
        let eventPoints = [];

        if (week === 0 && day < startingDayOfWeek) {
            content = lastDayOfPreviousMonth - (startingDayOfWeek - day - 1);
            isCurrentMonth = false;
        } else if (dayCounter > this.getDaysInMonth(currentYear, currentMonth)) {
            content = nextMonthDayCounter;
            isCurrentMonth = false;
        }

        if (isCurrentMonth) {
            isToday = currentYear === new Date().getFullYear() &&
                currentMonth === new Date().getMonth() &&
                dayCounter === new Date().getDate();

            isSelected = (dayCounter === calendar.date.getDate()) &&
                (currentMonth === calendar.date.getMonth()) &&
                (currentYear === calendar.date.getFullYear());

            const eventCount = this.getEventsCountForDay(new Date(currentYear, currentMonth, dayCounter), events);
            eventPoints = Array(Math.min(eventCount, 5)).fill('•');
        }

        return {
            content,
            isCurrentMonth,
            isToday,
            isSelected,
            eventPoints
        };
    }

    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    static getEventsCountForDay(date, events) {
        const day = new Day();
        day._date = date;

        return events.filter(event => day.isCurrentDayEvent(event)).length;
    }
}

module.exports = CalendarUtils;