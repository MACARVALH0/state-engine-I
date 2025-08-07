import CanvasRenderer from "../renderer/CanvasRenderer.js";


// TODO Documentar classe.
export default class RenderSystem
{
    constructor(renderer_opt, canvas)
    {
        const { Renderer, ctx } = this.getRenderer(renderer_opt, canvas);
        this.renderer = new Renderer(ctx); // Instância do renderer.

        // Cache de entidades que compoem o sistema.
        this.entities = new Set();
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

    /** Registra uma `Entity` no sistema se a mesma cumprir com certos requisitos. */
    register(entity)
    {
        if(entity.has('x', 'y', 'is_visible')){ this.entities.add(entity); }
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
     * Atualiza a cena com base em `delta`.
     * @param {Number} delta Inteiro representando a quantidade de segundos passados entre um frame e outro.
     */
    update(delta)
    {
        for(let entity of this.entities)
        {
            this.renderer.drawSprite(entity.texture, entity.x, entity.y);
        }
    }
}