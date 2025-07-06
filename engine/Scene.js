// import Publisher     from './Observer/Publisher.js';
import TileMapLayer from './TileMapLayer.js';
import EventManager from './Observer/EventManager.js';

export default class Scene
{
    /**
     * @param {int} CANVAS_W Largura do canvas.
     * @param {int} CANVAS_H Altura do canvas.
     * @param {CanvasRenderingContext2D} ctx Contexto do canvas.
     */
    constructor(CANVAS_W, CANVAS_H, ctx)
    {
        // TODO Documentar atributos.

        this.canvas_w = CANVAS_W;
        this.canvas_h = CANVAS_H;
        this.ctx = ctx;

        /** Conjunto de entidades/objetos presentes no jogo ou em determinada cena. */
        this.entities = [];

        /** Conjunto de objetos visíveis na cena. Serve para facilitar alguns processos que só devem ocorrer com elementos visíveis na tela. */
        this.visible = [];

        /** Tile Map da cena. Armazena as instâncias de `TileMapLayer` da cena. É inicializado com um `TileMapLayer`.*/
        this.tilemap = [new TileMapLayer(undefined, this.canvas_w, this.canvas_h, {})];

        this.eventManager = new EventManager();
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
            // TODO Check if object has "Visible" attribute (if possible) and add it to a specific array of entities to be rendered.

            // Cria um objeto com a composição fornecida.
            const entity = new Composition(name, config);

            // Executa a rotina inicial de um objeto composto e verifica se ele está adequado.
            entity.runInitialRoutine();

            // Notifica a instância de `Game` de que foi criada uma entidade com os atributos de `Controllable`. 
            if(entity.is_contrlb){this.eventManager.notify("keyboard_req", {})};

            // Adiciona ao conjunto de entidades no objeto do jogo.
            this.entities.push(entity);

            // Checa se objeto é visível e, em caso positivo, adiciona à array `visible`.
            this.visible.push(entity);

            // Retorna uma referência para o objeto adicionado à cena.
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

    // /** Renderiza os elementos visíveis na tela. */
    // draw()
    // {
    //     // Limpa o canvas.
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //     // Desenha o personagem do jogador.
    //     for(player of this.players) this.drawPlayer(player);
    // }

    
    // /** Desenha o personagem do jogador. */
    // drawPlayer(p)
    // {
    //     this.ctx.save();
    //     this.ctx.fillStyle = "rgb(255, 250, 70)";
    //     this.ctx.fillRect(p.x, p.y, p.w, p.h);
    //     this.ctx.restore();
    // }
}