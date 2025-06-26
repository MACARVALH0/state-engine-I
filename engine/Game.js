import SceneManager from "./SceneManager.js";
import Scene        from "./Scene.js";

export default class Game
{
    constructor(canvas_html_obj)
    {
        // Checando se o argumento é um objeto.
        if(typeof(canvas_html_obj) != 'object'){ throw new Error("O argumento passado para o construtor deve ser um objeto"); }
    
        // Tenta definir as propriedades básicas de largura, altura e contexto.
        try
        {
            /** Largura do canvas. */
            this.canvas_width = canvas_html_obj.width;

            /** Altura do canvas. */
            this.canvas_height = canvas_html_obj.height;

            /** Contexto do canvas. */
            this.ctx = canvas_html_obj.getContext('2d');

        } catch(e){ throw new Error("O argumento do construtor deve ser um elemento \`canvas\` HTML."); }

        /** Gerenciador de cenas do jogo. */
        this.sceneManager = new SceneManager();

        /** ID da animação. */
        this.loop_id = undefined;
    }

    /**
     * Cria uma nova cena.
     * 
     * @param {Number} width Valor de largura customizada para a nova cena. Caso não esteja presente, assume a largura do canvas.
     * @param {Number} height Valor de altura customizada para a nova cena. Caso não esteja presente, assume a altura do canvas.
     */
    createScene(width, height)
    {
        this.sceneManager.push(new Scene
            (
                width ?? this.canvas_width,
                height ?? this.canvas_height,
                this.ctx
            ));
    }

    loop()
    {
        let last_time = performance.now();

        /**
         * Função callback que será executada em loop e armazenada como atributo na instância de game, para possibilidade futura de pausa.
         * É uma *arrow function*, para manter o contexto de `Game`.
         * 
         * Cada vez que `requestAnimationFrame` chama `gameLoop`, aquela passa como argumento o atual tempo de execução do programa, o que é importante aqui.
         * 
         * @param {Number} current_time Tempo de execução do programa, passado por `requestAnimationFrame`.
         */
        const gameLoop = (current_time) =>
        {
            const delta = (current_time - last_time) / 1000; // Tempo que passou, em segundos.
            last_time = current_time;

            // ROTINA PRINCIPAL //

            this.update(delta);
            this.render(this.ctx);
            // // // // // // //

            this.loop_id = requestAnimationFrame(gameLoop); // Invoca a próxima execução de gameLoop.
        }

        requestAnimationFrame(gameLoop); // Invoca a primeira execução de `gameLoop`;
    }


    update(delta)
    {
        this.sceneManager.update(delta);
    }

    render()
    {
    }
}