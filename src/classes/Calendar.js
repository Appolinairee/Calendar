class Calendar {
    constructor(props = {}) {
        if (props.date && !(props.date instanceof Date)) {
            throw new Error("Invalid date");
        }

        if (!props.events || !Array.isArray(props.events) || !props.events.every(event => typeof event === 'object')) {
            throw new Error("Invalid events");
        }

        this._currentDate = props.date instanceof Date ? props.date : new Date();
        this._events = this.configureEvents(props.events, props.attributeNames || {});
        this._validModes = ['day', 'month', 'year', 'week'];
        this._currentMode = this._validModes.includes(props.mode) ? props.mode : 'day';
    }

    configureEvents(events, attributeNames) {
        const { title, startDate, endDate } = {
            title: 'title',
            startDate: 'startDate',
            endDate: 'endDate',
            ...attributeNames
        };

        return events.map(event => ({
            title: event[title],
            startDate: event[startDate],
            endDate: event[endDate]
        }));
    }

    switchMode(mode) {
        if (this._validModes.includes(mode)) {
            this._currentMode = mode;
        } else {
            this._currentMode = 'day';
        }
    }

    setCurrentDate(date) {
        if (date === undefined) {
            throw new Error("Date parameter is required");
        }

        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }

        this._currentDate = date;
    }

    get date() {
        return this._currentDate;
    }

    get events() {
        return this._events;
    }

    get currentMode() {
        return this._currentMode;
    }
}
