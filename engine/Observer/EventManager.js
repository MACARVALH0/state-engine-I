export default class EventManager
{
    constructor()
    {
        this.listeners = new Map();
    }

    
    /**
     * Inscreve o listener em um ou mais eventos de uma vez.
     * @param {Object} listener Observador dos eventos deste objeto.
     * @param  {...String} event_type Nome do tipo (ou tipos) de evento que o listener observa.
     */
    subscribe(listener, ...event_type)
    {
        event_type.forEach( e =>
        {
            if(!this.listeners.has(e)) this.listeners.set(e, new Set());

            this.listeners.get(e).add(listener);
        });
    }


    /**
     * Cancela a inscrição do listener em um ou mais eventos de uma vez.
     * @param {Object} listener Observador dos eventos deste objeto.
     * @param  {...String} event_type Nome do tipo (ou tipos) de evento que o listener observa.
     */
    unsubscribe(listener, ...event_type)
    { event_type.forEach( e => this.listeners.get(e)?.delete(listener) ); }


    /**
     * Notifica os observadores quando determinado evento for disparado.
     * @param {String} event_type Nome do tipo de evento que está sendo disparado.
     * @param {*} data Conjunto de dados enviados para o handler do evento.
     */
    notify(event_type, data)
    {
        if(!this.listeners.has(event_type)) return;

        this.listeners.get(event_type).forEach( listener => listener.handleEvent(data) );
    }
}