import CanvasRenderer from "../renderer/CanvasRenderer.js";


// TODO Documentar classe.
export default class RenderSystem
{
    constructor(renderer_opt, canvas)
    {
        const {Renderer, ctx} = this.getRenderer(renderer_opt, canvas);
        this.renderer = new Renderer(ctx); // Instância do renderer.

        // Cache de entidades que compõem o sistema.
        this.entities = new Set();
    }

    // TODO Documentar método.
    getRenderer(opt, canvas)
    {
        if(opt == 'canvas-renderer'){ const ctx = canvas.getContext('2d'); return { CanvasRenderer, ctx } }
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

    // TODO Documentar método.
    update(delta)
    {
        for(let entity of this.entities)
        {
            this.renderer.drawSprite(entity.texture, entity.x, entity.y);
        }
    }
}