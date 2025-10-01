import TileMapLayer     from './TileMapLayer.js';
import AssetManager     from './AssetManager/AssetManager.js';

import RenderSystem     from './systems/RenderSystem.js';

import Observer         from './Observer/Observer.js';
import Publisher        from './Observer/Publisher.js';
import { composeEntity, composeGeneric } from "./utils/compose.js";
import Shape from './components/Shape.js';
import Entity from './Entity.js';

import * as behaviors from "./behaviors/behaviors.js"

const scene_composition = composeGeneric(Observer, Publisher);

// TODO Documentar classe.
export default class Scene extends scene_composition
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

        this.entity_ids = new Set();
        
        /** Conjunto de entidades/objetos presentes na cena atual. */
        this.entities = [];

        /** Sistemas presentes na cena. */
        this.systems = new Map
        ([
            ["render", new RenderSystem( options["renderer"] ?? 'canvas-renderer', CANVAS_CTX )],
            // ["physics", new PhysicsSystem()]
        ]);

        /** Tile Map da cena. Armazena as instâncias de `TileMapLayer` da cena. É inicializado com um `TileMapLayer`.*/
        this.tilemap = [new TileMapLayer(undefined, CANVAS_W, CANVAS_H, {})];

        this.assetManager = new AssetManager();

        this.paused = false;
    }



    /**
     * Adiciona uma entidade composta ao conjunto de elementos no objeto do jogo.
     * @param {String} name Nome referenciável do objeto.
     * @param {ComposedClass} Composition Composição de classe base + mixins de propriedades.
     * @param {...any} config Itens de configuração das propriedades dos mixins.
     * @returns {Entity} Entidade adicionada à cena.
     */
    addComposedEntity(name, Composition, ...config)
    {
        try
        {
            // Criar um objeto com a composição fornecida.
            const entity = new Composition(name, config);

            // DEPRECATED Isso vai contra o padrão ECS...
            // Executa a rotina inicial do objeto composto (caso exista) e verifica se ele está adequado.
            entity.runInitialRoutine();

            // Adiciona objeto ao conjunto de entidades presentes na cena.
            // FIXME Isso aqui precisa ser revisto.
            this.entities.push(entity);

            // FIXME Talvez pensar numa forma de não iterar por todos os sistemas a fim de registrar a entidade.
            for(let [_, system] of this.systems){ system.register(entity); }

            return entity;
        }

        catch(err)
        {
            if(name) console.error(`Não foi possível criar o objeto composto "${name}":\n`, err);
            else console.error("Não foi possível criar o objeto composto:\n", err);
        }
    };


    addComposedEntity1(name, ...config)
    {
        if(this.entity_ids.has(name)){ throw new Error("Já existe uma entidade com esse identificador."); }

        // FIXME Isso aqui obviamente precisa de uma melhorada.
        const { Animatable, Cacheable, Controllable, Movable, PhysicalObject2D, Positional, Visible } = behaviors;

        // Top repetições dos animes...
        const entity_composition = composeEntity( Animatable, Cacheable, Controllable, Movable, PhysicalObject2D, Positional, Visible );

        const entity = new entity_composition(name, ...config);

        this.entity_ids.add(name);

        // Atualmente sem utilidade.
        // this.entities.push(entity);

        // Verifica o pertencimento da entidade nos sistemas registrados.
        for(let [_, system] of this.systems){ system.register(entity); }

        return entity;
    }


    // FIXME Provisório.
    /**
     * Cria uma polígono com dado número de lados.
     * @param {*} n_sides Número de lados do polígono.
     * @param  {...any} options
     * @returns {Shape} Uma referência para o objeto que representa a forma. 
     */
    createShapeEntity(n_sides, ...options)
    {
        const TWO_PI = 2*Math.PI;
        const angle = TWO_PI / Math.round(n_sides);

        const r = options["r"] ?? 32;

        const points = [];

        const width =   options["width"]  ?? r;
        const height =  options["height"] ?? r;

        for(let i = 1; i < n_sides; i++)
        {
            const a = angle*i;

            const x = angle + width  * Math.cos(a);
            const y = angle + height * Math.sin(a);

            // Adiciona o par ordenado do ponto à array de pontos.
            points.push([x, y]);
        }

        const entity_composition = composeEntity(Shape);

        const entity = new entity_composition(points);

        // Adiciona objeto ao conjunto de entidades presentes na cena.
        // FIXME Isso aqui precisa ser revisto.
        this.entities.push(entity);

        // FIXME Talvez pensar numa forma de não iterar por todos os sistemas a fim de registrar a entidade.
        for(let [_, system] of this.systems){ system.register(entity); }

        return entity;
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