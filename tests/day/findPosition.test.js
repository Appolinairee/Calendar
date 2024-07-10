const day = new Day({ date: testDate, events: [{}] });

module('findPosition', () => {

    test("should return -1, -1 if the event is not within the day", assert => {
        const eventBeforeDay = {
            startDate: "2024-06-24T22:00:00Z",
            endDate: "2024-06-24T22:30:00Z"
        };

        const eventAfterDay = {
            startDate: "2024-06-26T00:00:00Z",
            endDate: "2024-06-26T01:00:00Z"
        };

        const resultBeforeDay = day.findPosition(eventBeforeDay);
        assert.equal(resultBeforeDay.start, -1);
        assert.equal(resultBeforeDay.end, -1);

        const resultAfterDay = day.findPosition(eventAfterDay);
        assert.equal(resultAfterDay.start, -1);
        assert.equal(resultAfterDay.end, -1);
    });

    test("should return correct positions for events starting at every hour with 00 minutes", assert => {
        const hoursWithZeroMinutes = Array.from({ length: 24 }, (_, hour) => ({
            startDate: `2024-06-25T${String(hour).padStart(2, '0')}:00:00Z`,
            endDate: `2024-06-25T${String(hour + 1).padStart(2, '0')}:00:00Z`,
            startPosition: hour * 4,
            expectedEndPosition: (hour + 1) * 4
        }));


        hoursWithZeroMinutes.forEach(({ startDate, endDate, startPosition, expectedEndPosition }) => {
            const { start, end } = day.findPosition({ startDate, endDate });

            assert.equal(start, startPosition);
            assert.equal(end, expectedEndPosition);
        });
    });

    test("should return correct positions for events starting at every 15-minute interval within one hour", assert => {
        const baseHour = "2024-06-25T10:00:00Z";

        const positions = Array.from({ length: 4 }, (_, index) => ({
            minutes: index * 15,
            startPosition: Math.floor((10 * 60 + index * 15) / MINUTES_IN_SUBDIVISION),
            expectedEndPosition: Math.floor((10 * 60 + index * 15 + 15) / MINUTES_IN_SUBDIVISION)
        }));

        positions.forEach(({ minutes, startPosition, expectedEndPosition }) => {
            const startDate = new Date(baseHour);
            const endDate = new Date(baseHour);
            startDate.setUTCMinutes(minutes);
            endDate.setUTCMinutes(minutes + 15);
            const { start, end } = day.findPosition({ startDate, endDate });
            assert.equal(start, startPosition);
            assert.equal(end, expectedEndPosition);
        });
    });

    test("should return correct positions for events starting at specific minutes within one hour", assert => {
        const events = [
            { startDate: "2024-06-25T00:05:00Z", endDate: "2024-06-25T00:15:00Z", expectedStart: 0, expectedEnd: 1 },
            { startDate: "2024-06-25T00:21:00Z", endDate: "2024-06-25T00:30:00Z", expectedStart: 1, expectedEnd: 2 },
            { startDate: "2024-06-25T00:33:00Z", endDate: "2024-06-25T00:45:00Z", expectedStart: 2, expectedEnd: 3 },
            { startDate: "2024-06-25T10:42:00Z", endDate: "2024-06-25T10:55:00Z", expectedStart: 42, expectedEnd: 43 }
        ];

        events.forEach(({ startDate, endDate, expectedStart, expectedEnd }) => {
            const { start, end } = day.findPosition({ startDate, endDate });
            assert.equal(start, expectedStart);
            assert.equal(end, expectedEnd);
        });
    });

    test("should return 96 if the end date exceeds the current day", assert => {
        const event = {
            startDate: "2024-06-25T23:30:00Z",
            endDate: "2024-06-26T00:15:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 94);
        assert.equal(end, 96);
    });

    test("should return correct positions for events beginning from the previous day to the current day", assert => {
        const event = {
            startDate: "2024-06-24T22:00:00Z",
            endDate: "2024-06-25T02:00:00Z",
            startPosition: 0, 
            endPosition: 8    
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, event.startPosition);
        assert.equal(end, event.endPosition);
    });

    test("should return correct positions for an event covering the current day", assert => {
        const event = {
            startDate: "2024-06-24T00:00:00Z",
            endDate: "2024-06-26T00:00:00Z",
            expectedStartPosition: 0,
            expectedEndPosition: 96
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, event.expectedStartPosition);
        assert.equal(end, event.expectedEndPosition);
    });
});