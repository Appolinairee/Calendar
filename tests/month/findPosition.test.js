module('findPosition', (hooks) => {

    hooks.beforeEach(() => {
        month = new Month();
        month._date = new Date("2024-06-01");

        month._firstDayOfMonth = new Date(month._date.getFullYear(), month._date.getMonth(), 1).getDay();
        month._daysInMonth = new Date(month._date.getFullYear(), month._date.getMonth() + 1, 0).getDate();
    });

    test("should return -1, -1 for an invalid day", assert => {
        const { row, col } = month.findPosition(32);
        assert.deepEqual({ row, col }, { row: -1, col: -1 });
    });

    test("should correctly find the position for the first day of the month", assert => {
        const { row, col } = month.findPosition(1);

        assert.deepEqual({ row, col }, { row: 1, col: 6 });
    });

    test("should correctly find the position for the last day of the month", assert => {
        const { row, col } = month.findPosition(30);

        assert.deepEqual({ row, col }, { row: 5 * 5 + 1, col: 0 });
    });

    test("should correctly find the position for a day in the middle of the month", assert => {
        const { row, col } = month.findPosition(15);

        assert.deepEqual({ row, col }, { row: 2 * 5 + 1, col: 6 });
    });
});