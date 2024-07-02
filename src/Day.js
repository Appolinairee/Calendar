class Day {

    constructor(props = {}) {
        if (props.date && !(props.date instanceof Date)) {
            throw new Error(DateParamError);
        }

        if (!props.events || !Array.isArray(props.events) || !props.events.every(event => typeof event === 'object')) {
            throw new Error(EventsParamError);
        }

        this._date = props.date instanceof Date ? props.date : new Date();
        this._date.setHours(0, 0, 0);

        this._events = props.events;
        this._cases = Array(96).fill(null).map(() => Array(4).fill(null));
    }


    isCurrentDayEvent(event) {
        if (!isValidISODate(event.startDate))
            return false;

        const startDate = new Date(event.startDate);

        const currentDateEnd = new Date(this._date.getTime());
        currentDateEnd.setHours(23, 59, 59);


        if (startDate >= this._date && startDate <= currentDateEnd) {
            if (!event.endDate)
                return true;

            return isValidISODate(event.endDate) && startDate <= (new Date(event.endDate));
        }

        if(!event.endDate || !isValidISODate(event.endDate))
            return false;

        const endDate = new Date(event.endDate);

        if(startDate < this._date && (endDate >= currentDateEnd || (endDate >= this._date && endDate <= currentDateEnd)) )
            return startDate <= endDate;

        return false;
    }

    // findPosition(date) {
    //     const dateObject = new Date(date);

    //     const endOfDay = new Date(this._date);
    //     endOfDay.setUTCHours(23, 59, 59, 999);

    //     if (dateObject > endOfDay) {
    //         return 96;
    //     }

    //     const startMinutes = dateObject.getUTCHours() * 60 + dateObject.getUTCMinutes();
    //     const position = Math.floor(startMinutes / MINUTES_IN_SUBDIVISION);

    //     return position;
    // }


    findPosition(event) {
        const startOfDay = this._date;
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = this._date;
        endOfDay.setUTCHours(23, 59, 59, 999);

        const dateObjectStart = new Date(event.startDate);
        const dateObjectEnd = new Date(event.endDate);

        let startPosition = 0;
        let endPosition = 96;

        if (dateObjectStart >= startOfDay && dateObjectStart <= endOfDay) {
            const startMinutes = dateObjectStart.getUTCHours() * 60 + dateObjectStart.getUTCMinutes();
            startPosition = Math.floor(startMinutes / 15);
        }

        if (dateObjectEnd >= startOfDay && dateObjectEnd <= endOfDay) {
            const endMinutes = dateObjectEnd.getUTCHours() * 60 + dateObjectEnd.getUTCMinutes();
            endPosition = Math.floor(endMinutes / 15);
        }

        return { start: startPosition, end: endPosition };
    }


    fillCases() {
        this._events.forEach(event => {

            if (!this.isCurrentDayEvent(event))
                return;

            const startPosition = this.findPosition(event.startDate);
            let endPosition = this.findPosition(event.endDate);

            if ((new Date(event.endDate)).getUTCMinutes() % 15 != 0)
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