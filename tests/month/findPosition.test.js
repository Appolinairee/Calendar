module('findPosition', (hooks) => {
    hooks.beforeEach(() => {
        month = new Month();

        month._firstOfMonth = new Date(testDate.getFullYear(), testDate.getMonth(), 1).getDay();
        month._lastOfMonth = new Date(testDate.getFullYear(), testDate.getMonth() + 1, 0, 23, 59, 59);
    });

    test("should return 6 for 01 June", assert => {
        const date = "2024-06-01";
        assert.equal(month.findPosition(date), 6);
    });

    test("should return 10 for 5 June", assert => {
        const date = "2024-06-05";
        assert.equal(month.findPosition(date), 10);
    });

    test("should return 16 for 11 June", assert => {
        const date = "2024-06-11";
        assert.equal(month.findPosition(date), 16);
    });

    test("should return 35 for 30 June", assert => {
        const date = "2024-06-30";
        assert.equal(month.findPosition(date), 35);
    });
});