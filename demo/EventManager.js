class EventManager {
    constructor(events = []) {
        this.events = events;
    }

    getEvents() {
        return this.events;
    }

    addEvent(title, startDate, endDate) {
        const newEvent = { title, startDate, endDate };
        this.events.push(newEvent);
    }

    updateEvent(index, title, startDate, endDate) {
        if (index >= 0 && index < this.events.length) {
            this.events[index] = { title, startDate, endDate };
        }
    }

    deleteEvent(index) {
        if (index >= 0 && index < this.events.length) {
            this.events.splice(index, 1);
        }
    }

    findEventByTitle(title) {
        return this.events.filter(event => event.title === title);
    }
}

export default  EventManager;