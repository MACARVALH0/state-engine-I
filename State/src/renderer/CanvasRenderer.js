import Shape from "../components/Shape.js";

export default class CanvasRenderer
{
    /**
     * Construtor do `CanvasRenderer`.
     * @param {CanvasRenderingContext2D} context Interface do `CanvasRenderingContext2D`, da API do Canvas para a Web.
     */
    constructor(context)
    {
        this.ctx = context;
    }

    /**
     * Retorna o objeto `ImageData` do canvas, desde o `CanvasRenderer`.
     * @param {Number} x Posição `x` do canvas.
     * @param {Number} y Posição `y`do canvas.
     * @param {Number} w Quantidade de pixels representando a largura desde a posição `x`.
     * @param {Number} h Quantidade de pixels representando a altura desde a posição `y`.
     * @returns {ImageData} Interface que representa os dados subjacentes dos pixels de uma área do elemento `<canvas>`.
     */
    getImageData(x, y, w, h){ return this.ctx.getImageData(x, y, w, h); }

    /**
     * Limpa o canvas inteiro.
     * @param {Number} screen_width Largura da tela. 
     * @param {Number} screen_height Altura da tela.
     */
    cleanScreen(screen_width, screen_height){ this.ctx.clearRect(0, 0, screen_width, screen_height); }

    // TODO Documentar método.
    drawImage(texture, x, y)
    {
        if(!texture) return;
        this.ctx.drawImage(texture, x, y);
    }
}