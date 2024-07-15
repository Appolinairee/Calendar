module('fillcases', () => {

    function areAllCasesEmpty(cases, excludedCases = []) {
        const excludedSet = new Set(excludedCases.map(([row, col]) => `${row},${col}`));

        for (let i = 0; i < cases.length; i++) {
            for (let j = 0; j < cases[i].length; j++) {
                if (!excludedSet.has(`${i},${j}`) && cases[i][j] !== null) {
                    return false;
                }
            }
        }
        return true;
    }

    test("should correctly position a 15-minute event at the beginning of the day", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:15:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event, 0, 1);

        const cases = day.cases;

        assert.equal(cases[0][0], event);
        assert.ok(areAllCasesEmpty(cases, [[0, 0]]));
    });

    test("should correctly position a 15-minute event at the end of the day (23:45 to 00:00)", assert => {
        const event = { startDate: "2024-06-25T23:45:00Z", endDate: "2024-06-26T00:00:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event, 95, 96);

        const cases = day.cases;
        console.log(cases)
        assert.equal(cases[95][0], event);
        assert.ok(areAllCasesEmpty(cases, [[95, 0]]));
    });

    test("should correctly position an all-day event covering the entire day (00:00 to 24:00)", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-26T00:00:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event, 0, 96);

        const cases = day.cases;
        for (let i = 0; i < 96; i++) {
            assert.equal(cases[i][0], event);
        }

        assert.ok(areAllCasesEmpty(cases, Array.from({ length: 96 }, (_, i) => [i, 0])));
    });


    test("should correctly handle overlapping events: one starts before and ends during the second", assert => {
        const event = { startDate: "2024-06-25T00:15:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day._cases[0][0] = 1;

        day.fillCases(event, 0, 2);

        const cases = day._cases;

        assert.equal(cases[0][1], event);
        assert.equal(cases[1][1], event);

        assert.ok(areAllCasesEmpty(cases, [[0, 0], [0, 1], [1, 1]]), "All other cases should be empty");
    });

    test("should correctly position an event that starts before and ends after an occupied case", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:45:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day._cases[1][0] = 1;

        day.fillCases(event, 0, 3);

        const cases = day._cases;

        assert.equal(cases[0][1], event);
        assert.equal(cases[1][1], event);
        assert.equal(cases[2][1], event);

        assert.ok(areAllCasesEmpty(cases, [[1, 0], [0, 1], [2, 1], [1, 1]]), "All other cases should be empty");
    });

    test("should ignore a fourth event when a row is already filled", assert => {
        const event = { startDate: "2024-06-25T00:45:00Z", endDate: "2024-06-25T01:00:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day._cases[1][0] = 1;
        day._cases[1][1] = 1;
        day._cases[1][2] = 1;

        day.fillCases(event, 1, 2);

        const cases = day._cases;

        assert.ok(areAllCasesEmpty(cases, [[1, 0], [1, 1], [1, 2]]), "All cases should be empty");
    });


    test("should correctly place event on a partially occupied row", assert => {
        const event = { startDate: "2024-06-25T00:15:00Z", endDate: "2024-06-25T00:45:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day._cases[0][0] = 1;
        day._cases[0][1] = 1;
        day._cases[1][1] = 1;

        day.fillCases(event, 1, 3);

        const cases = day._cases;

        assert.equal(cases[1][0], event);
        assert.equal(cases[2][0], event);

        assert.ok(areAllCasesEmpty(cases, [[1, 0], [0, 1], [2, 0], [1, 1], [0, 0]]), "All other cases should be empty");
    });


    test("should correctly position event on a fully occupied row", assert => {
        const event = { startDate: "2024-06-25T00:15:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day._cases[0][0] = 1;
        day._cases[1][0] = 1;
        day._cases[2][0] = 1;
        day._cases[2][1] = 1;

        day.fillCases(event, 1, 2);

        const cases = day._cases;

        assert.equal(cases[1][1], event);

        assert.ok(areAllCasesEmpty(cases, [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1]]), "All other cases should be empty");
    });
    
})