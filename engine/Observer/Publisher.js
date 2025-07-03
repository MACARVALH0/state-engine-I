export default class Publisher
{
    constructor()
    {
        this.subscribers = new Set();
    }

    subscribe(observer){ this.subscribers.add(observer); }

    unsubscribe(observer){ this.subscribers.remove(observer); }

    notify(data){ this.subscribers.forEach( obs => obs.update(data) ); }
}