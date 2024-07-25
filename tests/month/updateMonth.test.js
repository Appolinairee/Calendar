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

  test("update method calls isCurrentDayEvent for each event", function (assert) {
    const spy = sinon.spy(month, "isMonthEvent");
    month.update({ events: initialEvents, date: initialDate });

    assert.ok(spy.calledTwice);
    spy.restore();
  });

  test("update method calls functions in the correct order", function (assert) {
    const spyIsMonthEvent = sinon.spy(month, "isMonthEvent");
    const spyFillCases = sinon.spy(month, "fillCases");

    month.update({ events: initialEvents, date: initialDate });

    assert.ok(spyIsMonthEvent.calledBefore(spyFillCases));

    spyIsMonthEvent.restore();
    spyFillCases.restore();
  });

  test("update method does not call fillCases if isMonthEvent returns false", function (assert) {
    const stubIsCurrentDayEvent = sinon
      .stub(day, "isCurrentDayEvent")
      .returns(false);
    const spyFillCases = sinon.spy(day, "fillCases");

    day.update({ events: initialEvents, date: initialDate });

    assert.notOk(spyFillCases.called);

    stubIsCurrentDayEvent.restore();
    spyFillCases.restore();
  });
});
