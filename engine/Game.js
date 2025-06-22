import SceneManager from "./SceneManager.js";

class Game
{
    constructor()
    {
        this.canvas = {width: CANVAS_W, height: CANVAS_H};
        this.ctx = ctx;

        this.sceneManager = new SceneManager();

        this.loop_id = undefined;
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