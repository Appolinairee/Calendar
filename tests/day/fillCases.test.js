module('fillcases', () => {

    function isInSomeCase(cases, event) {
        return cases.flat().some(caseEvent => caseEvent === event);
    }

    test('should not fill into cases an event which is not for current day', assert => {
        const event = { startDate: "2024-06-26T00:00:00Z", endDate: "2024-06-27T00:00:00Z" };
        const testDate = new Date("2024-06-25T00:00:00Z");
        const day = new Day({ date: testDate, events: [event] });

        day.fillCases();

        const cases = day.cases;

        assert.equal(isInSomeCase(cases, event), false);
    });

    module("Single event", () => {

        test("should correctly position a single 15-minute event in the grid", assert => {
            const event = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:15:00Z" };
            const testDate = new Date("2024-06-25T00:00:00Z");
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            const cases = day.cases;
            assert.deepEqual(cases[40][0], event);
            assert.equal(cases[41][0], null);
        });

        test("should correctly position a single 30-minute event in the grid", assert => {
            const event = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event);
            assert.equal(cases[41][0], event);
            assert.equal(cases[42][0], null);
        });

        test("should correctly position an event starting at the beginning of the day", assert => {
            const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:15:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[0][0], event);
            assert.equal(cases[1][0], null);
        });

        test("should correctly position an event ending at the end of the day", assert => {
            const event = { startDate: "2024-06-25T23:45:00Z", endDate: "2024-06-26T00:00:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[95][0], event);
            assert.equal(cases[94][0], null);
        });

        test("should correctly position an event crossing multiple hours", assert => {
            const event = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T12:00:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[42][0], event);
            assert.equal(cases[43][0], event);
            assert.equal(cases[44][0], event);
            assert.equal(cases[45][0], event);
            assert.equal(cases[46][0], event);
            assert.equal(cases[47][0], event);
        });

        test("should correctly position an event within an hour but not aligned to 15-minute slots", assert => {
            const event = { startDate: "2024-06-25T10:10:00Z", endDate: "2024-06-25T10:40:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event);
            assert.equal(cases[41][0], event);
            assert.equal(cases[42][0], event);
            assert.equal(cases[43][0], null);
        });

        test("should correctly position an event with a very short duration (less than 15 minutes)", assert => {
            const event = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:05:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            assert.equal(day.cases[40][0], event);
            assert.equal(day.cases[41][0], null);
        });

        test("should fill an event covering multiple days including the current day", assert => {
            const event = { startDate: "2024-06-24T12:00:00Z", endDate: "2024-06-26T12:00:00Z" };
            const testDate = new Date("2024-06-25T00:00:00Z");
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            const cases = day.cases;

            for (let i = 0; i < 96; i++) {
                assert.equal(cases[i][0], event);
            }
        });

        test("should fill an event starting the current day and ending the next day", assert => {
            const event = { startDate: "2024-06-25T22:00:00Z", endDate: "2024-06-26T01:00:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            for (let i = 88; i < 96; i++) {
                assert.equal(day.cases[i][0], event);
            }
        });

        test("should fill an event starting the previous day and ending the current day", assert => {
            const event = { startDate: "2024-06-24T23:00:00Z", endDate: "2024-06-25T00:45:00Z" };
            const day = new Day({ date: testDate, events: [event] });

            day.fillCases();

            assert.equal(day.cases[0][0], event);
            assert.equal(day.cases[1][0], event);
            assert.equal(day.cases[2][0], event);
        });
    });


    module("Two events", () => {
        test("should correctly position two events that partially overlap", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:45:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][1], event2);
            assert.equal(cases[43][1], null);
        });

        test("should correctly position two events that completely overlap", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[40][1], event2);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][0], null);
            assert.equal(cases[42][1], null);
        });

        test("should correctly position an event entirely within another event", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T11:00:00Z" };
            const event2 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:45:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][0], event1);
            assert.equal(cases[42][1], event2);
            assert.equal(cases[43][0], event1);
            assert.equal(cases[43][1], null);
        });

        test("should correctly position events with durations that are not multiples of 15 minutes", assert => {
            const event1 = { startDate: "2024-06-25T09:50:00Z", endDate: "2024-06-25T10:35:00Z" };
            const event2 = { startDate: "2024-06-25T10:10:00Z", endDate: "2024-06-25T10:55:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[39][0], event1);
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][0], event1);
            assert.equal(cases[42][1], event2);
            assert.equal(cases[43][1], event2);
        });

        test("should correctly position two events with a small interval between them", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:35:00Z", endDate: "2024-06-25T11:05:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[42][0], event2);
            assert.equal(cases[43][0], event2);
            assert.equal(cases[44][0], event2);
            assert.equal(cases[45][0], null);
        });

    })

    module("Three events", () => {
        test("should correctly position three events with partial overlaps", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:45:00Z" };
            const event3 = { startDate: "2024-06-25T10:20:00Z", endDate: "2024-06-25T10:50:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2, event3] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][1], event2);
            assert.equal(cases[42][2], event3);
            assert.equal(cases[43][2], event3);
            assert.equal(cases[44][2], null);
        });

        test("should correctly position three events that completely overlap", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event3 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2, event3] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[40][1], event2);
            assert.equal(cases[40][2], event3);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[41][2], event3);
            assert.equal(cases[42][0], null);
            assert.equal(cases[42][1], null);
            assert.equal(cases[42][2], null);
        });

        test("should correctly position three events that absorb each other completely", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T11:00:00Z" };
            const event2 = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T10:45:00Z" };
            const event3 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:45:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2, event3] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[41][2], event3);
            assert.equal(cases[42][0], event1);
            assert.equal(cases[42][1], event2);
            assert.equal(cases[42][2], event3);
            assert.equal(cases[43][0], event1);
        });
    });

    module("Four events", () => {
        test("should correctly position four events with varying degrees of overlap, ignoring the fourth event", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:45:00Z" };
            const event2 = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T11:15:00Z" };
            const event3 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event4 = { id: 4, startDate: "2024-06-25T10:45:00Z", endDate: "2024-06-25T11:30:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2, event3, event4] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[42][0], event1);

            assert.equal(cases[42][1], event2);
            assert.equal(cases[43][1], event2);
            assert.equal(cases[44][1], event2);

            assert.equal(cases[41][1], event3);
            assert.equal(cases[41][1], event3);
            assert.equal(cases[41][2], null);

            assert.equal(cases[43][0], event4);
            assert.equal(cases[44][0], event4);
            assert.equal(cases[45][0], event4);
            assert.equal(cases[46][0], null);
        });


        test("should correctly position three overlapping events on the same line and ignore the fourth event", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:45:00Z" };
            const event2 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T11:00:00Z" };
            const event3 = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T11:15:00Z" };
            const event4 = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T11:00:00Z" };

            const day = new Day({ date: testDate, events: [event1, event2, event3, event4] });

            day.fillCases();

            const cases = day.cases;

            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);
            assert.equal(cases[42][0], event1);

            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][1], event2);
            assert.equal(cases[43][1], event2);

            assert.equal(cases[42][2], event3);
            assert.equal(cases[43][2], event3);
            assert.equal(cases[44][2], event3);

            assert.equal(isInSomeCase(day.cases, event4), false);
        });
    });

    module("Five events", () => {
        test("should correctly position five overlapping events without ignoring any", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T10:45:00Z" };
            const event3 = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T11:00:00Z" };
            const event4 = { startDate: "2024-06-25T10:40:00Z", endDate: "2024-06-25T11:10:00Z" };
            const event5 = { startDate: "2024-06-25T10:50:00Z", endDate: "2024-06-25T11:20:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2, event3, event4, event5] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);

            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][1], event2);

            assert.equal(cases[42][0], event3);
            assert.equal(cases[43][0], event3);

            assert.equal(cases[43][1], event5);
            assert.equal(cases[44][1], event5);
            assert.equal(cases[45][1], event5);

            assert.equal(cases[43][2], event4);
            assert.equal(cases[44][2], event4);
        });

        test("should correctly position four events and ignore the fifth event", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:10:00Z", endDate: "2024-06-25T10:40:00Z" };
            const event3 = { startDate: "2024-06-25T10:20:00Z", endDate: "2024-06-25T10:50:00Z" };
            const event4 = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T11:00:00Z" };
            const event5 = { startDate: "2024-06-25T10:40:00Z", endDate: "2024-06-25T11:10:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2, event3, event4, event5] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);

            assert.equal(cases[40][1], event2);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][1], event2);

            assert.equal(cases[41][2], event3);
            assert.equal(cases[42][2], event3);
            assert.equal(cases[43][2], event3);

            assert.equal(cases[42][0], event4);
            assert.equal(cases[43][0], event4);
            assert.equal(cases[44][0], null);

            assert.equal(isInSomeCase(day.cases, event5), false);
        });


        test("should handle placing five events on the same line and ignore the last two", assert => {
            const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
            const event2 = { startDate: "2024-06-25T10:10:00Z", endDate: "2024-06-25T10:40:00Z" };
            const event3 = { startDate: "2024-06-25T10:20:00Z", endDate: "2024-06-25T10:50:00Z" };
            const event4 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T11:00:00Z" };
            const event5 = { startDate: "2024-06-25T10:15:00Z", endDate: "2024-06-25T11:10:00Z" };
            const day = new Day({ date: testDate, events: [event1, event2, event3, event4, event5] });

            day.fillCases();

            const cases = day.cases;
            assert.equal(cases[40][0], event1);
            assert.equal(cases[41][0], event1);

            assert.equal(cases[40][1], event2);
            assert.equal(cases[41][1], event2);
            assert.equal(cases[42][1], event2);

            assert.equal(cases[41][2], event3);
            assert.equal(cases[42][2], event3);
            assert.equal(cases[43][2], event3);

            assert.equal(isInSomeCase(day.cases, event4), false);
            assert.equal(isInSomeCase(day.cases, event5), false);
        });


    })
})