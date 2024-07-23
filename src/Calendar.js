class Calendar {
    constructor(props = {}) {
        if (props.date && !(props.date instanceof Date)) {
            throw new Error(DateParamError);
        }

        if (!props.events || !Array.isArray(props.events) || !props.events.every(event => typeof event === 'object')) {
            throw new Error(EventsParamError);
        }

        this._currentDate = props.date instanceof Date ? props.date : new Date();
        this._events = props.events;

        this._validModes = ['day', 'month', 'year'];
        this._currentMode = this._validModes.includes(props.mode) ? props.mode : 'day';
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
            throw new Error(DateParamError);
        }

        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error(DateParamError);
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