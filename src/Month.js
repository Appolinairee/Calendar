class Month {

    constructor() {
        this._caseSubdivisions = 5;
        this._cases = Array(6 * this._caseSubdivisions).fill(null).map(() => Array(7).fill(null));
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

    findPosition(dateString) {
        const dateObject = getUtcDate(new Date(dateString));
        return this._firstOfMonth + dateObject.getDate() - 1;
    }


    fillCases(event, start, end) {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);

        const firstDayOfMonth = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
        const lastDayOfMonth = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);

        if (startDate < firstDayOfMonth) startDate.setTime(firstDayOfMonth.getTime());
        if (endDate > lastDayOfMonth) endDate.setTime(lastDayOfMonth.getTime());

        let currentDay = new Date(startDate);
        currentDay.setHours(0, 0, 0);

        while (currentDay <= endDate) {
            const day = currentDay.getDate();
            const { row, col } = this.findPosition(day);


            let inserted = false;
            for (let i = 0; i < 3; i++) {
                if (this._cases[row + i][col] === null) {
                    this._cases[row + i][col] = event;
                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                if (!Array.isArray(this._cases[row + 3][col])) {
                    this._cases[row + 3][col] = [];
                }
                this._cases[row + 3][col].push(event);
            }

            currentDay.setDate(currentDay.getDate() + 1);
        }
    }

    buildEventStyle(event, col, startRow) {
        let eventsColNumber = 0, colStart = 0, rowStart = -1;
        const totalColumns = 7;

        for (let row = startRow; row < startRow + this._caseSubdivisions - 1; row++) {
            for (let i = 0; i < totalColumns; i++) {
                if (this._cases[row][i] && this._cases[row][i] === event) {
                    eventsColNumber++;

                    if (eventsColNumber === 1) {
                        colStart = i;
                        rowStart = row;
                    }
                }
            }
        }

        const endCol = eventsColNumber + colStart;

        const gridRow = `grid-row: ${rowStart + 1} / ${rowStart + 2};`;

        const gridColumn = `grid-column: ${colStart + 1} / ${endCol + 1};`;

        return `${gridColumn} ${gridRow}`;
    }

    
    update(data) {
        // 
    }

    get events() {
        return this._events;
    }

    get date() {
        return this._date;
    }

    get cases() {
        return this._cases;
    }
}