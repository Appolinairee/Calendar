module('update', (hooks) => {
    const initialDate = new Date('2024-07-20T00:00:00Z');
    const initialEvents = [
        { startDate: '2024-07-20T10:00:00Z', endDate: '2024-07-20T11:00:00Z' },
        { startDate: '2024-07-20T12:00:00Z', endDate: '2024-07-20T13:00:00Z' }
    ];

    let day;

    hooks.beforeEach(function () {
        day = new Day();
    });

    test("when date parameter is provided and is not a Date object, it should throw an exception", assert => {
        assert.throws(() => {
            day.update({ date: "Hello", events: [] });
        }, new Error(DateParamError));
    });

    test("when events parameter is not provided, it should throw an exception", assert => {
        assert.throws(() => {
            day.update({ date: initialDate });
        }, new Error(EventsParamError));
    });

    test("when events parameter is provided and is not an array, it should throw an exception", assert => {
        assert.throws(() => {
            day.update({ date: initialDate, events: "Events" });
        }, new Error(EventsParamError));
    });

    test("when date parameter is provided and is a Date object, date attribute should be that date", assert => {
        const date = new Date("2023-06-25T10:00:00Z");
        day.update({ date, events: [{}] });
        assert.equal(day.date.toISOString(), date.toISOString());
    });

    test("when events parameter is provided and is not an array of objects, it should throw an exception", assert => {
        assert.throws(() => {
            day.update({ date: initialDate, events: ["", ""] });
        }, new Error(EventsParamError));
    });

    test("when events parameter is provided and is an array, it should be assigned to events", assert => {
        const events = [{ title: 'Event 1' }, { title: 'Event 2' }];
        day.update({ date: initialDate, events });
        assert.equal(JSON.stringify(day.events), JSON.stringify(events));
    });


    test('update method calls isCurrentDayEvent for each event', function (assert) {
        const spy = sinon.spy(day, 'isCurrentDayEvent');
        day.update({ events: initialEvents, date: initialDate });

        assert.ok(spy.calledTwice);
        spy.restore();
    });

    test('update method calls functions in the correct order', function (assert) {
        const spyIsCurrentDayEvent = sinon.spy(day, 'isCurrentDayEvent');
        const spyFindPosition = sinon.spy(day, 'findPosition');
        const spyFillCases = sinon.spy(day, 'fillCases');

        day.update({ events: initialEvents, date: initialDate });

        assert.ok(spyIsCurrentDayEvent.calledBefore(spyFindPosition));
        assert.ok(spyFindPosition.calledBefore(spyFillCases));

        spyIsCurrentDayEvent.restore();
        spyFindPosition.restore();
        spyFillCases.restore();
    });

    test('update method does not call fillCases if isCurrentDayEvent returns false', function (assert) {
        const stubIsCurrentDayEvent = sinon.stub(day, 'isCurrentDayEvent').returns(false);
        const spyFillCases = sinon.spy(day, 'fillCases');

        day.update({ events: initialEvents, date: initialDate });

        assert.notOk(spyFillCases.called);

        stubIsCurrentDayEvent.restore();
        spyFillCases.restore();
    });

    test('update method does not call fillCases if findPosition returns -1 for start date', function (assert) {
        const stubIsCurrentDayEvent = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const stubFindPosition = sinon.stub(day, 'findPosition').returns(-1);
        const spyFillCases = sinon.spy(day, 'fillCases');

        day.update({ events: initialEvents, date: initialDate });

        assert.notOk(spyFillCases.called);

        stubIsCurrentDayEvent.restore();
        stubFindPosition.restore();
        spyFillCases.restore();
    });

    test('update method calls fillCases with correct parameters', function (assert) {
        const stubIsCurrentDayEvent = sinon.stub(day, 'isCurrentDayEvent').returns(true);
        const stubFindPosition = sinon.stub(day, 'findPosition');
        stubFindPosition.onFirstCall().returns(1);
        stubFindPosition.onSecondCall().returns(4);
        const spyFillCases = sinon.spy(day, 'fillCases');

        const event = { startDate: '2024-07-21T10:00:00Z', endDate: '2024-07-21T11:00:00Z' };
        day.update({ events: [event], date: initialDate });

        assert.ok(spyFillCases.calledWith(event, 1, 4));

        stubIsCurrentDayEvent.restore();
        stubFindPosition.restore();
        spyFillCases.restore();
    });
});
