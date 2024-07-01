const testDate = new Date("2024-06-25");
const day = new Day({ date: testDate, events: [{}] });

module('findPosition', () => {

    test("should return correct positions for events starting at every hour with 00 minutes", assert => {
        const hoursWithZeroMinutes = Array.from({ length: 24 }, (_, hour) => ({
            startDate: `2024-06-25T${String(hour).padStart(2, '0')}:00:00Z`,
            expectedPosition: hour * 4
        }));

        hoursWithZeroMinutes.forEach(({ startDate, expectedPosition }) => {
            const position = day.findPosition(startDate);
            assert.equal(position, expectedPosition);
        });

    });

    test("should return correct positions for events starting at every 15-minute interval within one hour", assert => {
        const baseHour = "2024-06-25T10:00:00Z";

        const positions = Array.from({ length: 4 }, (_, index) => ({
            minutes: index * 15,
            expectedPosition: Math.floor((10 * 60 + index * 15) / MINUTES_IN_SUBDIVISION)
        }));

        positions.forEach(({ minutes, expectedPosition }) => {
            const startDate = new Date(baseHour);
            startDate.setUTCMinutes(minutes);
            const position = day.findPosition(startDate);
            assert.equal(position, expectedPosition);
        });
    });

    test("should return correct positions for events starting at specific minutes within one hour", assert => {

        const dates = [
            "2024-06-25T00:05:00Z", 
            "2024-06-25T00:21:00Z",
            "2024-06-25T00:33:00Z",
            "2024-06-25T10:42:00Z",
        ];

        const position1 = day.findPosition(dates[0]);
        const position2 = day.findPosition(dates[1]);
        const position3 = day.findPosition(dates[2]);
        const position4 = day.findPosition(dates[3]);

        assert.equal(position1, 0);
        assert.equal(position2, 1);
        assert.equal(position3, 2);
        assert.equal(position4, 3);
    });

    test("should return 96 if the date exceeds the current day", assert => {
        const dates = [
            "2024-06-25T24:00:00Z",
            "2024-06-26T00:00:00Z",
            "2024-06-26T01:00:00Z",
        ];

        dates.forEach(date => {
            const position = day.findPosition(date);
            assert.equal(position, 96);
        });
    });
});