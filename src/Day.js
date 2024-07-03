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

    getUtcDate(date) {
        const utcDate = new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
        );

        return utcDate;
    }


    isCurrentDayEvent(event) {
        if (!isValidISODate(event.startDate))
            return false;

        let startDate = this.getUtcDate(new Date(event.startDate));

        const endOfDay = new Date(this._date.getTime());
        endOfDay.setHours(23, 59, 59);

        if (startDate >= this._date && startDate <= endOfDay) {
            if (!event.endDate)
                return true;

            return isValidISODate(event.endDate) && startDate <= (new Date(event.endDate));
        }

        if (!event.endDate || !isValidISODate(event.endDate))
            return false;

        const endDate = this.getUtcDate(new Date(event.endDate));

        if (startDate < this._date && (endDate >= endOfDay || (endDate >= this._date && endDate <= endOfDay)))
            return startDate <= endDate;

        return false;
    }

    findPosition(event) {

        if (!this.isCurrentDayEvent(event))
            return { start: -1, end: -1 };

        const startOfDay = new Date(this._date.getTime());

        const endOfDay = new Date(this._date.getTime());
        endOfDay.setHours(23, 59, 59)

        const dateObjectStart = this.getUtcDate(new Date(event.startDate));
        const dateObjectEnd = this.getUtcDate(new Date(event.endDate));

        let startPosition = 0;
        let endPosition = 96;

        if (dateObjectStart >= startOfDay && dateObjectStart <= endOfDay) {
            const startMinutes = dateObjectStart.getHours() * 60 + dateObjectStart.getUTCMinutes();
            startPosition = Math.floor(startMinutes / 15);
        }

        if (dateObjectEnd >= startOfDay && dateObjectEnd <= endOfDay) {
            const endMinutes = dateObjectEnd.getHours() * 60 + dateObjectEnd.getUTCMinutes();
            endPosition = Math.floor(endMinutes / 15);

        }

        return { start: startPosition, end: endPosition };
    }


    fillCases() {
        this._events.forEach(event => {
            if (!this.isCurrentDayEvent(event))
                return;

            let { start, end } = this.findPosition(event);

            if (this.getUtcDate((new Date(event.endDate))).getMinutes() % 15 != 0)
                end++;

            let column = -1;
            for (let j = 0; j < 4; j++) {
                let canPlace = true;
                for (let i = start; i < end; i++) {
                    if (this._cases[i][j]) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    column = j;
                    break;
                }
            }

            if (column !== -1) {
                for (let i = start; i < end; i++) {
                    this._cases[i][column] = event.id;
                }
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