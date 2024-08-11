module('buildEventStyle', (hooks) => {
    let month;

    hooks.beforeEach(() => {
        month = new Month();
    });

    test('should generate correct style for a single event without overlaps', assert => {
        const event = { id: 1, startDate: "2024-06-15T09:00:00Z" };
        month._cases[10][1] = { event };

        const style = month.buildEventStyle(event, 1, 10);
        assert.equal(style, 'grid-column: 2 / 3; grid-row: 11 / 12;');
    });

    test('should generate correct style when for three events in same day', assert => {
        const event1 = { id: 1, startDate: "2024-06-15T09:00:00Z" };
        const event2 = { id: 2, startDate: "2024-06-15T10:00:00Z" };
        const event3 = { id: 3, startDate: "2024-06-15T11:00:00Z" };

        month._cases[11][1] = { event: event1 };
        month._cases[12][1] = { event: event2 };
        month._cases[13][1] = { event: event3 };

        const style1 = month.buildEventStyle(event1, 1, 10);
        const style2 = month.buildEventStyle(event2, 2, 10);
        const style3 = month.buildEventStyle(event3, 3, 10);

        assert.equal(style1, 'grid-column: 2 / 3; grid-row: 12 / 13;');
        assert.equal(style2, 'grid-column: 2 / 3; grid-row: 13 / 14;');
        assert.equal(style3, 'grid-column: 2 / 3; grid-row: 14 / 15;');
    });

    test('should handle multi-day events correctly', assert => {
        const event = { id: 1, startDate: "2024-06-14T09:00:00Z", endDate: "2024-06-16T17:00:00Z" };
        month._cases[11][0] = { event };
        month._cases[11][1] = { event };
        month._cases[11][2] = { event };

        const style = month.buildEventStyle(event, 6, 10);

        assert.equal(style, 'grid-column: 1 / 4; grid-row: 12 / 13;');
    });

});