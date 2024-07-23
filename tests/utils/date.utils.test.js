import { isValidISODate } from "../../utils/date.utils";

module('isValidISODate', () => {
    test("should return true for valid ISO dates", assert => {
        assert.ok(isValidISODate("2024-06-25T10:00:00Z"), "Valid ISO date");
        assert.ok(isValidISODate("2024-06-25"), "Valid ISO date (date only)");
        assert.ok(isValidISODate("2024-06-25T10:00:00"), "Valid ISO date (time only)");
        assert.ok(isValidISODate("2024-06-25T10:00:00.123Z"), "Valid ISO date with milliseconds");
        assert.ok(isValidISODate("2024/06/25"), "Valid date string");
    });

    test("should return false for invalid date strings", assert => {
        assert.notOk(isValidISODate("Hello"), "Invalid date string");
        assert.notOk(isValidISODate("2024-06-25T25:00:00Z"), "Invalid date string (invalid hour)");
    });

    test("should return false for undefined or null", assert => {
        assert.notOk(isValidISODate(undefined), "Undefined");
        assert.notOk(isValidISODate(null), "Null");
    });
});