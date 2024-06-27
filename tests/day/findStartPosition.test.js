module('findEDayStartPosition', () => {
    test("should return 0 for event starting at the beginning of the day.", assert => {
        const day = new Day();
        const event = { startDate: new Date("2024-06-25T00:00:00Z") };

        const position = day.findEDayStartPosition(event);

        assert.equal(position, 0, "Position should be 0 for event starting at the beginning of the day");
    });

    test("should return 40 for event starting at 10:00", assert => {
        const day = new Day();
        const event = { startDate: new Date("2024-06-25T10:00:00Z"), endDate: new Date("2024-06-25T10:15:00Z") };

        const position = day.findEDayStartPosition(event);

        assert.equal(position, 40, "Position should be 40 for event starting at 10:00");
    });

    test("should return 40 for event starting at 10:14", assert => {
        const day = new Day();
        const event = { startDate: new Date("2024-06-25T10:14:00Z"), endDate: new Date("2024-06-25T10:29:00Z") };

        const position = day.findEDayStartPosition(event);

        assert.equal(position, 40, "Position should be 40 for event starting at 10:14");
    });

    test("should return the same position for multiple events starting at the same time", assert => {
        const day = new Day();
        const event1 = { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T12:15:00Z") };
        const event2 = { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T12:30:00Z") };

        const position1 = day.findEDayStartPosition(event1);
        const position2 = day.findEDayStartPosition(event2);

        assert.equal(position1, position2, "Events starting at the same time should have the same position");
    });

    test("should return correct positions for events overlapping partially", assert => {
        const day = new Day();
        const event1 = { startDate: new Date("2024-06-25T14:00:00Z"), endDate: new Date("2024-06-25T14:30:00Z") };
        const event2 = { startDate: new Date("2024-06-25T14:15:00Z"), endDate: new Date("2024-06-25T14:45:00Z") };

        const position1 = day.findEDayStartPosition(event1);
        const position2 = day.findEDayStartPosition(event2);

        assert.notEqual(position1, position2, "Events overlapping should have different positions");
    });

    const events = [
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T12:15:00Z") },
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T12:30:00Z") },
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T12:45:00Z") },
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T13:00:00Z") },
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T13:15:00Z") },
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T13:30:00Z") },
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T13:45:00Z") },
        { startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T14:00:00Z") }
    ];

    test("should mark event as hidden if it is on the same line as more than 6 events", assert => {
        const day = new Day();

        const hiddenEvents = events.map(event => {
            const position = day.findEDayStartPosition(event);
            return position >= 6 ? event : null;
        }).filter(event => event !== null);

        assert.equal(hiddenEvents.length, 1, "One event should be marked as hidden");
    });
});