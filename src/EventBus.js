export default class EventBus
{
    constructor()
    {
        this.listeners = new Map();
    }


    /**
     * Registra um listener para um tipo de evento.
     * @param {string} event_type Tipo do evento, como "keydown". 
     * @param {Function} callback Função invocada quando o evento for engatilhado.
     */
    on(event_type, callback)
    {
        if(!this.listeners.has(event_type)){ this.listeners.set(event_type, []); }
        
        this.listeners.get(event_type).push(callback)
    }


    /**
     * Cancela o registro de um listener.
     * @param {string} event_type Tipo do evento, como "keydown". 
     * @param {Function} callback Função invocada quando o evento for engatilhado.
     */
    off(event_type, callback)
    {
        const listeners = this.listeners.has(event_type);
        if(!listeners) { return; }

        // Índice do callback na array sob a chave `event_type`.
        const idx = listeners.indexOf(callback);

        if(idx >= 0){ listeners.splice(idx, 1); }
    }


    /**
     * Dispara um evento.
     * @param {string} event_type Tipo do evento, como "keydown". 
     * @param {any} data Dados passados para o callback. 
     */
    emit(event_type, data)
    {
        const listeners = this.listeners.get(event_type);

        if(!listeners){ return; }

        for(const callback of listeners){ callback(data); }
    }


    /** Remove todos os listeners de evento. */
    clear(){ this.listeners.clear(); }

}