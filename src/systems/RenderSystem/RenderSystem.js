import CanvasRenderer from "../../renderer/CanvasRenderer.js";
import EntitySystem from "../EntitySystem.js";


// TODO Documentar classe.
export default class RenderSystem// extends EntitySystem
{
    constructor(renderer_opt, canvas)
    {
        const { Renderer, ctx } = this.getRenderer(renderer_opt, canvas);
        this.renderer = new Renderer(ctx); // Instância do renderer.

        this.screen_width = canvas.width;
        this.screen_height = canvas.height;

        /** Cache de entidades que compoem o sistema. */
        this.entities = new Set();
    }

    // TODO Pensar numa forma de atribuir a cada entidade sua respectiva função de desenho.


    /** Registra uma `Entity` no sistema se a mesma cumprir com certos requisitos. */
    register(entity)
    {
        // Propriedades que devem ser encontradas na entidade para registrá-la no sistema.
        const props = ['x', 'y'];
        if
        (
            props.every( p => p in entity)
            && entity.is_visible
        )
        { this.entities.add(entity); }
    }


    /**
     * Retorna o renderer definido para o sistema de renderização.
     * @param {String} opt Nome do renderer solicitado.
     * @param {HTMLCanvasElement} canvas Elemento `<canvas>` que provê o `CanvasRenderingContext2D` da cena.
     * @returns Objeto `{Renderer, ctx}`.
     */
    getRenderer(opt, canvas)
    {
        if(opt == 'canvas-renderer'){ return { Renderer: CanvasRenderer, ctx: canvas.getContext('2d') } }
        // if(opt == 'outro-renderer'){}
    }


    /**
     * Retorna o objeto `ImageData` do canvas, desde o `RenderSystem`.
     * @param {Number} x Posição `x` do canvas.
     * @param {Number} y Posição `y` do canvas.
     * @param {Number} width Quantidade de pixels representando a largura desde a posição `x`.
     * @param {Number} height Quantidade de pixels representando a altura desde a posição `y`.
     * @returns {ImageData} Interface que representa os dados subjacentes dos pixels de uma área do elemento `<canvas>`.
     */
    getImageData(x, y, width, height){ return this.renderer.getImageData(x, y, width, height); }

    /**
     * Invoca o método principal de desenho do renderer atual.
     * @param {Entity} entity 
     */
    draw(entity){ this.renderer.draw(entity); }

    /**
     * Atualiza a cena com base em `delta`.
     * @param {Number} delta Inteiro representando a quantidade de segundos passados entre um frame e outro.
     */
    update(delta)
    {
        this.renderer.cleanScreen(this.screen_width, this.screen_height);
        for(let entity of this.entities){ this.draw(entity); }
    }

    // TODO Documentar método.
    // draw(texture, x,  y){ this.renderer.draw(texture, x, y); }

    // /**
    //  * Atualiza a cena com base em `delta`.
    //  * @param {Number} delta Inteiro representando a quantidade de segundos passados entre um frame e outro.
    //  */
    // update(delta)
    // {
    //     this.renderer.cleanScreen(this.screen_width, this.screen_height);

    //     for(let entity of this.entities)
    //     {
    //         this.draw(entity.texture, entity.x, entity.y);
    //     }
    // }
}