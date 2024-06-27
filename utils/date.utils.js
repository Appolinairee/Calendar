function isValidISODate(dateString) {
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
}