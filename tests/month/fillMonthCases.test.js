module("fillCases for month", (hooks) => {
  hooks.beforeEach(() => {
    month = new Month();

    month._firstOfMonth = new Date(
      testDate.getFullYear(),
      testDate.getMonth(),
      1
    ).getDay();
    month._lastOfMonth = new Date(
      testDate.getFullYear(),
      testDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );
  });

  const event = { startDate: "2024-06-15" };

  test("should fill the first subdivision of cell 0, 0 when it is empty", (assert) => {
    month.fillCases(event, 0, 0);
    assert.deepEqual(month._cases[1][0], event);
  });

  test("should fill the second subdivision of cell 0, 0 when the first is occupied", (assert) => {
    month._cases[1][0] = 1;
    month.fillCases(event, 0, 0);

    assert.deepEqual(month._cases[2][0], event);
  });

  test("should fill the third subdivision of cell 0, 0 when the second is occupied", (assert) => {
    month._cases[1][0] = 1;
    month._cases[2][0] = 1;
    month.fillCases(event, 0, 0);

    assert.deepEqual(month._cases[3][0], event);
  });

  test("should place event into the fourth subdivision of cell 0, 0 when more than 3 three events in cases", (assert) => {
    month._cases[1][0] = 1;
    month._cases[2][0] = 1;
    month._cases[3][0] = 1;
    month.fillCases(event, 0, 0);

    assert.deepEqual(month._cases[4][0][0], event);
  });

  test("should fill corrects cases from start to end in same line and there is place for", (assert) => {
    month.fillCases(event, 4, 6);

    assert.deepEqual(month._cases[1][4], event);
    assert.deepEqual(month._cases[1][5], event);
    aassert.deepEqual(month._cases[1][6], event);
  });

  test("should place event in seemore case of the first day when there is no place for", (assert) => {
    for (let i = 1; i < 4; i++) month._cases[i][0] = 1;

    month.fillCases(event, 0, 4);

    assert.deepEqual(month._cases[4][0][0], event);
  });

  test("should fill corrects cases from start to 6 end from 0 to end when positions are on two lines and there is place for", (assert) => {
    month._cases[1][0] = 1;
    month._cases[2][0] = 1;
    month.fillCases(event, 6, 8);

    assert.deepEqual(month._cases[1][0], event);
    assert.deepEqual(month._cases[6][0], event);
    ssert.deepEqual(month._cases[6][1], event);
  });

  test("should fill corrects cases when positions span three lines and there is place for", (assert) => {
    month._cases[1][0] = 1;
    month._cases[2][0] = 1;
    month.fillCases(event, 6, 15);

    assert.deepEqual(month._cases[1][0], event);

    for (let i = 0; i < 7; i++) {
      assert.deepEqual(month._cases[6][i], event);
    }

    assert.deepEqual(month._cases[12][1], event);
  });
});
