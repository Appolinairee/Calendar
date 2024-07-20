module('update', (hooks) => {

    const initialDate = new Date('2024-07-20T00:00:00Z');
    const initialEvents = [
        { startDate: '2024-07-20T10:00:00Z', endDate: '2024-07-20T11:00:00Z' },
        { startDate: '2024-07-20T12:00:00Z', endDate: '2024-07-20T13:00:00Z' }
    ];

    hooks.beforeEach(function () {
        day = new Day({ date: initialDate, events: initialEvents });
    });

    test('update method does not set events if events parameter is not passed', function (assert) {
        const newDate = new Date('2024-07-21T00:00:00Z');

        day.update({ date: newDate });

        assert.deepEqual(day.events, initialEvents);
        assert.deepEqual(day.date, newDate);
    });

    test('update method does not set date if date parameter is not passed', function (assert) {
        day.update({ events: [{}] });

        assert.deepEqual(day.date, initialDate, 'Date should not be updated');
    });

    test('update method does not update if date is provided but invalid', function (assert) {
        day.update({ date: "Invalid Date" });

        assert.deepEqual(day.date, initialDate);
        assert.deepEqual(day.events, initialEvents);
    });

    test('update method does not update if events are not an array of objects', function (assert) {

        day.update({ events: "Invalid Events" });

        assert.deepEqual(day.date, initialDate);
        assert.deepEqual(day.events, initialEvents);
    });

    test('update method sets events and date attributes when they are provided', function (assert) {
        const newDate = new Date('2024-07-21T00:00:00Z');
        const newEvents = [
            { startDate: '2024-07-21T10:00:00Z', endDate: '2024-07-21T11:00:00Z' },
            { startDate: '2024-07-21T12:00:00Z', endDate: '2024-07-21T13:00:00Z' }
        ];

        day.update({ events: newEvents, date: newDate });

        assert.deepEqual(day.events, newEvents);
        assert.deepEqual(day.date, newDate);
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
    

    test('update method does not call findPosition if isCurrentDayEvent returns false', function (assert) {
        const stub = sinon.stub(day, 'isCurrentDayEvent').returns(false);
        const spyFindPosition = sinon.spy(day, 'findPosition');

        day.update({ events: initialEvents, date: initialDate });

        assert.notOk(spyFindPosition.called);

        stub.restore();
        spyFindPosition.restore();
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