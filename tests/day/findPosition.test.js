const day = new Day({ date: testDate, events: [{}] });

module('findPosition', () => {

    test("should call isCurrentDayEvent exactly once when findPosition is called", assert => {
        const day = new Day({ date: testDate, events: [{}] });
        const spy = sinon.spy(day, 'isCurrentDayEvent');

        const event = { startDate: "2024-06-25T10:00:00Z" };
        day.findPosition(event);

        assert.equal(spy.calledOnce, true);
        spy.restore();
    });

    test("should return -1, -1 if isCurrentDayEvent returns false", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(false);

        const event = { startDate: "2024-06-24T22:00:00Z" };
        const result = day.findPosition(event);

        assert.equal(result.start, -1);
        assert.equal(result.end, -1);

        stub.restore();
    });


    // hours with :00
    test("should return positions (0, 4) for event from 00:00 to 01:00", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:00:00Z",
            endDate: "2024-06-25T01:00:00Z"
        };

        const { start, end } = day.findPosition(event);

        assert.equal(start, 0);
        assert.equal(end, 4);

        stub.restore();
    });


    test("should return positions (60, 64) for event from 15:00 to 16:00", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T15:00:00Z",
            endDate: "2024-06-25T16:00:00Z"
        };

        const { start, end } = day.findPosition(event);

        assert.equal(start, 60);
        assert.equal(end, 64);

        stub.restore();
    });


    // 15-multiple minutes
    test("should return positions (92, 96) for event from 23:00 to 00:00", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T23:00:00Z",
            endDate: "2024-06-26T00:00:00Z"
        };

        const { start, end } = day.findPosition(event);

        assert.equal(start, 92);
        assert.equal(end, 96);

        stub.restore();
    });

    test("should return positions (0, 1) for event from 00:00 to 00:15", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:00:00Z",
            endDate: "2024-06-25T00:15:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 0);
        assert.equal(end, 1);

        stub.restore();
    });

    test("should return positions (1, 2) for event from 00:15 to 00:30", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:15:00Z",
            endDate: "2024-06-25T00:30:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 1);
        assert.equal(end, 2);
        stub.restore();
    });

    test("should return positions (2, 3) for event from 00:30 to 00:45", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:30:00Z",
            endDate: "2024-06-25T00:45:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 2);
        assert.equal(end, 3);
        stub.restore();
    });


    test("should return positions (3, 4) for event from 00:45 to 01:00", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:45:00Z",
            endDate: "2024-06-25T01:00:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 3);
        assert.equal(end, 4);
        stub.restore();
    });


    // non 15-multiple minutes
    test("should return positions (0, 1) for event from 00:05 to 00:15", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:05:00Z",
            endDate: "2024-06-25T00:15:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 0);
        assert.equal(end, 1);
        stub.restore();
    });

    test("should return positions (1, 2) for event from 00:21 to 00:30", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:21:00Z",
            endDate: "2024-06-25T00:30:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 1);
        assert.equal(end, 2);
        stub.restore();
    });

    test("should return positions (2, 3) for event from 00:33 to 00:45", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:33:00Z",
            endDate: "2024-06-25T00:45:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 2);
        assert.equal(end, 3);
        stub.restore();
    });


    test("should return 96 if the end date exceeds the current day", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T23:30:00Z",
            endDate: "2024-06-26T00:15:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 94);
        assert.equal(end, 96);

        stub.restore();
    });

    test("should return correct positions for event from previous day to current day", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-24T22:00:00Z",
            endDate: "2024-06-25T02:00:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 0);
        assert.equal(end, 8);

        stub.restore();
    });

    test("should return correct positions for event covering the current day", assert => {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const event = {
            startDate: "2024-06-25T00:00:00Z",
            endDate: "2024-06-26T00:00:00Z"
        };

        const { start, end } = day.findPosition(event);
        assert.equal(start, 0);
        assert.equal(end, 96);

        stub.restore();
    });
});