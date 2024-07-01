class Day {

    constructor(props = {}) {
        if (props.date && !(props.date instanceof Date)) {
            throw new Error(DateParamError);
        }

        if (!props.events || !Array.isArray(props.events) || !props.events.every(event => typeof event === 'object')) {
            throw new Error(EventsParamError);
        }

        this._date = props.date instanceof Date ? props.date : new Date();
        this._events = props.events;
        this._cases = Array(96).fill(null).map(() => Array(4).fill(null));
    }


    isCurrentDayEvent(event) {
        if (!isValidISODate(event.startDate))
            return false;

        const startDate = new Date(event.startDate);

        if (
            startDate.getUTCFullYear() !== this._date.getUTCFullYear() ||
            startDate.getUTCMonth() !== this._date.getUTCMonth() ||
            startDate.getUTCDate() !== this._date.getUTCDate()
        ) {
            return false;
        }

        if (event.endDate && isValidISODate(event.endDate))
            return startDate <= new Date(event.endDate);
        else if (event.endDate && !isValidISODate(event.endDate))
            return false;

        return true;
    }

    findPosition(date) {
        const dateObject = new Date(date);

        const endOfDay = new Date(this._date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        if (dateObject > endOfDay) {
            return 96;
        }

        const startMinutes = dateObject.getUTCHours() * 60 + dateObject.getUTCMinutes();
        const position = Math.floor(startMinutes / MINUTES_IN_SUBDIVISION);

        return position;
    }

    fillCases() {
        this._events.forEach(event => {

            if (!this.isCurrentDayEvent(event))
                return;
    
            const startPosition = this.findPosition(event.startDate);
            let endPosition = this.findPosition(event.endDate);

            if((new Date(event.endDate)).getUTCMinutes() % 15 != 0)
                endPosition++;

            for (let i = startPosition; i < endPosition; i++) {
                this._cases[i][0] = event.id;
            }
        });
    }

    get date() {
        return this._date;
    }

    get cases() {
        return this._cases;
    }

    get events() {
        return this._events;
    }
}