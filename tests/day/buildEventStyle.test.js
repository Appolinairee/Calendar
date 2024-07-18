// penser en terme de positionnement

// tester les parties grid-row
// tester la partie column: si la colonne 0 est la seule colonne occupée, on définit le style sur les 4 colonnes, ainsi de suite

module("buildEventStyle", () => {
    test("should return the correct style for a single 15-minute event", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:15:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        sinon.stub(day, 'fillCases').callsFake(() => {
            day._cases[0][0] = event;
        });

        day.fillCases();

        const eventStyle = day.buildEventStyle(event);

        assert.equal(eventStyle, "grid-column: 1 / 2; grid-row: 1 / 2;");
    });

    test("should return correct style for a single 30-minute event", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T00:30:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        sinon.stub(day, 'fillCases').callsFake(() => {
            day._cases[0][0] = event;
            day._cases[1][0] = event;
        });

        day.fillCases();

        const eventStyle = day.buildEventStyle(event);

        assert.equal(eventStyle, "grid-column: 1 / 2; grid-row: 1 / 3;");
    });

    test("should return correct style for a 1-hour event", assert => {
        const event = { startDate: "2024-06-25T00:00:00Z", endDate: "2024-06-25T01:00:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        sinon.stub(day, 'fillCases').callsFake(() => {
            for (let i = 0; i < 4; i++) {
                day._cases[i][0] = event;
            }
        });

        day.fillCases();

        const eventStyle = day.buildEventStyle(event);

        assert.equal(eventStyle, "grid-column: 1 / 2; grid-row: 1 / 5;");
    });

    test("should return correct style for an event ending at the end of the day", assert => {
        const event = { startDate: "2024-06-25T23:30:00Z", endDate: "2024-06-25T23:45:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        sinon.stub(day, 'fillCases').callsFake(() => {
            day._cases[95][2] = event;
        });

        day.fillCases();

        const eventStyle = day.buildEventStyle(event);

        assert.equal(eventStyle, "grid-column: 3 / 4; grid-row: 96 / 97;");
    });

    test("should return correct style for an event spanning multiple days", assert => {
        const event = { startDate: "2024-06-25T23:00:00Z", endDate: "2024-06-26T01:00:00Z" };
        const day = new Day({ date: testDate, events: [event] });

        sinon.stub(day, 'fillCases').callsFake(() => {
            day._cases[95][2] = event;
        });

        day.fillCases();

        const eventStyle = day.buildEventStyle(event);

        assert.equal(eventStyle, "grid-column: 3 / 4; grid-row: 96 / 97;");
    });

    test("should return correct style for two non-overlapping events", assert => {
        const event1 = { startDate: "2024-06-25T10:00:00Z", endDate: "2024-06-25T10:30:00Z" };
        const event2 = { startDate: "2024-06-25T10:30:00Z", endDate: "2024-06-25T11:00:00Z" };
        const day = new Day({ date: testDate, events: [event1, event2] });

        sinon.stub(day, 'fillCases').callsFake(() => {
            day._cases[40][0] = event1;
            day._cases[41][0] = event2;
        });

        day.fillCases();

        const event1Style = day.buildEventStyle(event1);
        const event2Style = day.buildEventStyle(event2);

        assert.equal(event1Style, "grid-column: 1 / 2; grid-row: 41 / 42;");
        assert.equal(event2Style, "grid-column: 1 / 2; grid-row: 42 / 43;");
    });
});
