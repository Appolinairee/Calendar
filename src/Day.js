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
        if (!event.startDate || !isValidISODate(event.startDate) || (event.endDate && !isValidISODate(event.endDate))) {
            return false;
        }

        const startDate = getUtcDate(new Date(event.startDate));
        const endDate = getUtcDate(new Date(event.endDate));
        const currentDate = this._date;

        const isSameDay = (date) =>
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear();

        const isAfterCurrentDate = (date) => {
            return (
                date.getFullYear() > currentDate.getFullYear() ||
                (date.getFullYear() === currentDate.getFullYear() && date.getMonth() > currentDate.getMonth()) ||
                (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() > currentDate.getDate())
            );
        };

        const isBeforeCurrentDate = (date) => {
            return (
                date.getFullYear() < currentDate.getFullYear() ||
                (date.getFullYear() === currentDate.getFullYear() && date.getMonth() < currentDate.getMonth()) ||
                (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() < currentDate.getDate())
            );
        };

        if (isSameDay(startDate)) {
            return true;
        }

        return isBeforeCurrentDate(startDate) && (isSameDay(endDate) || isAfterCurrentDate(endDate));
    }


    findPosition(event) {
        if (!this.isCurrentDayEvent(event))
            return { start: -1, end: -1 };

        const startOfDay = new Date(this._date.getTime());
        startOfDay.setHours(0, 0, 0);

        const endOfDay = new Date(this._date.getTime());
        endOfDay.setHours(23, 59, 59)

        const dateObjectStart = getUtcDate(new Date(event.startDate));
        const dateObjectEnd = getUtcDate(new Date(event.endDate));

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
            let { start, end } = this.findPosition(event);

            if (getUtcDate((new Date(event.endDate))).getMinutes() % 15 != 0)
                end++;

            let column = -1;
            for (let j = 0; j < 3; j++) {
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
                    this._cases[i][column] = event;
                }
            }
        });
    }


    buildEventStyle(event) {
        this.fillCases();

        let colStart = -1;
        let colEnd = -1;
        let rowStart = -1;
        let rowEnd = -1;

        for (let i = 0; i < 96; i++) {
            for (let j = 0; j < 3; j++) {
                if (this._cases[i][j] === event) {
                    colStart = j + 1;
                    colEnd = colStart + 1;

                    if (rowStart == -1) {
                        rowStart = i + 1;
                        rowEnd = rowStart + 1;
                    } else {
                        rowEnd = rowEnd + 1;
                    }
                    break;
                }
            }
        }

        return `grid-column: ${colStart} / span ${colEnd - colStart}; grid-row: ${rowStart} / span ${rowEnd - rowStart};`;
    }


    getBoardStyle() {
        return `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(96, 100px);
    `;
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