module('constructor', () => {
    test("when date parameter is provided and is not a Date object, it should throw an exception", assert => {
        assert.throws(() => {
            new Day({ date: "Hello", events: [] });
        }, new Error(DateParamError));
    });

    test("when events parameter is not provided, throw an exception", assert => {
        assert.throws(() => {
            new Day();
        }, new Error(EventsParamError));
    });

    test("when events parameter is provided and is not an array, it should throw an exception", assert => {
        assert.throws(() => {
            new Day({ events: "Events" });
        }, new Error(EventsParamError));
    });

    test("when date parameter is provided and is a Date object, date attribute should be that date", assert => {
        const date = new Date("2023-06-25T10:00:00Z");
        const day = new Day({ date, events: [{}] });
        assert.equal(day.date.toISOString(), date.toISOString());
    });

    test("when events parameter is provided and is not an array of objects, it should throw an exception", assert => {
        assert.throws(() => {
            new Day({ events: ["", ""] });
        }, new Error(EventsParamError));
    });

    test("when events parameter is provided and is an array, it should be assigned to events", assert => {
        const events = [{ title: 'Event 1' }, { title: 'Event 2' }];
        const day = new Day({ events });
        assert.equal(JSON.stringify(day.events), JSON.stringify(events));
    });
});


const testDate2 = new Date("2024-06-25");

module('isCurrentDayEvent', () => {
    test("should return false when event startDate or endDate are not valid ISO dates", assert => {
        const event1 = { name: 'Event 1', startDate: "Invalid Date", endDate: new Date().toISOString() };
        const event2 = { name: 'Event 2', startDate: new Date().toISOString(), endDate: "Invalid Date" };

        const day = new Day({ date: testDate2, events: [] });

        assert.equal(day.isCurrentDayEvent(event1), false);
        assert.equal(day.isCurrentDayEvent(event2), false);
    });

    test("should return false when event startDate is not for the specific day", assert => {
        const event = { name: 'Event 1', startDate: "2024-06-24T10:00:00Z", endDate: "2024-06-24T11:00:00Z" };

        const day = new Day({ date: testDate2, events: [] });

        assert.equal(day.isCurrentDayEvent(event), false);
    });

    test("should return false when event endDate is before startDate", assert => {
        const event = { name: 'Event 1', startDate: "2024-06-24T10:00:00Z", endDate: "2024-06-24T09:00:00Z" };

        const day = new Day({ date: testDate2, events: [] });

        assert.equal(day.isCurrentDayEvent(event), false);
    });

    test("should return true when event startDate and endDate are valid and for the specific day", assert => {
        const event = { name: 'Event 1', startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };

        const day = new Day({ date: testDate2, events: [] });

        assert.equal(day.isCurrentDayEvent(event), true);
    });

    test("should return true when event startDate is provided and is for specific day and endDate is missing", assert => {
        const event = { name: 'Event 1', startDate: "2024-06-25T10:00:00Z" };

        const day = new Day({ date: testDate2, events: [] });

        assert.equal(day.isCurrentDayEvent(event), true);
    });
});