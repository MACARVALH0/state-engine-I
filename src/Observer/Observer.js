// TODO Documentar classe.
const Observer = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);

        /**
         * Mapa no modelo {tipo_de_evento, handler}.
         * @example
         * this.handlers = new Map
         * ([
         *      ["scene_created", (e) => {}],
         *      ["scene_deleted", (e) => {}]
         * ]);
         */
        this.handlers = new Map();
    }

    
    // /**
    //  * Registra um handler de evento no Observer.
    //  * @param {String} event_type Tipo de evento.
    //  * @param {Function} callback Função handler para o tipo de evento.
    //  */
    // createHandler(event_type, callback)
    // {
    //     this.handlers.set(event_type, callback);
    // }


    // /**
    //  * Função responsável por redirecionar cada tipo de notificação de evento disparada ao seu handler específico.
    //  * @param {*} event_type Tipo de evento.
    //  * @param {*} data Dados enviados para os handlers de evento.
    //  */
    // handleEvent(event_type, data)
    // { 
    //     if(this.handlers?.has(event_type)){ this.handlers.get(event_type)(data); }
    //     else { throw new Error(`O handler para eventos do tipo ${event_type} não existe.`); }
    // }
};

export default Observer;