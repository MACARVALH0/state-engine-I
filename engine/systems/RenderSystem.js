// TODO Documentar classe.
export default class RenderSystem
{
    constructor(renderer)
    {
        this.renderer = renderer;
        this.entities = new Set();
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