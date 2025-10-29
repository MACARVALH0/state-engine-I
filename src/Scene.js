// Gerenciadores
import GraphLayerManager    from './GraphLayer/GraphLayerManager.js';

// Systems
import RenderSystem         from './systems/RenderSystem/RenderSystem.js';

// Extensões de classe
import Observer             from './Observer/Observer.js';
import Publisher            from './Observer/Publisher.js';

// Outros
import Shape    from './components/Shape.js';
import Entity   from './Entity.js';

import { composeEntity, composeGeneric } from "./utils/compose.js";

import Sprite from './components/Sprite.js';
import EventManager from './Observer/EventManager.js';


// TODO Documentar classe.
export default class Scene// extends composeGeneric(Observer, Publisher)
{
    /**
     * Construtor de `Scene`.
     * @param {Number} CANVAS_W Largura do canvas.
     * @param {Number} CANVAS_H Altura do canvas.
     * @param {CanvasRenderingContext2D} CANVAS_CTX Contexto do canvas.
     * @param {Object} options Objeto contendo configurações específicas para a cena.
     */
    constructor(world)
    {
        /** Instância de `World` herdado de `Game`. */
        this.world = world;

        // Gerenciador de camadas de gráficos na cena.
        this.graphLayers = new GraphLayerManager();

        this.paused = false;
    }


    // TODO Documentar método.
    createEntity(name, config = {})
    { return this.world.createEntity(name, this, config); }


    /**
     * @typedef {Object} Shape_config
     * @property {number} n_sides Número de lados da forma.
     * @property {number} radius Raio da forma.
     * @property {number} width Largura da forma (opcional). Utiliza o raio, caso não especificado.
     * @property {number} height Altura da forma (opcional). Utiliza o raio, caso não especificado.
     * @property {string} color Cor da forma (opcional).
     * @property {string} border_color Cor da borda da forma (opcional).
     */

    /**
     * @typedef {Object} Sprite_config
     * @property {string} img_src Nome do arquivo de imagem. // FIXME (com extensão)
     */

    /**
     * @overload
     * @param {"Shape"} kind
     * @param {Shape_config} config
     * @returns {Shape}
     */

    /**
     * @overload
     * @param {"Sprite"} kind
     * @param {Sprite_config} config
     * @returns {Sprite}
     */

    /**
     * Cria uma visualização para ser aplicada a uma entidade.
     * @param {"Shape" | "Sprite"} kind 
     * @param  {Shape_config | Sprite_config} config 
     */
    createView(kind, config = {})
    { return this.world.createView(kind, config); }


    /**
     * Cria uma view do tipo "Shape".
     * @param  {object} config Configurações relacionadas à view.
     * @returns {Shape}
     */
    createView_Shape(config = {})
    { return this.world.createView_Shape(config); }


    /**
     * Cria uma view do tipo "Sprite".
     * @param  {object} config 
     * @returns {Sprite}
     */
    createView_Sprite(config = {})
    { return this.world.createView_Sprite(config); }


    /**
     * Atribui uma view a uma entidade.
     * @param {Entity} entity `Entity` que receberá o atributo.
     * @param {Shape | Sprite} view View a ser aplicada.
     * @returns {void}
     */
    assignView(entity, view)
    { return this.world.assignView(entity, view); }


    update(delta)
    {
    
    };

    
    pause()
    {
        this.paused = true;
        
    };

    resume(){ this.paused = false; };
}