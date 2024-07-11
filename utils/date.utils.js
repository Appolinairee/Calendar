function isValidISODate(dateString) {
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
}

function getUtcDate(date) {
    const utcDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
    );

    return utcDate;
}