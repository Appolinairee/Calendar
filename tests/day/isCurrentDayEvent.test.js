const day2 = new Day();
day2.update({ date: testDate, events: [] });

module('isCurrentDayEvent', () => {
    test("should return false when event has no startDate", assert => {
        const event = { endDate: "2024-06-25T10:30:00Z" };
        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return false when event startDate is not valid ISO date", assert => {
        const event = { startDate: "Invalid Date", endDate: new Date().toISOString() };
        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return false when event endDate is provided and is not valid ISO date", assert => {
        const event = { startDate: new Date().toISOString(), endDate: "Invalid Date" };
        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return true when event endDate is not provided and startDate is for day", assert => {
        const event = { startDate: "2024-06-25"};
        assert.equal(day2.isCurrentDayEvent(event), true);
    });

    test("should return false when event startDate is not for current day", assert => {
        const event = { startDate: "2024-06-24T10:00:00Z", endDate: "2024-06-24T11:00:00Z" };
        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return false when endDate is before startDate", assert => {
        const event = { startDate: "2024-06-24T10:00:00Z", endDate: "2024-06-24T09:00:00Z" };
        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return false when event is not for current day and endDate is not defined", assert => {
        const event = { startDate: "2024-06-24T10:00:00Z" };
        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return true when event startDate is current day", assert => {
        const event = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
        assert.equal(day2.isCurrentDayEvent(event), true);
    });

    test("should return true when startDate is before current and endDate is current", assert => {
        const event = {
            startDate: "2024-06-24T22:00:00Z",
            endDate: "2024-06-25T23:00:00Z"
        };
        assert.equal(day2.isCurrentDayEvent(event), true);
    });

    test("should return true when startDate is before current and endDate is after current", assert => {
        const event = {
            startDate: "2024-06-24T22:00:00Z",
            endDate: "2024-06-25T23:00:00Z"
        };
        assert.equal(day2.isCurrentDayEvent(event), true);
    });
});
