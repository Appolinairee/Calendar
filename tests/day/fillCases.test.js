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


    test("should fill one case if start and end are the same", assert => {
        const day = new Day({ date: testDate, events: [] });
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:15:00Z" };

        day.fillCases(event, 0, 0);

        assert.equal(day.cases[0][0], event);
        assert.ok(areAllCasesEmpty(day.cases, [[0, 0]]));
    });

    test("should fill cases from start to end when available", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event, 0, 2);

        const cases = day.cases;

        assert.equal(cases[0][0], event);
        assert.equal(cases[1][0], event);

        assert.ok(areAllCasesEmpty(cases, [[0, 0], [1, 0]]));
    });


    test("should fill column 2 if column 1 is not available", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day._cases[0][0] = 1;
        day.fillCases(event, 0, 2);

        const cases = day.cases;

        assert.equal(cases[0][1], event);
        assert.equal(cases[1][1], event);
        assert.ok(areAllCasesEmpty(cases, [[0, 0], [0, 1], [1, 1]]));
    });


    test("should fill column 3 if column 1 and 2 are not availables", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day._cases[0][0] = 1;
        day._cases[0][1] = 1;
        day.fillCases(event, 0, 2);

        const cases = day.cases;

        assert.equal(cases[0][2], event);
        assert.equal(cases[1][2], event);
        assert.ok(areAllCasesEmpty(cases, [[0, 1], [0, 2], [0, 0], [1, 2]]));
    });

    test("should ignore an event if a row is already filled", assert => {
        const event = { startDate: "2024-06-25T00:15:00Z", endDate: "2024-06-25T01:00:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.cases[1][0] = 1;
        day.cases[1][1] = 1;
        day.cases[1][2] = 1;
        day.cases[1][3] = 1;

        day.fillCases(event, 1, 4);

        const cases = day.cases;

        assert.ok(areAllCasesEmpty(cases, [[1, 0], [1, 1], [1, 2], [1, 3]]));
    });

    test("should correctly handle events spanning multiple days", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-26T01:00:00Z" };
        const day = new Day({ date: testDate, events: [] });

        day.fillCases(event, 0, 96);

        const cases = day.cases;

        for (let i = 0; i < 96; i++) {
            assert.equal(cases[i][0], event);
        }

        const filledCases = Array.from({ length: 96 }, (_, i) => [i, 0]);

        assert.ok(areAllCasesEmpty(cases, filledCases));
    });

})