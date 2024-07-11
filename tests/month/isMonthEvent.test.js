module('constructor', () => {
    test("should throw an exception when date parameter is provided and is not a Date object", assert => {
        assert.throws(() => {
            new Month({ date: "Hello", events: [] });
        }, new Error(DateParamError));
    });

    test("should default to current month if date parameter is not provided", assert => {
        const now = new Date();
        const month = new Month({ events: [{}] });

        assert.equal(month.date.getFullYear(), now.getFullYear());
        assert.equal(month.date.getMonth(), now.getMonth());
    });


    test("should throw an exception when events parameter is not provided", assert => {
        assert.throws(() => {
            new Month();
        }, new Error(EventsParamError));
    });

    test("should throw an exception when events parameter is provided and is not an array of objects", assert => {
        assert.throws(() => {
            new Month({ events: ["", ""] });
        }, new Error(EventsParamError));
    });

    test("should set date attribute to provided Date object when date parameter is provided", assert => {
        const date = new Date("2023-06-01T10:00:00Z");
        const month = new Month({ date, events: [{}] });
        assert.equal(month.date.toISOString(), date.toISOString());
    });

    test("should assign provided array of objects to events parameter", assert => {
        const events = [{ title: 'Event 1' }, { title: 'Event 2' }];
        const month = new Month({ events });
        assert.deepEqual(month.events, events);
    });
});


module('isMonthEvent', () => {
    const testDate = new Date("2024-06-25");
    const month = new Month({
        date: testDate, events: []
    });

    test("should return false when event startDate or endDate are not valid ISO dates", assert => {
        const event1 = { startDate: "Invalid Date", endDate: new Date().toISOString() };
        const event2 = { name: 'Event 2', startDate: new Date().toISOString(), endDate: "Invalid Date" };

        assert.equal(month.isMonthEvent(event1), false);
        assert.equal(month.isMonthEvent(event2), false);
    });

    test("should return false when event startDate is after the end of the month", assert => {
        const event = { startDate: "2024-07-01T10:00:00Z", endDate: "2024-07-01T12:00:00Z" };

        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return false when event endDate is before the start of the month", assert => {
        const event = { startDate: "2024-05-01T10:00:00Z", endDate: "2024-05-01T12:00:00Z" };

        assert.equal(month.isMonthEvent(event), false);
    });

    test("should return true when event starts and ends within the current month", assert => {
        const event = { startDate: "2024-06-15T10:00:00Z", endDate: "2024-06-15T12:00:00Z" };

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

    test("should return true when event starts within the current month and has no end date", assert => {
        const event = { startDate: "2024-06-15T08:00:00Z" };
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
