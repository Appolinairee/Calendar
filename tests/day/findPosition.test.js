
module('findPosition', (hooks) => {
    let day;

    hooks.beforeEach(() => {
        day = new Day();
        day.update({ date: testDate, events: [{}] });
    });

    test("should return -1 when date string is not valid", assert => {
        assert.equal(day.findPosition(), -1);
        assert.equal(day.findPosition("Invalide date"), -1);
    });

    test("should return 0 when date is '2024-06-25T00:00:00Z'", assert => {
        const date = "2024-06-25T00:00:00Z";
        assert.equal(day.findPosition(date), 0);
    });

    test("should return 1 when date is '2024-06-25T00:05:00Z'", assert => {
        const date = "2024-06-25T00:05:00Z";
        assert.equal(day.findPosition(date), 0);
    });

    test("should return 1 when date is '2024-06-25T00:15:00Z'", assert => {
        const date = "2024-06-25T00:15:00Z";
        assert.equal(day.findPosition(date), 1);
    });

    test("should return 2 when date is '2024-06-25T00:23:00Z'", assert => {
        const date = "2024-06-25T00:23:00Z";
        assert.equal(day.findPosition(date), 1);
    });

    test("should return 2 when date is '2024-06-25T00:30:00Z'", assert => {
        const date = "2024-06-25T00:30:00Z";
        assert.equal(day.findPosition(date), 2);
    });

    test("should return 2 when date is '2024-06-25T00:34:00Z'", assert => {
        const date = "2024-06-25T00:34:00Z";
        assert.equal(day.findPosition(date), 2);
    });

    test("should return 3 when date is '2024-06-25T00:45:00Z'", assert => {
        const date = "2024-06-25T00:45:00Z";
        assert.equal(day.findPosition(date), 3);
    });

    test("should return 3 when date is '2024-06-25T00:47:00Z'", assert => {
        const date = "2024-06-25T00:47:00Z";
        assert.equal(day.findPosition(date), 3);
    });

    test("should return 60 when date is '2024-06-25T15:00:00Z'", assert => {
        const date = "2024-06-25T15:00:00Z";
        assert.equal(day.findPosition(date), 60);
    });

    test("should return 61 when date is '2024-06-25T15:15:00Z'", assert => {
        const date = "2024-06-25T15:15:00Z";
        assert.equal(day.findPosition(date), 61);
    });

    test("should return 92 when date is '2024-06-25T23:00:00Z'", assert => {
        const date = "2024-06-25T23:00:00Z";
        assert.equal(day.findPosition(date), 92);
    });

    test("should return 93 when date is '2024-06-25T23:15:00Z'", assert => {
        const date = "2024-06-25T23:15:00Z";
        assert.equal(day.findPosition(date), 93);
    });

    test("should return 95 when date is '2024-06-25T23:45:00Z'", assert => {
        const date = "2024-06-25T23:45:00Z";
        assert.equal(day.findPosition(date), 95);
    });
});
