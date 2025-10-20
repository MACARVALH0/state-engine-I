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

import * as behaviors from "./behaviors/behaviors.js"
import Sprite from './components/Sprite.js';


// TODO Documentar classe.
export default class Scene extends composeGeneric(Observer, Publisher)
{
    /**
     * Construtor de `Scene`.
     * @param {Number} CANVAS_W Largura do canvas.
     * @param {Number} CANVAS_H Altura do canvas.
     * @param {CanvasRenderingContext2D} CANVAS_CTX Contexto do canvas.
     * @param {Object} options Objeto contendo configurações específicas para a cena.
     */
    constructor(CANVAS_W, CANVAS_H, CANVAS_CTX, options)
    {
        super();
        
        this.canvas_w = CANVAS_W;
        this.canvas_h = CANVAS_H;


        this.entity_ids = new Set();
        
        /** Conjunto de entidades/objetos presentes na cena atual. */
        this.entities = [];

        /** Sistemas presentes na cena. */
        this.systems = new Map
        ([
            ["render", new RenderSystem( options["renderer"] ?? 'canvas-renderer', CANVAS_CTX )],
            // ["physics", new PhysicsSystem()]
        ]);

        // Gerenciador de camadas de gráficos na cena.
        this.graphLayers = new GraphLayerManager();

        this.paused = false;
    }



    createEntity(name, ...config)
    {
        // Lança um erro caso haja a tentativa de criar uma entidade com um nome que já existe.
        if(this.entity_ids.has(name)){ throw new Error("Já existe uma entidade com esse identificador."); }

        // FIXME Isso aqui obviamente precisa de uma melhorada.
        const { Animatable, Cacheable, Controllable, Movable, PhysicalObject2D, Positional, Visible } = behaviors;

        // Top repetições dos animes...
        const entity_composition = composeEntity( Animatable, Cacheable, Controllable, Movable, PhysicalObject2D, Positional, Visible );

        // Cria a instância da entidade.
        const entity = new entity_composition(name, ...config);

        // Adiciona id da entidade à lista. Serve para acesso posterior.
        this.entity_ids.add(name);

        // Verifica o pertencimento da entidade nos sistemas registrados.
        for(let [_, system] of this.systems){ system.register(entity); }

        // entity.subscribe()

        return entity;
    }




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
    createView(kind, config)
    {
        if(!kind) throw new Error("Uma string `kind` identificadora é obrigatória.");

        if(kind == "Shape")         return this.createView_Shape(config);
        else if(kind == "Sprite")   return this.createView_Sprite(config);

        else throw Error("Especifique o tipo de visualização a ser criada.")
    }


    /**
     * Cria uma view do tipo "Shape".
     * @param  {object} config Configurações relacionadas à view.
     * @returns {Shape}
     */
    createView_Shape(config)
    {
        const cx = config["cx"] ?? 0;
        const cy = config["cy"] ?? 0;

        const initial_a = config["a"] ?? 0;

        const COLOR = config["color"] ?? undefined;
        const BORDER_COLOR = config["border_color"] ?? undefined;

        const n_sides = config["n_sides"] && config["n_sides"] > 2
        ? config["n_sides"]
        : 3;

        const TWO_PI = 2*Math.PI;
        const step_angle = TWO_PI / Math.round(n_sides);

        // Raio da forma.
        const r = config["radius"] ?? 1;

        const width  =  config["width"]  ?? r; // Largura inicial da forma.
        const height =  config["height"] ?? r; // Altura inicial da forma.

        // Pontos dos vértices da forma.
        const points = Array.from({ length: n_sides }, (_, index) =>
        {
            const a = initial_a + step_angle*index;

            const x = step_angle + width  * Math.cos(a);
            const y = step_angle + height * Math.sin(a);

            // Adiciona o par ordenado do ponto à array de pontos.
            return [cx+x, cy+y];
        });

        return new Shape( {color: COLOR, border_color: BORDER_COLOR, points} );
    }


    /**
     * Cria uma view do tipo "Sprite".
     * @param  {object} config 
     * @returns {Sprite}
     */
    createView_Sprite(...config)
    {
        const TEXTURE_SRC = config["img_src"] ?? undefined;

        return new Sprite( {texture_src: TEXTURE_SRC} );
    }


    /**
     * Atribui uma view a uma entidade.
     * @param {Entity} entity `Entity` que receberá o atributo.
     * @param {Shape | Sprite} view View a ser aplicada.
     * @returns {void}
     */
    assignView(entity, view)
    {
        if(!entity.view) throw new Error("Não é possível assinalar uma propriedade `view` a uma entidade que não possui o comportamento `Visible`.");

        // TODO Talvez, no futuro, criar um esquema de caching de visualizações, para acesso mais rápido à view anterior ao custo de memória.
        entity.view = view;

        entity.view_type = Object.getPrototypeOf(view).constructor.name;
    }



    update(delta)
    {
        this.systems.forEach((system) =>
        {
            system.update(delta);
        });
    };

    
    pause(){ this.paused = true; };

    resume(){ this.paused = false; };
}