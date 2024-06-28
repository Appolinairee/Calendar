module('constructor', () => {
    test("when date parameter is not provided, date attribute should be today", assert => {
        const day = new Day();
        const now = new Date();
        assert.equal(day.date.toISOString().slice(0, 10), now.toISOString().slice(0, 10));
    });

    test("when events parameter is not provided, events should be empty", assert => {
        const day = new Day();
        assert.equal(JSON.stringify(day.events), JSON.stringify([]));
    });

    test("when date parameter is provided and is not Date object type, date attribute should be today", assert => {
        const day = new Day({ date: "Hello" });
        const now = new Date();
        assert.equal(day.date.toISOString().slice(0, 10), now.toISOString().slice(0, 10));
    });

    test("when date parameter is provided and is a Date object, date attribute should be that date", assert => {
        const date = new Date("2023-06-25T10:00:00Z");
        const day = new Day({ date });
        assert.equal(day.date.toISOString(), date.toISOString());
    });

    test("when events parameter is provided and is not an array, events should be empty", assert => {
        const day = new Day({ events: "Events" });
        assert.equal(JSON.stringify(day.events), JSON.stringify([]));
    });

    test("when events parameter is provided and is not an array of objects, events should be empty", assert => {
        const day = new Day({ events: ["", ""] });
        assert.equal(day.events.length, 0);
    });

    test("when events parameter is provided and is an array, it should be assigned to events", assert => {
        const events = [{ title: 'Event 1' }, { title: 'Event 2' }];
        const day = new Day({ events });
        assert.equal(JSON.stringify(day.events), JSON.stringify(events));
    });
});

module('findDayEvents', () => {
    test("when events attribute is empty, dayEvents should be empty", assert => {
        const day = new Day();
        day.findDayEvents();
        assert.equal(day.dayEvents.length, 0);
    });

    test("when an event type is not object, it should not be in dayEvents", assert => {
        const events = ["Invalid Event"];
        const day = new Day({ events });
        day.findDayEvents();
        const includesInvalidEvent = day.dayEvents.some(event => event === "Invalid Event");
        assert.notOk(includesInvalidEvent);
    });

    test("when dates for some events are valid and this event is for the current day, it should be in dayEvents", assert => {
        const currentDate = new Date();
        const events = [
            { name: 'Event 1', startDate: currentDate.toISOString(), endDate: new Date(currentDate.getTime() + 3600000) }
        ];

        const day = new Day({ events });
        day.findDayEvents();
        assert.equal(JSON.stringify(day.dayEvents), JSON.stringify(events));
    });

    test("when startDate only is provided and is in valid ISO format for some event, the endDate should be the end of its day if it's for the current day", assert => {
        const currentDate = new Date();
        const events = [{ name: 'Event 1', startDate: currentDate.toISOString() }];
        const day = new Day({ events });
        day.findDayEvents();

        const eventInDayEvents = day.dayEvents.find(event => event.name === events[0].name);

        const expectedEndDate = new Date(currentDate);
        expectedEndDate.setHours(24, 59, 59, 0); //to fix in UTC

        const eventEndDateLocal = new Date(eventInDayEvents.endDate);

        assert.equal(eventEndDateLocal.toISOString(), expectedEndDate.toISOString());
    });

    test("when endDate is not provided but startDate is valid and for the day, the event should be in dayEvents", assert => {
        const currentDate = new Date();
        const events = [{ name: 'Event 1', startDate: currentDate.toISOString() }];
        const day = new Day({ events });
        day.findDayEvents();
        assert.equal(JSON.stringify(day.dayEvents[0]), JSON.stringify(events[0]));
    });

    test("when startDate and endDate are not provided or are not in valid ISO format for some event, it should not be in dayEvents", assert => {
        const events = [{ name: 'Event 1' }, { name: 'Event 2', startDate: "Invalid Date" }];
        const day = new Day({ events });
        day.findDayEvents();
        assert.equal(day.dayEvents.length, 0);
    });

    test("when endDate is before startDate, the event should not be in dayEvents", assert => {
        const currentDate = new Date();
        const events = [{ name: 'Event 1', startDate: currentDate.toISOString(), endDate: new Date(currentDate.getTime() - 3600000).toISOString() }];
        const day = new Day({ events });
        day.findDayEvents();

        assert.equal(day.dayEvents.length, 0);
    });
});


module('getEndOfDay', () => {
    test("should return the end of the day in ISO format", assert => {
        const day = new Day();
        const date = new Date("2024-06-25T10:00:00Z");
        const expectedEndDate = "2024-06-25T23:59:59.000Z";

        assert.equal(day.getEndOfDay(date), expectedEndDate);
    });

    test("should handle date objects without time component", assert => {
        const day = new Day();
        const date = new Date("2024-06-25");
        const expectedEndDate = "2024-06-25T23:59:59.000Z";

        assert.equal(day.getEndOfDay(date), expectedEndDate);
    });
});


module('isSameDay', () => {
    test("should return true for the same day", assert => {
        const day = new Day();
        const date1 = new Date("2024-06-25T10:00:00Z");
        const date2 = new Date("2024-06-25T20:00:00Z");

        assert.ok(day.isSameDay(date1, date2), "Dates on the same day should return true");
    });

    test("should return false for different days", assert => {
        const day = new Day();
        const date1 = new Date("2024-06-25T23:59:59Z");
        const date2 = new Date("2024-06-26T00:00:00Z");

        assert.notOk(day.isSameDay(date1, date2));
    });
});