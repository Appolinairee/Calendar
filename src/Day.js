class Day {

    constructor(props = {}) {
        this._date = props.date instanceof Date ? props.date : new Date();

        this._events = [];

        let isArrayOfObjects = props && props.events && Array.isArray(props.events) && props.events.every(event => typeof event === 'object');

        if (isArrayOfObjects)
            this._events = props.events;

        this._dayEvents = [];
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
        const { startDate } = event;
        const startHour = startDate.getUTCHours();
        const startMinutes = startDate.getUTCMinutes();

        let horizontalPosition = (startHour * 60 + startMinutes) / 15;

        horizontalPosition = Math.floor(horizontalPosition);

        const eventsAtSameTime = this.events.filter(existingEvent =>
            existingEvent.startDate.getHours() === startHour &&
            existingEvent.startDate.getMinutes() === startMinutes
        );

        eventsAtSameTime.sort((a, b) => a.startDate - b.startDate);

        if (eventsAtSameTime.length >= 6) {
            event.hidden = true;
        } else {
            event.verticalPosition = eventsAtSameTime.length * 4;
        }

        return horizontalPosition;
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