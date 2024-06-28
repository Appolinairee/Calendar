const testDate = new Date("2024-06-25");

module('findEDayStartPosition', () => {
    test("should return (-1, -1) when event is not in dayEvents.", assert => {
        const event = { id: 1, startDate: new Date("2024-05-26T10:00:00Z") };
        const day = new Day({ date: testDate, events: [event] });

        const position = day.findEDayStartPosition(event);
        assert.deepEqual(position, { x: -1, y: -1 });
    });

    test("should return (0,0) for one event starting at the beginning of the day.", assert => {
        const event = { id: 1, startDate: new Date("2024-06-25T00:00:00Z") };
        const day = new Day({ date: testDate, events: [event] });
        const position = day.findEDayStartPosition(event);
        assert.deepEqual(position, { x: 0, y: 0 });
    });

    test("should return (40, 0) for event starting at 10:00", assert => {
        const event = { id: 1, startDate: new Date("2024-06-25T10:00:00Z"), endDate: new Date("2024-06-25T10:15:00Z") };
        const day = new Day({ date: testDate, events: [event] });

        const position = day.findEDayStartPosition(event);
        assert.deepEqual(position, { x: 40, y: 0 });
    });

    test("should return (40, 0) for event starting at 10:14", assert => {
        const event = { id: 1, startDate: new Date("2024-06-25T10:14:00Z"), endDate: new Date("2024-06-25T10:29:00Z") };
        const day = new Day({ date: testDate, events: [event] });

        const position = day.findEDayStartPosition(event);
        assert.deepEqual(position, { x: 40, y: 0 });
    });

    test("should return the same x-position and different y-position for two events starting at the same time", assert => {
        const event1 = { id: 1, startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T12:15:00Z") };
        const event2 = { id: 2, startDate: new Date("2024-06-25T12:00:00Z"), endDate: new Date("2024-06-25T12:30:00Z") };
        const day = new Day({ date: testDate, events: [event1, event2] });

        const position1 = day.findEDayStartPosition(event1);
        const position2 = day.findEDayStartPosition(event2);

        assert.deepEqual(position1, { x: 48, y: 0 });
        assert.deepEqual(position2, { x: 48, y: 1 });
    });

    test("should return correct positions for two events overlapping partially", assert => {
        const event1 = { id: 1, startDate: new Date("2024-06-25T14:00:00Z"), endDate: new Date("2024-06-25T14:30:00Z") };
        const event2 = { id: 2, startDate: new Date("2024-06-25T14:15:00Z"), endDate: new Date("2024-06-25T14:45:00Z") };
        const day = new Day({ date: testDate, events: [event1, event2] });

        const position1 = day.findEDayStartPosition(event1);
        const position2 = day.findEDayStartPosition(event2);

        assert.deepEqual(position1, { x: 56, y: 0 });
        assert.deepEqual(position2, { x: 57, y: 1 });
    });

    test("should return correct positions for three events with partial overlaps", assert => {
        const event1 = { id: 1, startDate: new Date("2024-06-25T14:00:00Z"), endDate: new Date("2024-06-25T14:30:00Z") };
        const event2 = { id: 2, startDate: new Date("2024-06-25T14:15:00Z"), endDate: new Date("2024-06-25T14:45:00Z") };
        const event3 = { id: 3, startDate: new Date("2024-06-25T14:25:00Z"), endDate: new Date("2024-06-25T14:55:00Z") };
        const day = new Day({ date: testDate, events: [event1, event2, event3] });

        const position1 = day.findEDayStartPosition(event1);
        const position2 = day.findEDayStartPosition(event2);
        const position3 = day.findEDayStartPosition(event3);

        assert.deepEqual(position1, { x: 56, y: 0 });
        assert.deepEqual(position2, { x: 57, y: 1 });
        assert.deepEqual(position3, { x: 57, y: 2 });
    });

    test("should return correct positions for three events with mixed overlaps", assert => {
        const event1 = { id: 1, startDate: new Date("2024-06-25T14:00:00Z"), endDate: new Date("2024-06-25T14:30:00Z") };
        const event2 = { id: 2, startDate: new Date("2024-06-25T14:15:00Z"), endDate: new Date("2024-06-25T14:45:00Z") };
        const event3 = { id: 3, startDate: new Date("2024-06-25T14:00:00Z"), endDate: new Date("2024-06-25T14:50:00Z") };
        const day = new Day({ date: testDate, events: [event1, event2, event3] });

        const position1 = day.findEDayStartPosition(event1);
        const position2 = day.findEDayStartPosition(event2);
        const position3 = day.findEDayStartPosition(event3);

        assert.deepEqual(position1, { x: 56, y: 0 });
        assert.deepEqual(position2, { x: 57, y: 2 });
        assert.deepEqual(position3, { x: 56, y: 1 });
    });

    // test("should return correct positions for three events with one overlapping both", assert => {
    //     const event1 = { id: 1, startDate: new Date("2024-06-25T14:00:00Z"), endDate: new Date("2024-06-25T14:30:00Z") };
    //     const event2 = { id: 2, startDate: new Date("2024-06-25T14:30:00Z"), endDate: new Date("2024-06-25T14:45:00Z") };
    //     const event3 = { id: 3, startDate: new Date("2024-06-25T14:00:00Z"), endDate: new Date("2024-06-25T15:00:00Z") };
    //     const day = new Day({ date: testDate, events: [event1, event2, event3] });

    //     const position1 = day.findEDayStartPosition(event1);
    //     const position2 = day.findEDayStartPosition(event2);
    //     const position3 = day.findEDayStartPosition(event3);

    //     assert.deepEqual(position1, { x: 56, y: 0 }, "Position should be { x: 56, y: 0 } for event1");
    //     assert.deepEqual(position2, { x: 58, y: 0 }, "Position should be { x: 57, y: 1 } for event2");
    //     assert.deepEqual(position3, { x: 56, y: 1 }, "Position should be { x: 56, y: 2 } for event3");
    // });
});