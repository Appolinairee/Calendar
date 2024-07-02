const testDate3 = new Date("2024-06-25");

module('fillcases', () => {

    test("should not fill into cases an event which is not for current day", assert => {
        const event = { id: 2, startDate: "2024-06-26T00:00:00Z", endDate: "2024-06-27T00:00:00Z" };
        const day = new Day({ date: testDate3, events: [event] });

        day.fillCases();

        const cases = day.cases;

        let result = 0;
        for (let i = 0; i < 96; i++) {
            for (let j = 0; j < 4; j++) {
                if (cases[i][j] != null) {
                    result = 1;
                    break;
                }
            }
        }

        assert.equal(result, 0);
    });

    test("should correctly position a single 15-minute event in the grid", assert => {
        const event = { id: 1, startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:15:00Z" };
        const day = new Day({ date: testDate3, events: [event] });

        day.fillCases();

        console.log(day.findPosition(event.startDate), day.findPosition(event.endDate))

        const cases = day.cases;
        assert.equal(cases[40][0], 1);
        assert.equal(cases[41][0], null);
    });

    test("should correctly position a single 30-minute event in the grid", assert => {
        const event = { id: 1, startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
        const day = new Day({ date: testDate3, events: [event] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[40][0], 1);
        assert.equal(cases[41][0], 1);
        assert.equal(cases[42][0], null);
    });

    test("should correctly position an event starting at the beginning of the day", assert => {
        const event = { id: 1, startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:15:00Z" };
        const day = new Day({ date: testDate3, events: [event] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[0][0], 1);
        assert.equal(cases[1][0], null);
    });

    test("should correctly position an event ending at the end of the day", assert => {
        const event = { id: 1, startDate: "2024-06-25T23:45:00Z", endDate: "2024-06-26T00:00:00Z" };
        const day = new Day({ date: testDate3, events: [event] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[95][0], 1);
        assert.equal(cases[94][0], null);
    });

    test("should correctly position an event crossing multiple hours", assert => {
        const event = { id: 1, startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T12:00:00Z" };
        const day = new Day({ date: testDate3, events: [event] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[42][0], 1);
        assert.equal(cases[43][0], 1);
        assert.equal(cases[44][0], 1);
        assert.equal(cases[45][0], 1);
        assert.equal(cases[46][0], 1);
        assert.equal(cases[47][0], 1);
    });

    test("should correctly position an event within an hour but not aligned to 15-minute slots", assert => {
        const event = { id: 1, startDate: "2024-06-25T10:10:00Z", endDate: "2024-06-25T10:40:00Z" };
        const day = new Day({ date: testDate3, events: [event] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[40][0], 1);
        assert.equal(cases[41][0], 1);
        assert.equal(cases[42][0], 1);
        assert.equal(cases[43][0], null);
    });

    test("should correctly position two events that partially overlap", assert => {
        const event1 = { id: 1, startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
        const event2 = { id: 2, startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:45:00Z" };
        const day = new Day({ date: testDate3, events: [event1, event2] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[40][0], 1);
        assert.equal(cases[41][0], 1);
        assert.equal(cases[41][1], 2);
        assert.equal(cases[42][1], 2);
        assert.equal(cases[43][1], null);
    });

    test("should correctly position two events that completely overlap", assert => {
        const event1 = { id: 1, startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
        const event2 = { id: 2, startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
        const day = new Day({ date: testDate3, events: [event1, event2] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[40][0], 1);
        assert.equal(cases[40][1], 2);
        assert.equal(cases[41][0], 1);
        assert.equal(cases[41][1], 2);
        assert.equal(cases[42][0], null);
        assert.equal(cases[42][1], null);
    });

    test("should correctly position three events with partial overlaps", assert => {
        const event1 = { id: 1, startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
        const event2 = { id: 2, startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:45:00Z" };
        const event3 = { id: 3, startDate: "2024-06-25T10:20:00Z", endDate: "2024-06-25T10:50:00Z" };
        const day = new Day({ date: testDate3, events: [event1, event2, event3] });

        day.fillCases();

        const cases = day.cases;
        assert.equal(cases[40][0], 1);
        assert.equal(cases[41][0], 1);
        assert.equal(cases[41][1], 2);
        assert.equal(cases[42][1], 2);
        assert.equal(cases[42][2], 3);
        assert.equal(cases[43][2], 3);
        assert.equal(cases[44][2], null);
    });
})