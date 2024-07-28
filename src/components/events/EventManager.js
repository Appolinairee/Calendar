class EventManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.loadEvents();
    }

    loadEvents() {
        const events = localStorage.getItem(this.storageKey);
        this.events = events ? JSON.parse(events) : [];
    }

    saveEvents() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.events));
    }

    createEvent(title, startDate, endDate) {
        const newEvent = {
            id: Date.now().toString(),
            title: title,
            startDate: startDate,
            endDate: endDate
        };
        this.events.push(newEvent);
        this.saveEvents();
        return newEvent;
    }

    getEvents() {
        return this.events;
    }

    updateEvent(id, updatedData) {
        const eventIndex = this.events.findIndex(event => event.id === id);
        if (eventIndex === -1) return null;

        this.events[eventIndex] = { ...this.events[eventIndex], ...updatedData };
        this.saveEvents();
        return this.events[eventIndex];
    }

    deleteEvent(id) {
        const eventIndex = this.events.findIndex(event => event.id === id);
        if (eventIndex === -1) return null;

        const deletedEvent = this.events.splice(eventIndex, 1);
        this.saveEvents();
        return deletedEvent[0];
    }
}

module.exports = EventManager;