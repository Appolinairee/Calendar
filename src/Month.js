class Month {

    constructor() {
        this._caseSubdivisions = 5;
        this._cases = Array(6 * this._caseSubdivisions).fill(null).map(() => Array(7).fill(null));
        this._date = null;
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

    isMonthEvent(event) {
        const startDate = event.startDate ? new Date(event.startDate) : null;
        const endDate = event.endDate ? new Date(event.endDate) : null;

        if (!startDate || !isValidISODate(event.startDate) || (endDate && !isValidISODate(event.endDate))) {
            return false;
        }

        const isInMonth = (date) => {
            return date >= this._firstOfMonth && date <= this._lastOfMonth;
        }

        if (isInMonth(startDate) && !endDate) {
            return true;
        }

        if (startDate > endDate)
            return false;

        return (
            (startDate <= this._lastOfMonth && endDate >= this._firstOfMonth) ||
            (endDate && endDate >= this._firstOfMonth && endDate <= this._lastOfMonth) ||
            (startDate && startDate <= this._lastOfMonth && endDate && endDate >= this._firstOfMonth)
        );
    }

    findPosition(dateString) {
        const dateObject = getUtcDate(new Date(dateString));
        return this._firstOfMonth.getDate() + dateObject.getDate() - 1;
    }


    fillCases(event, start, end) {
        const startRow = Math.floor(start / 7);
        const startCol = start % 7;
        const endRow = Math.floor(end / 7);
        const endCol = end % 7;

        if (startRow === endRow && startCol === endCol) {
            this.placeSingleCase(event, startRow, startCol);
        } else if (startRow === endRow) {
            this.placeSingleLine(event, startRow, startCol, endCol);
        } else {
            this.placeMultipleLines(event, startRow, startCol, endRow, endCol);
        }
    }

    tryPlaceInSpecialCase(event, startRow, startCol) {
        let canBeInSeeMore = true;

        for (let i = 1; i < 4; i++) {
            if (this._cases[startRow * 5 + i][startCol] == null) {
                this._cases[startRow * 5 + i][startCol] = event;
                canBeInSeeMore = false;
                break;
            }
        }

        return canBeInSeeMore;
    }

    placeSingleCase(event, row, col) {
        if (this.tryPlaceInSpecialCase(event, row, col)) {
            let moreCase = this._cases[row * 5 + 4][col];
            if (!Array.isArray(moreCase)) {
                moreCase = [];
            }
            moreCase.push(event);
            this._cases[row * 5 + 4][col] = moreCase;
        }
    }

    placeSingleLine(event, row, startCol, endCol) {
        let placed = false;

        for (let i = 1; i < 4; i++) {
            let canPlace = true;

            for (let j = startCol; j <= endCol; j++) {
                if (this._cases[row * 5 + i][j] != null) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                for (let j = startCol; j <= endCol; j++) {
                    this._cases[row * 5 + i][j] = event;
                }

                placed = true;
                break;
            }
        }

        if (!placed) {
            let placedInFirstDay = false;
            for (let i = 1; i < 4; i++) {
                if (this._cases[row * 5 + i][startCol] == null) {
                    this._cases[row * 5 + i][startCol] = event;
                    placedInFirstDay = true;
                    break;
                }
            }

            if (!placedInFirstDay) {
                if (!Array.isArray(this._cases[row * 5 + 4][startCol])) {
                    this._cases[row * 5 + 4][startCol] = [];
                }
                this._cases[row * 5 + 4][startCol].push(event);
            }
        }
    }


    placeMultipleLines(event, startRow, startCol, endRow, endCol) {
        let canPlace = true, placeIndex = null;

        for (let row = startRow; row <= endRow; row++) {
            let rowStartCol = (row === startRow) ? startCol : 0;
            let rowEndCol = (row === endRow) ? endCol : 6;

            for (let i = 1; i < 4; i++) {
                for (let j = rowStartCol; j <= rowEndCol; j++) {
                    if (this._cases[row * 5 + i][j] != null) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) { if (placeIndex == null) placeIndex = i };

                if (!canPlace) break;
            }
            if (!canPlace) break;
        }


        if (canPlace) {
            for (let row = startRow; row <= endRow; row++) {
                let rowStartCol = (row === startRow) ? startCol : 0;
                let rowEndCol = (row === endRow) ? endCol : 6;

                for (let j = rowStartCol; j <= rowEndCol; j++) {
                    this._cases[row * 5 + placeIndex][j] = { event, index: row };
                }

            }
        } else {
            let placedInFirstDay = false;
            for (let i = 1; i < 4; i++) {
                if (this._cases[startRow * 5 + i][startCol] == null) {
                    this._cases[startRow * 5 + i][startCol] = { event, start: true, end: true };
                    placedInFirstDay = true;
                    break;
                }
            }

            if (!placedInFirstDay) {
                if (!Array.isArray(this._cases[startRow * 5 + 4][startCol])) {
                    this._cases[startRow * 5 + 4][startCol] = [];
                }
                this._cases[startRow * 5 + 4][startCol].push(event);
            }
        }

    }

    buildEventStyle(event, col, startRow) {
        let eventsColNumber = 0, colStart = 0, rowStart = -1;
        const totalColumns = 7;

        for (let row = startRow; row < startRow + this._caseSubdivisions - 1; row++) {
            for (let i = 0; i < totalColumns; i++) {
                let isSameEvent = event == this._cases[row][i];

                if(typeof event?.index == 'number') {
                    isSameEvent = JSON.stringify(event) == JSON.stringify(this._cases[row][i]);
                }

                if (this._cases[row][i] && isSameEvent ) {
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
        if (!data || !data.date || !data.events || data.events.length == 0)
            return -1;

        this._date = data.date;

        this._firstOfMonth = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
        this._lastOfMonth = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0, 23, 59, 59);

        this._cases = Array(6 * this._caseSubdivisions).fill(null).map(() => Array(7).fill(null));
        this._date = null;

        data.events.forEach(event => {
            if (!this.isMonthEvent(event) || !event.startDate)
                return;

            const start = this.findPosition(event.startDate);
            const end = event.endDate ? this.findPosition(event.endDate) : start;

            this.fillCases(event, start, end);
        });
    }

    get date() {
        return this._date;
    }

    get cases() {
        return this._cases;
    }
}