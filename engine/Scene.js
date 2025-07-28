import Observer         from './Observer/Observer.js';
import Publisher        from './Observer/Publisher.js';

import TileMapLayer     from './TileMapLayer.js';
import CanvasRenderer   from './renderer/CanvasRenderer.js';
import RenderSystem     from './systems/RenderSystem.js';

import { composeGeneric } from "./utils/compose.js";

const scene_composition = composeGeneric(Observer, Publisher);

// TODO Documentar classe.
export default class Scene extends scene_composition
{
    /**
     * @param {int} CANVAS_W Largura do canvas.
     * @param {int} CANVAS_H Altura do canvas.
     * @param {CanvasRenderingContext2D} ctx Contexto do canvas.
     */
    constructor(CANVAS_W, CANVAS_H, ctx)
    {
        super();
        // TODO Documentar atributos.

        this.canvas_w = CANVAS_W;
        this.canvas_h = CANVAS_H;
        this.ctx = ctx;

        /** Conjunto de entidades/objetos presentes no jogo ou em determinada cena. */
        this.entities = [];

        this.systems = new Map
        ([
            ["render", new RenderSystem(new CanvasRenderer(this.ctx))],
            // ["physics", new PhysicsSystem()]
        ])

        /** Tile Map da cena. Armazena as instâncias de `TileMapLayer` da cena. É inicializado com um `TileMapLayer`.*/
        this.tilemap = [new TileMapLayer(undefined, this.canvas_w, this.canvas_h, {})];
    }


    /** Adiciona uma entidade de objeto simples ao conjunto de elementos do jogo. */
    addSimpleEntity(entity){ this.entities.push(entity); }

    /**
     * Adiciona uma entidade composta ao conjunto de elementos no objeto do jogo.
     * @param {String} name Nome referenciável do objeto.
     * @param {ComposedClass} Composition Composição de classe base + mixins de propriedades.
     * @param  {...any} config Itens de configuração das propriedades dos mixins.
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
    }


    update(delta){}

    render(){}

    pause(){}

    resume(){};
}