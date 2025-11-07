// Gerenciadores
import GraphLayerManager    from './GraphLayer/GraphLayerManager.js';

// Systems
import RenderSystem         from './systems/RenderSystem.js';

// Extensões de classe
import Observer             from './Observer/Observer.js';
import Publisher            from './Observer/Publisher.js';

// Outros
import Shape    from './components/Shape.js';
import Entity   from './Entity.js';

import { composeEntity, composeGeneric } from "./utils/compose.js";

import Sprite from './components/Sprite.js';


// TODO Documentar classe.
export default class Scene// extends composeGeneric(Observer, Publisher)
{
    #eventBus;

    /**
     * Construtor de `Scene`.
     * @param {Number} CANVAS_W Largura do canvas.
     * @param {Number} CANVAS_H Altura do canvas.
     * @param {CanvasRenderingContext2D} CANVAS_CTX Contexto do canvas.
     * @param {Object} options Objeto contendo configurações específicas para a cena.
     */
    constructor(eventBus, world)
    {
        this.#eventBus = eventBus;

        /** Instância de `World` herdado de `Game`. */
        this.world = world;

        // Gerenciador de camadas de gráficos na cena.
        this.graphLayers = new GraphLayerManager();

        this.paused = false;
    }


    // TODO Documentar método.
    createEntity(name, config = {})
    { return this.world.createEntity(name, this, config); }


    // TODO Registrar evento para mais de uma tecla ao mesmo tempo via matriz de teclas.
    /**
     * Cria um handler para determinada tecla pressionada.
     * @param {*} key
     * @param {*} callback
     */
    onKeyPressed(key, callback)
    {
        if(typeof key != 'string') throw new Error("A chave de input deve ser descrita por uma string.");

        /** Contexto para o evento disparado. */
        const context = {transform: this.world.getSystem("transform")};

        this.#eventBus.on("key_pressed", data =>
        {
            if(data.key_code !== key || !data.is_active) return;

            callback(context);
        });

        return callback;
    }


    update(delta)
    {
    
    };

    
    pause()
    {
        this.paused = true;
        
    };

    resume(){ this.paused = false; };
}