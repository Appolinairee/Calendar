

module('Calendar Constructor', () => {
    const initialDate = new Date('2024-07-20T00:00:00Z');
    const initialEvents = [
        { startDate: '2024-07-20T10:00:00Z', endDate: '2024-07-20T11:00:00Z' },
        { startDate: '2024-07-20T12:00:00Z', endDate: '2024-07-20T13:00:00Z' }
    ];

    test("should throw an exception when date parameter is provided and is not a Date object", assert => {
        assert.throws(() => {
            new Calendar({ date: "Hello", events: [] });
        }, new Error(DateParamError));
    });

    test("should set date attribute to the provided Date object when date parameter is valid", assert => {
        const calendar = new Calendar({ date: initialDate, events: initialEvents });

        assert.equal(calendar.date.toISOString(), initialDate.toISOString());
    });

    test("should throw an exception when events parameter is not provided", assert => {
        assert.throws(() => {
            new Calendar({ date: initialDate });
        }, new Error(EventsParamError));
    });

    test("should throw an exception when events parameter is provided and is not an array of objects", assert => {
        assert.throws(() => {
            new Calendar({ date: initialDate, events: ["", ""] });
        }, new Error(EventsParamError));
    });

    test('should set currentMode to "day" if no mode is provided', assert => {
        const defaultCalendar = new Calendar({ events: [] });
        assert.equal(defaultCalendar.currentMode, 'day');
    });

    test('should set currentMode to "day" if provided mode is invalid', assert => {
        const invalidModeCalendar = new Calendar({ mode: 'invalidMode', events: [] });
        assert.equal(invalidModeCalendar.currentMode, 'day');
    });

    test('should set currentMode to provided valid mode', assert => {
        const dayModeCalendar = new Calendar({ mode: 'day', events: [] });
        const monthModeCalendar = new Calendar({ mode: 'month', events: [] });
        const yearModeCalendar = new Calendar({ mode: 'year', events: [] });

        assert.equal(dayModeCalendar.currentMode, 'day');
        assert.equal(monthModeCalendar.currentMode, 'month');
        assert.equal(yearModeCalendar.currentMode, 'year');
    });
});


module('Calendar switchMode', () => {
    const initialDate = new Date('2024-07-20T00:00:00Z');
    const initialEvents = [
        { startDate: '2024-07-20T10:00:00Z', endDate: '2024-07-20T11:00:00Z' },
        { startDate: '2024-07-20T12:00:00Z', endDate: '2024-07-20T13:00:00Z' }
    ];

    test('should switch mode to "day" if an invalid mode is provided', assert => {
        const calendar = new Calendar({ date: initialDate, events: initialEvents, mode: 'day' });
        calendar.switchMode('invalidMode');
        assert.equal(calendar.currentMode, 'day');
    });

    test('should switch mode to a valid mode', assert => {
        const calendar = new Calendar({ date: initialDate, events: initialEvents, mode: 'day' });
        calendar.switchMode('month');
        assert.equal(calendar.currentMode, 'month');
        calendar.switchMode('year');
        assert.equal(calendar.currentMode, 'year');
    });
});



module('Calendar setCurrentDate Method', (hooks) => {
    let calendar;

    hooks.beforeEach(() => {
        calendar = new Calendar({ date: new Date(), events: [] });
    });

    test('setCurrentDate should update the date to the provided valid Date object', assert => {
        const newDate = new Date('2024-08-15T00:00:00Z');
        calendar.setCurrentDate(newDate);
        assert.equal(calendar.date.toISOString(), newDate.toISOString(), 'Date should be updated to the new Date object');
    });

    test('setCurrentDate should throw an error if the provided date is not a Date object', assert => {
        assert.throws(() => {
            calendar.setCurrentDate('Invalid date');
        }, new Error(DateParamError), 'Expected error should be thrown for non-Date input');
    });

    test('setCurrentDate should throw an error if no date is provided', assert => {
        assert.throws(() => {
            calendar.setCurrentDate();
        }, new Error(DateParamError), 'Expected error should be thrown when no date is provided');
    });
});
