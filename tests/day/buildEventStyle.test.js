module("BuildEventStyle", () => {
    test("should correctly style a single 15-minute event in the grid", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:15:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        day.fillCases();
        const eventStyle = day.buildEventStyle(event);

        assert.deepEqual(eventStyle, {
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 2
        });
    });

    test("should correctly style a single 30-minute event in the grid", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        day.fillCases();
        const eventStyle = day.buildEventStyle(event);

        assert.deepEqual(eventStyle, {
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 3
        });
    });

    test("should correctly style an event crossing multiple hours", assert => {
        const event = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T12:00:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        day.fillCases();
        const eventStyle = day.buildEventStyle(event);

        assert.deepEqual(eventStyle, {
            colStart: 1,
            colEnd: 2,
            rowStart: 43,
            rowEnd: 49
        });
    });

    test("should correctly style an event covering multiple days including the current day", assert => {
        const event = { startDate: "2024-06-24T12:00:00Z", endDate: "2024-06-26T12:00:00Z" };
        const testDate = new Date("2024-06-25T00:00:00Z");
        const day = new Day({ date: testDate, events: [event] });

        day.fillCases();
        const eventStyle = day.buildEventStyle(event);

        assert.deepEqual(eventStyle, {
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 97
        });
    });

    test("should correctly style two overlapping events", assert => {
        const event1 = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const event2 = { startDate: "2024-06-25T00:15:00Z", endDate: "2024-06-25T01:00:00Z" };
        const day = new Day({ date: testDate, events: [event1, event2] });

        day.fillCases();
        const event1Style = day.buildEventStyle(event1);
        const event2Style = day.buildEventStyle(event2);

        assert.deepEqual(event1Style, {
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 3
        });

        assert.deepEqual(event2Style, {
            colStart: 2,
            colEnd: 3,
            rowStart: 2,
            rowEnd: 5
        });
    });

    test("should correctly style two events completely overlapping", assert => {
        const event1 = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T01:00:00Z" };
        const event2 = { startDate: "2024-06-25T00:15:00Z", endDate: "2024-06-25T00:45:00Z" };
        const day = new Day({ date: testDate, events: [event1, event2] });

        day.fillCases();
        const event1Style = day.buildEventStyle(event1);
        const event2Style = day.buildEventStyle(event2);

        assert.deepEqual(event1Style, {
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 5
        });

        assert.deepEqual(event2Style, {
            colStart: 2,
            colEnd: 3,
            rowStart: 2,
            rowEnd: 4
        });
    });
});