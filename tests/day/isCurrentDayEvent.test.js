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

    test("when date parameter is provided, hours, minutes, and seconds should be set to 0", assert => {
        const date = new Date("2023-06-25T10:30:15Z");
        const day = new Day({ date, events: [{}] });

        assert.equal(day.date.getHours(), 0);
        assert.equal(day.date.getMinutes(), 0);
        assert.equal(day.date.getSeconds(), 0);
    });
});


const day2 = new Day({ date: testDate, events: [] });

module('isCurrentDayEvent', () => {
    test("should return false when event startDate or endDate are not valid ISO dates", assert => {
        const event1 = { startDate: "Invalid Date", endDate: new Date().toISOString() };
        const event2 = { name: 'Event 2', startDate: new Date().toISOString(), endDate: "Invalid Date" };

        assert.equal(day2.isCurrentDayEvent(event1), false);
        assert.equal(day2.isCurrentDayEvent(event2), false);
    });

    test("should return false when event startDate is not for the specific day", assert => {
        const event = { startDate: "2024-06-24T10:00:00Z", endDate: "2024-06-24T11:00:00Z" };

        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return false when event endDate is before startDate", assert => {
        const event = { startDate: "2024-06-24T10:00:00Z", endDate: "2024-06-24T09:00:00Z" };

        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    test("should return true when event startDate and endDate are valid and for the specific day", assert => {
        const event = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };

        assert.equal(day2.isCurrentDayEvent(event), true);
    });

    test("should return true when event startDate is provided and is for specific day and endDate is missing", assert => {
        const event = { startDate: "2024-06-25T10:00:00Z" };

        assert.equal(day2.isCurrentDayEvent(event), true);
    });


    test("should return true when event covers the entire current day (starts before and ends after)", assert => {
        const event = {
            startDate: "2024-06-24T00:00:00Z",
            endDate: "2024-06-26T00:00:00Z"
        };

        assert.equal(day2.isCurrentDayEvent(event), true);
    });

    test("should return true when event starts on the day and ends on the one following", assert => {
        const event = {
            startDate: "2024-06-25T22:00:00Z",
            endDate: "2024-06-26T00:00:00Z"
        };

        assert.equal(day2.isCurrentDayEvent(event), true);
    });

    test("should return true when event starts on the previous day and ends on the current day", assert => {
        const event = {
            startDate: "2024-06-24T22:00:00Z",  
            endDate: "2024-06-24T23:00:00Z"
        };

        assert.equal(day2.isCurrentDayEvent(event), false);
    });

    
});