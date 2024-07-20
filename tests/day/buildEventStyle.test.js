module("buildEventStyle", () => {

    test("should occupy the entire row if it is the only event on that row", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T01:00:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        for (let i = 0; i < 4; i++) {
            day._cases[i][0] = event;
        }

        const eventStyle = day.buildEventStyle(event, 0, 3);

        assert.equal(eventStyle, "grid-column: 1 / 5; grid-row: 1 / 5;");
    });


    test("should share the row space between two events", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:45:00Z" };
        const day = new Day({ date: testDate, events: [] });

        for (let i = 0; i < 3; i++) {
            day._cases[i][0] = 1;
            day._cases[i][1] = event;
        }

        const eventStyle = day.buildEventStyle(event, 0, 3);

        assert.equal(eventStyle, "grid-column: 1 / 3; grid-row: 1 / 2;");
    });

    test("should share grid-column space between two events occupying the same row", assert => {
        const event1 = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const event2 = { startDate: "2024-06-25T00:30:00Z", endDate: "2024-06-25T01:00:00Z" };
        const day = new Day({ date: testDate, events: [event1, event2] });

        day._cases[0][0] = event1;
        day._cases[0][1] = event2;

        const event1Style = day.buildEventStyle(event1, 0, 0);
        const event2Style = day.buildEventStyle(event2, 0, 1);

        assert.equal(event1Style, "grid-column: 1 / 3; grid-row: 1 / 2;");
        assert.equal(event2Style, "grid-column: 3 / 5; grid-row: 1 / 2;");
    });



    test("should share grid-column space between three events occupying the same row::should correctly handle events when column count is uneven", assert => {
        const event1 = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:20:00Z" };
        const event2 = { startDate: "2024-06-25T00:20:00Z", endDate: "2024-06-25T00:40:00Z" };
        const event3 = { startDate: "2024-06-25T00:40:00Z", endDate: "2024-06-25T01:00:00Z" };
        const day = new Day({ date: testDate, events: [event1, event2, event3] });

        day._cases[0][0] = event1;
        day._cases[0][1] = event2;
        day._cases[0][2] = event3;

        const event1Style = day.buildEventStyle(event1, 0, 0);
        const event2Style = day.buildEventStyle(event2, 0, 1);
        const event3Style = day.buildEventStyle(event3, 0, 2);

        assert.equal(event1Style, "grid-column: 1 / 2; grid-row: 1 / 2;");
        assert.equal(event2Style, "grid-column: 2 / 3; grid-row: 1 / 2;");
        assert.equal(event3Style, "grid-column: 3 / 4; grid-row: 1 / 2;");
    });

});
