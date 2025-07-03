export default class EventManager
{
    constructor()
    {
        this.listeners = new Map();
    }

    subscribe(event_type, listener)
    {
        if(!this.listeners.has(event_type)) this.listeners.set(event_type, new Set());

        this.listeners.get(event_type).add(listener);
    }

    unsubscribe(event_type, listener)
    {
        this.listeners.get(event_type)?.delete(listener);
    }

    notify(event_type, data)
    {
        if(!this.listeners.has(event_type)) return;

        this.listeners.get(event_type).forEach( listener => listener.handleEvent(data) );
    }
}