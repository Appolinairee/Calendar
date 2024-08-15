const { isValidISODate, getUtcDate } = require('../../utils/date.utils');

class Day {

    constructor() {
        this._events = null;
        this._cases = null;
        this._date = null;
        this._cases = Array(96).fill(null).map(() => Array(3).fill(null));
        this._seemoreCases = Array(24).fill(null).map(() => []);
    }


    isCurrentDayEvent(event) {
        if (!event.startDate || !isValidISODate(event.startDate) || (event.endDate && !isValidISODate(event.endDate))) {
            return false;
        }

        const startDate = getUtcDate(new Date(event.startDate + 'Z'));
        const endDate = getUtcDate(new Date(event.endDate + 'Z'));
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
        const dateObject = getUtcDate(new Date(dateString));
        const startOfDay = getUtcDate(new Date(this._date.getTime()));
        startOfDay.setHours(0, 0, 0);
        let position;

        const endOfDay = new Date(this._date.getTime());
        endOfDay.setHours(23, 59, 59);

        if (dateObject < startOfDay || dateObject > endOfDay) {
            return 0;
        }

        const minutes = dateObject.getHours() * 60 + dateObject.getMinutes();

        if (dateObject.getMinutes() % 15 != 0)
            return Math.floor(minutes / 15) + 1;

        return Math.floor(minutes / 15);
    }


    fillCases(event, start, end) {
        let column = -1;

        if (start == end) {
            end++;
        }

        if (event.endDate && getUtcDate((new Date(event.endDate))).getMinutes() % 15 != 0)
            end++;

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


        if (column != -1) {
            for (let i = start; i < end; i++) {
                this._cases[i][column] = event;
            }
        } else {

            let seemoreStartSlot = Math.floor(start / 4);

            if (!this._seemoreCases[seemoreStartSlot]) {
                this._seemoreCases[seemoreStartSlot] = [];
            }
            this._seemoreCases[seemoreStartSlot].push(event);
        }
    }

    buildEventStyle(event, start, end) {
        const totalColumns = 3;
        const overlappingEvents = new Set();

        for (let i = start; i < end; i++) {
            this._cases[i].forEach(e => {
                if (e !== null) {
                    overlappingEvents.add(e);
                }
            });
        }


        const columnWidth = Math.floor(totalColumns / (Math.min(overlappingEvents.size, totalColumns)));

        let eventColIndex = this._cases[start].indexOf(event);
        let startCol = eventColIndex * columnWidth + 1;

        const endCol = Math.min(startCol + columnWidth, totalColumns + 1);

        const gridRow = `grid-row: ${start + 1} / ${end + 1};`;
        const gridColumn = `grid-column: ${startCol} / ${endCol};`;

        return `${gridColumn} ${gridRow}`;
    }


    update(data) {
        if (!data) return;

        if (data.date && !(data.date instanceof Date)) {
            throw new Error(DateParamError);
        }

        if (!data.events || !Array.isArray(data.events) || !data.events.every(event => typeof event === 'object')) {
            throw new Error(EventsParamError);
        }

        this._date = data.date instanceof Date ? data.date : new Date();
        this._events = data.events;

        this._cases = Array(96).fill(null).map(() => Array(3).fill(null));
        this._seemoreCases = Array(24).fill(null).map(() => []);

        this._events.forEach(event => {
            if (!this.isCurrentDayEvent(event)) return;

            const start = this.findPosition(event.startDate);
            if (start == -1) return;

            let end = event.endDate ? this.findPosition(event.endDate) : 1;
            end = end == 0 ? 95 : end;

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

    get seemoreCases() {
        return this._seemoreCases;
    }
}

module.exports = Day;