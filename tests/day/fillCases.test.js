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

    function areAllSeemoreCasesEmpty(seemoreCases, excludedRows = []) {
        const excludedSet = new Set(excludedRows);

        for (let i = 0; i < seemoreCases.length; i++) {
            if (!excludedSet.has(i) && seemoreCases[i].length > 0) {
                return false;
            }
        }
        return true;
    }

    test("should fill one case if start and end are the same", assert => {
        const day = new Day({ date: testDate, events: [] });
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:15:00Z" };

        day.fillCases(event, 0, 0);

        assert.deepEqual(day.cases[0][0], event);
        assert.ok(areAllCasesEmpty(day.cases, [[0, 0]]));
        assert.ok(areAllSeemoreCasesEmpty(day.seemoreCases));
    });

    test("should fill cases from start to end when available", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event, 0, 2);

        const cases = day.cases;

        assert.deepEqual(cases[0][0], event);
        assert.deepEqual(cases[1][0], event);

        assert.ok(areAllCasesEmpty(cases, [[0, 0], [1, 0]]));
        assert.ok(areAllSeemoreCasesEmpty(day.seemoreCases));
    });


    test("should place an event in the seemore case if a row has more than 3 events", assert => {
        const event1 = { startDate: "2024-06-25T00:00:00Z" };
        const event2 = { startDate: "2024-06-25T00:15:00Z" };
        const event3 = { startDate: "2024-06-25T00:30:00Z" };
        const overflowEvent = { startDate: "2024-06-25T00:45:00Z" };

        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event1, 0, 1);
        day.fillCases(event2, 0, 1);
        day.fillCases(event3, 0, 1);
        day.fillCases(overflowEvent, 0, 2);

        const cases = day.cases;
        const seemoreCases = day.seemoreCases;

        assert.deepEqual(seemoreCases[0], [overflowEvent]);
        assert.ok(areAllCasesEmpty(cases, [[0, 0], [0, 1], [0, 2]]));
        assert.ok(areAllSeemoreCasesEmpty(seemoreCases, [0]));
    });


    test("should correctly handle events spanning multiple days", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-26T01:00:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event, 0, 96);

        const cases = day.cases;
        const seemoreCases = day.seemoreCases;

        for (let i = 0; i < 96; i++) {
            assert.deepEqual(cases[i][0], event);
        }

        const filledCases = Array.from({ length: 96 }, (_, i) => [i, 0]);

        assert.ok(areAllCasesEmpty(cases, filledCases));
        assert.ok(areAllSeemoreCasesEmpty(seemoreCases));
    });

});
