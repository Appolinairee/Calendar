class Month {

    constructor(props = {}) {
        if (props.date && !(props.date instanceof Date)) {
            throw new Error(DateParamError);
        }

        if (!props.events || !Array.isArray(props.events) || !props.events.every(event => typeof event === 'object')) {
            throw new Error(EventsParamError);
        }

        this._date = props.date instanceof Date ? props.date : new Date();
        this._events = props.events;
        this._cases = Array(7).fill(null).map(() => Array(5).fill(null));
    }


    isMonthEvent(event) {
        if (!isValidISODate(event.startDate))
            return false;

        const startOfMonth = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
        const endOfMonth = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0, 23, 59, 59);

        const startDate = new Date(event.startDate);

        if (startDate > endOfMonth) {
            return false;
        }

        if (event.endDate) {
            if (!isValidISODate(event.endDate)) {
                return false;
            }

            const endDate = new Date(event.endDate);
            if (endDate < startOfMonth) {
                return false;
            }
        } else {
            if (startDate < startOfMonth) {
                return false;
            }
        }

        return true;
    }


    findPosition(event) {

    }

    fillCases() {

    }

    buildEventStyle() {

    }

    getBoardStyle() {

    }

    get events() {
        return this._events;
    }

    get date() {
        return this._date;
    }
}