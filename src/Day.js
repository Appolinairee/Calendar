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



    findPosition(dateString) {
        if (!dateString || !isValidISODate(dateString)) {
            return -1;
        }

        const dateObject = new Date(dateString);
        const startOfDay = new Date(this._date.getTime());
        startOfDay.setHours(0, 0, 0);


        const endOfDay = new Date(this._date.getTime());
        endOfDay.setHours(23, 59, 59);

        if (dateObject < startOfDay || dateObject > endOfDay) {
            return 0;
        }

        const minutes = dateObject.getHours() * 60 + dateObject.getMinutes();
        return Math.floor(minutes / 15);
    }


    fillCases(event, start, end) {
        let column = -1;

        if (start == end) {
            end++;
        }

        if (getUtcDate((new Date(event.endDate))).getMinutes() % 15 != 0)
            end++;

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

        if (column != -1) {
            for (let i = start; i < end; i++) {
                this._cases[i][column] = event;
            }
        }
    }

    buildEventStyle(event, start, end) {
        const totalColumns = 4;
        const uniqueEventsOnStartRow = new Set(this._cases[start].filter(e => e !== null));

        const columnWidth = Math.floor(totalColumns / uniqueEventsOnStartRow.size);

        const startCol = this._cases[start].indexOf(event) + 1;

        const endCol = Math.min(startCol + columnWidth, totalColumns + 1);

        const gridRow = `grid-row: ${start + 1} / ${end + 1};`;
        const gridColumn = `grid-column: ${startCol} / ${endCol};`;

        return `${gridColumn} ${gridRow}`;
    }

    update(data) {

        if (data && data.events && Array.isArray(events) && data.events.every(event => typeof event === 'object')) {
            this._events = events;
        }

        if (data && data.date && data.date instanceof Date) {
            this._date = date;
        }

        this._events.forEach(event => {
            if (!this.isCurrentDayEvent(event)) return;

            const start = this.findPosition(event.startDate);
            if (start == -1) return;

            const end = this.findPosition(event.endDate);
            if (end == -1) return;

            this.fillCases(event, start, end);
        });
    }

    getBoardStyle() {
        return `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(96, 20px);
        border: 1px solid black;
        border-radius: 5px;
        border-top: none;
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