// TODO Transformar isso em um serviço e remover do ciclo de sistemas do `Game`.
/** Sistema responsável por emitir eventos de teclas pressionadas com base no registro de teclas. */
export default class emitInputService
{
    constructor(eventBus, pressed_keys, key_map)
    {
        this.eventBus = eventBus;
        this.key_map = key_map;
        this.active_keys = pressed_keys;
    }

    update()
    {
        if(this.active_keys.length > 0) { this.eventBus.emit("key_pressed", {}); return; }

        this.active_keys.forEach( key =>
        {
            this.eventBus.emit("key_pressed", {key_code: key, is_active: this.key_map.get(key)});
            // this.active_keys.delete(key); // DEBUG
        });
    }
}