module('fillCases for month', (hooks) => {
    hooks.beforeEach(() => {
        month = new Month();
        month._date = new Date("2024-06-01");

        month._firstDayOfMonth = new Date(month._date.getFullYear(), month._date.getMonth(), 1).getDay();
        month._daysInMonth = new Date(month._date.getFullYear(), month._date.getMonth() + 1, 0).getDate();
    });

    test("should place a single-day event in the correct cell", assert => {
        const event = { startDate: "2024-06-15T09:00:00Z", endDate: "2024-06-15T17:00:00Z" };
        month.fillCases(event);

        assert.deepEqual(month._cases[2 * 5 + 1][6], event);
    });

    test("should place an event spanning multiple days correctly", assert => {
        const event = { startDate: "2024-06-14T09:00:00Z", endDate: "2024-06-16T17:00:00Z" };
        month.fillCases(event);

        assert.deepEqual(month._cases[2 * 5 + 1][5], event);
        assert.deepEqual(month._cases[2 * 5 + 1][6], event);
        assert.deepEqual(month._cases[3 * 5 + 1][0], event);
    });

    test("should handle an event that spans the end of the month", assert => {
        const event = { startDate: "2024-06-28T09:00:00Z", endDate: "2024-07-02T17:00:00Z" };
        month.fillCases(event);

        assert.deepEqual(month._cases[4 * 5 + 1][5], event);
        assert.deepEqual(month._cases[4 * 5 + 1][6], event);
        assert.deepEqual(month._cases[5 * 5 + 1][0], event);
    });


    test("should handle a single-day event when there is already an existing event on the same day", assert => {
        month._cases[1][6] = 1;

        const event = { startDate: "2024-06-01T11:00:00Z", endDate: "2024-06-01T12:00:00Z" };
        month.fillCases(event);

        assert.deepEqual(month._cases[1][6], 1);
        assert.deepEqual(month._cases[2][6], event);
    });

    test("should place additional events in the seeMore section if they overflow", assert => {
        const events = [
            { startDate: "2024-06-15T09:00:00Z", endDate: "2024-06-15T10:00:00Z" },
            { startDate: "2024-06-15T11:00:00Z", endDate: "2024-06-15T12:00:00Z" },
            { startDate: "2024-06-15T13:00:00Z", endDate: "2024-06-15T14:00:00Z" },
            { startDate: "2024-06-15T15:00:00Z", endDate: "2024-06-15T16:00:00Z" },
        ];

        events.forEach(event => month.fillCases(event));

        assert.deepEqual(month._cases[2 * 5 + 1][6], events[0]);
        assert.deepEqual(month._cases[2 * 5 + 2][6], events[1]);
        assert.deepEqual(month._cases[2 * 5 + 3][6], events[2]);
        assert.deepEqual(month._cases[2 * 5 + 4][6][0], events[3]);
    });

});
