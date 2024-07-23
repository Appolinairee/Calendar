module('isMonthEvent', (hooks) => {

    hooks.beforeEach(() => {
        month = new Month();
        month._date = testDate;
    });

    test("should return false when event has no startDate", assert => {
        const event = { endDate: "2024-06-15T10:30:00Z" };
        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return false when event startDate is not valid ISO date", assert => {
        const event = { startDate: "Invalid Date", endDate: new Date().toISOString() };
        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return false when event endDate is provided and is not valid ISO date", assert => {
        const event = { startDate: new Date().toISOString(), endDate: "Invalid Date" };
        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return false when event endDate is provided and is not valid ISO date", assert => {
        const event = { startDate: new Date().toISOString(), endDate: "Invalid Date" };
        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return false when event startDate is after the end of the month", assert => {
        const event = { startDate: "2024-07-01T10:00:00Z", endDate: "2024-07-01T12:00:00Z" };
        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return true when event starts within the current month and has no end date", assert => {
        const event = { startDate: "2024-06-15T08:00:00Z" };
        assert.equal(month.isMonthEvent(event), true);
    });

    test("should return true when event starts before and ends within the current month", assert => {
        const event = { startDate: "2024-05-25T08:00:00Z", endDate: "2024-06-05T12:00:00Z" };
        assert.equal(month.isMonthEvent(event), true);
    });

    test("should return true when event starts within and ends after the current month", assert => {
        const event = { startDate: "2024-06-25T08:00:00Z", endDate: "2024-07-05T12:00:00Z" };
        assert.equal(month.isMonthEvent(event), true);
    });

    test("should return true when event starts before and ends after the current month", assert => {
        const event = { startDate: "2024-05-25T08:00:00Z", endDate: "2024-07-05T12:00:00Z" };
        assert.equal(month.isMonthEvent(event), true);
    });

    test("should return false when event starts before the current month and has no end date", assert => {
        const event = { startDate: "2024-05-25T08:00:00Z" };
        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return false when event starts after the current month and has no end date", assert => {
        const event = { startDate: "2024-07-01T08:00:00Z" };
        assert.equal(month.isMonthEvent(event), false);
    });
});
