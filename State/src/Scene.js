import TileMapLayer     from './TileMapLayer.js';
import AssetManager     from './AssetManager/AssetManager.js';

import RenderSystem     from './systems/RenderSystem.js';

import Observer         from './Observer/Observer.js';
import Publisher        from './Observer/Publisher.js';
import { composeGeneric } from "./utils/compose.js";

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
     */
    addComposedEntity(name, Composition, ...config)
    {
        try
        {
            // Criar um objeto com a composição fornecida.
            const entity = new Composition(name, config);

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