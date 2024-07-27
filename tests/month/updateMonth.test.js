module("update month", (hooks) => {
  const initialDate = new Date("2024-07-20T00:00:00Z");
  const initialEvents = [
    { startDate: "2024-07-20T10:00:00Z", endDate: "2024-07-20T11:00:00Z" },
    { startDate: "2024-07-20T12:00:00Z", endDate: "2024-07-20T13:00:00Z" },
  ];

  let month;

  hooks.beforeEach(function () {
    month = new Month();
  });

  test('update method calls isMonthEvent for each event', function (assert) {
    const spy = sinon.spy(month, 'isMonthEvent');
    month.update({ events: initialEvents, date: initialDate });

    assert.ok(spy.calledTwice);
    spy.restore();
  });

  test('update method calls functions in the correct order', function (assert) {
    const spyIsMonthEvent = sinon.spy(month, 'isMonthEvent');
    const spyFindPosition = sinon.spy(month, 'findPosition');
    const spyFillCases = sinon.spy(month, 'fillCases');

    month.update({ events: initialEvents, date: initialDate });

    assert.ok(spyIsMonthEvent.calledBefore(spyFindPosition));
    assert.ok(spyFindPosition.calledBefore(spyFillCases));

    spyIsMonthEvent.restore();
    spyFindPosition.restore();
    spyFillCases.restore();
  });

  test('update method does not call fillCases if isMonthEvent returns false', function (assert) {
    const stubIsMonthEvent = sinon.stub(month, 'isMonthEvent').returns(false);
    const spyFillCases = sinon.spy(month, 'fillCases');

    month.update({ events: initialEvents, date: initialDate });

    assert.notOk(spyFillCases.called);

    stubIsMonthEvent.restore();
    spyFillCases.restore();
  });

  test('update method calls fillCases with correct parameters', function (assert) {
    const stubIsMonthEvent = sinon.stub(month, 'isMonthEvent').returns(true);
    const stubFindPosition = sinon.stub(month, 'findPosition');
    stubFindPosition.onFirstCall().returns(1);
    stubFindPosition.onSecondCall().returns(4);
    const spyFillCases = sinon.spy(month, 'fillCases');

    const event = { startDate: '2024-07-21T10:00:00Z', endDate: '2024-07-21T11:00:00Z' };
    month.update({ events: [event], date: initialDate });

    assert.ok(spyFillCases.calledWith(event, 1, 4));

    stubIsMonthEvent.restore();
    stubFindPosition.restore();
    spyFillCases.restore();
  });
});
