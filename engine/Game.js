import SceneManager from "./SceneManager.js";
import Scene        from "./Scene.js";
import vkey         from "./virtualKeyboardSetup.js";
import EventManager from "./Observer/EventManager.js";
import Observer     from "./Observer/Observer.js";
import Publisher    from "./Observer/Publisher.js";

import { composeGeneric } from "./utils/compose.js";

const game_composition = composeGeneric(Observer, Publisher);


// TODO Documentar classe.
export default class Game extends game_composition
{
    constructor(canvas)
    {
        super();

        // Checando se o argumento é um objeto.
        if(typeof(canvas) != 'object'){ throw new Error("O argumento passado para o construtor deve ser um objeto"); }
    
        // Tenta definir as propriedades básicas de largura, altura e contexto.
        try
        {
            /** Largura do canvas. */
            this.canvas_width = canvas.width;

            /** Altura do canvas. */
            this.canvas_height = canvas.height;

            /** Contexto do canvas. */
            this.ctx = canvas.getContext('2d');

        } catch(e){ throw new Error(`O argumento do construtor deve ser um elemento \`canvas\` HTML.\n${e}`); }

        /** Gerenciador de cenas do jogo. */
        this.sceneManager = new SceneManager();

        /** ID do laço de execuçãos. */
        this.loop_id = undefined;
    }


    /**
     * Cria uma nova cena.
     * 
     * @param {Number} width Opcional. Valor de largura customizada para a nova cena. Caso não esteja presente, assume a largura do canvas.
     * @param {Number} height Opcional. Valor de altura customizada para a nova cena. Caso não esteja presente, assume a altura do canvas.
     */
    createScene(width, height)
    {
        const MAX_SCENE_NUMBER = 16;
        if(this.sceneManager.stack.length > MAX_SCENE_NUMBER) throw new Error("O número máximo de cenas foi excedido.");

        // Define a instância de `Scene` com as informações providenciadas.
        const scene = new Scene
        (
            width ?? this.canvas_width,
            height ?? this.canvas_height,
            this.ctx
        );

        scene.eventManager.subscribe(this, "keyboard_req"); // `Game` se torna um observer de eventos da instância de `Scene`.

        this.sceneManager.push(scene); // Adiciona a cena ao `SceneManager` de `Game`.

        return scene; // Retorna a instância de `Scene` criada.
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

            // // // // // // //

            this.loop_id = requestAnimationFrame(gameLoop); // Invoca a próxima execução de gameLoop.
        }

        requestAnimationFrame(gameLoop); // Invoca a primeira execução de `gameLoop`;
    }


    /** Método para descrever atualização com base no atributo de Observer. */
    // handleSceneEvent()
    // {
        
    // }

    // handleSceneCreation()
    // {
        
    // }

    update(delta)
    {
        this.sceneManager.update(delta);
    }

    
    /** OBSOLETE */
    setupKeyboard()
    {
        if(this.keyboard_control) return;
        this.keyboard_control = Object.entries(controls).vkey.map( ([key, _code_string]) =>{ return [key, false]; } )
    }
}