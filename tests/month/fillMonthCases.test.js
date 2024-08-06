module("fillCases for month", (hooks) => {
  hooks.beforeEach(() => {
    month = new Month();

    month._firstOfMonth = new Date(testDate.getFullYear(), testDate.getMonth(), 1).getDay();
    month._lastOfMonth = new Date(testDate.getFullYear(), testDate.getMonth() + 1, 0, 23, 59, 59);
  });

  const event = { startDate: "2024-06-15" };

  test("should fill the first subdivision of cell when it is empty", (assert) => {
    month.fillCases(event, 0, 0);
    assert.deepEqual(month._cases[1][0], { event, start: true, end: true, newLine: false });
  });

  test("should fill the second subdivision of cell when the first is occupied", (assert) => {
    month._cases[1][0] = 1;
    month.fillCases(event, 0, 0);

    assert.deepEqual(month._cases[2][0], { event, start: true, end: true, newLine: false });
  });

  test("should fill the third subdivision of cell when the second is occupied", (assert) => {
    month._cases[1][0] = 1;
    month._cases[2][0] = 1;
    month.fillCases(event, 0, 0);

    assert.deepEqual(month._cases[3][0], { event, start: true, end: true, newLine: false });
  });

  test("should place event into the fourth subdivision of cell when more than 3 events in cases", (assert) => {
    month._cases[1][0] = 1;
    month._cases[2][0] = 1;
    month._cases[3][0] = 1;
    month.fillCases(event, 0, 0);

    assert.deepEqual(month._cases[4][0][0], event);
  });

  test("should fill correct cases from start to end when positions are in same line and there is place for", (assert) => {
    month.fillCases(event, 4, 6);

    assert.deepEqual(month._cases[1][4], { event, start: true, continuation: false, newLine: false, end: false });
    assert.deepEqual(month._cases[1][5], { event, continuation: true, newLine: false, end: false, start: false });
    assert.deepEqual(month._cases[1][6], { event, continuation: true, end: true, newLine: false, start: false });
  });

  test("should place event in seemore case of the first day when there is no place for in its firstday", (assert) => {
    for (let i = 1; i < 4; i++) month._cases[i][0] = 1;
    month.fillCases(event, 0, 4);

    assert.deepEqual(month._cases[4][0][0], event);
  });

  test("should fill only the first day case and adjust start and end for the same day when the other day is not free", (assert) => {
    for (let i = 1; i < 4; i++) month._cases[i][1] = 1;

    month.fillCases(event, 0, 3);

    assert.deepEqual(month._cases[1][0], { event, newLine: false, start: true, end: true, continuation: true });
    assert.notDeepEqual(month._cases[1][2], event);
  });



  test("should fill correct cases from start to end when positions are on two lines and there is place for", (assert) => {
    month.fillCases(event, 6, 8);

    assert.deepEqual(month._cases[1][6], { event, start: true, continuation: false, newLine: false, end: false });
    assert.deepEqual(month._cases[6][0], { event, continuation: true, newLine: true, start: false, end: false });
    assert.deepEqual(month._cases[6][1], { event, continuation: true, end: true, newLine: true, start: false });
  });


  test("should fill correct cases when positions span three lines and there is place for", (assert) => {
    month.fillCases(event, 6, 15);

    assert.deepEqual(month._cases[1][6], { event, start: true, continuation: false, newLine: false, end: false });

    for (let i = 0; i < 7; i++) {
      assert.deepEqual(month._cases[6][i], { event, continuation: true, newLine: i === 0, end: false, start:false, newLine: true });
    }

    assert.deepEqual(month._cases[11][1], { event, continuation: true, end: true, newLine: true, start: false });
  });


  test("should add event to see more when spanning multiple rows and no space and there is no space in first day", (assert) => {
    for (let i = 1; i < 4; i++) month._cases[i][6] = 1;
    for (let i = 6; i < 9; i++) month._cases[i][0] = 1;

    month.fillCases(event, 6, 7);

    assert.deepEqual(month._cases[4][6][0], event);
  });

  test("should add event to first day case when spanning multiple rows and there is space", (assert) => {
    for (let i = 1; i < 3; i++) month._cases[i][6] = 1;
    for (let i = 6; i < 9; i++) month._cases[i][0] = 1;

    month.fillCases(event, 6, 7);

    assert.deepEqual(month._cases[3][6], { event, start: true, end: true, newLine: false });
  });
});