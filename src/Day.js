class Day {

    constructor(props = {}) {
        this._date = props.date instanceof Date ? props.date : new Date();

        this._events = [];

        let isArrayOfObjects = props && props.events && Array.isArray(props.events) && props.events.every(event => typeof event === 'object');

        if (isArrayOfObjects)
            this._events = props.events;

        this._dayEvents = [];
        this.findDayEvents();
    }

    getEndOfDay(date) {
        const endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59));
        return endDate.toISOString();
    }

    isSameDay(date1, date2) {
        return date1.getUTCFullYear() === date2.getUTCFullYear() &&
            date1.getUTCMonth() === date2.getUTCMonth() &&
            date1.getUTCDate() === date2.getUTCDate();
    }

    findDayEvents = () => {
        if (this._events.length === 0) {
            this._dayEvents = [];
            return;
        }

        this._dayEvents = this._events.map(event => {
            if (isValidISODate(event.startDate)) {
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);

                if (!isValidISODate(event.endDate)) {
                    event.endDate = this.getEndOfDay(startDate);
                }

                if (endDate < startDate) {
                    return null;
                }

                if (this.isSameDay(startDate, this._date)) {
                    return event;
                }
            }
            return null;
        }).filter(event => event !== null);
    }


    findEDayStartPosition(event) {
        const isTodayEvent = this._dayEvents.some(e => e.id == event.id);

        if (!isTodayEvent) {
            return { x: -1, y: -1 };
        }

        const startMinutes = event.startDate.getUTCHours() * 60 + event.startDate.getUTCMinutes();
        const positionX = Math.floor(startMinutes / MINUTES_IN_SUBDIVISION);

        const overlappingEvents = this._dayEvents.filter(e =>
            e.id !== event.id &&
            !(e.endDate <= event.startDate || e.startDate >= event.endDate)
        );

        overlappingEvents.push(event);

        console.log(overlappingEvents);

        overlappingEvents.sort((a, b) => {
            if (a.startDate.getTime() === b.startDate.getTime()) {
                return (a.endDate.getTime() - a.startDate.getTime()) - (b.endDate.getTime() - b.startDate.getTime());
            }
            return a.startDate - b.startDate;
        });

        const positionY = overlappingEvents.findIndex(e => e.id === event.id);

        return { x: positionX, y: positionY };
    }

    get date() {
        return this._date;
    }

    get dayEvents() {
        return this._dayEvents;
    }

    get events() {
        return this._events;
    }
}