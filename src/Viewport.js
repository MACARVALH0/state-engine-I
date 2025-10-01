/**
 * Classe que define propriedades e métodos para o funcionamento do viewport na engine.
 */
export default class Viewport
{
    /**
     * Setup das configurações principais do viewport.
     * @param {Object} definitions 
     */
    
    /**
     * Setup das configurações principais do viewport.
     * @param {Number} x X-pos inicial do viewport.
     * @param {Number} y Y-pos inicial do viewport.
     * @param {Number} w Largura inicial do viewport.
     * @param {Number} h Altura inicial do viewport.
     */
    constructor(x, y, w, h)
    {
        this.x = config.x ?? 0;
        this.y = config.y ?? 0;

        this.width = config.width ?? 255;
        this.height = config.height ?? 255;
    }
}