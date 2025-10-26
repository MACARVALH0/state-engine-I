import AssetManager from './AssetManager/AssetManager.js';
import SceneManager from "./SceneManager.js";
import Scene        from "./Scene.js";

import Observer     from "./Observer/Observer.js";
import Publisher    from "./Observer/Publisher.js";

import { composeGeneric } from "./utils/compose.js";
import EventBus from './EventBus.js';
import World from './World.js';
import RenderSystem from './systems/RenderSystem/RenderSystem.js';


// TODO Documentar classe.
export default class Game // extends composeGeneric(Observer, Publisher);
{
    /**
     *  Construtor da classe.
     * @param {Object} canvas
     * @param {Object} config
     */
    constructor(canvas, config = {})
    {
        // super();

        /** Gerenciador de assets do game. */
        // this.assetManager = new AssetManager();

        // Restrição de segurança.
        if(!(canvas instanceof HTMLCanvasElement)){ throw new Error("O argumento do construtor deve ser um elemento <canvas> do HTML. (HTMLCanvasElement"); }

        // Cache do canvas na instância de `Game`.
        this.canvas = canvas;

        /** Event bus central do game. */
        this.event_bus = new EventBus();

        /** Abstração de World */
        this.world = new World(this.event_bus);
            this.world.addSystem( "render", new RenderSystem(config["renderer"] ?? 'canvas-renderer', this.canvas) ); // Adiciona o sistema de renderização.

        /** Gerenciador de cenas do game. */
        this.sceneManager = new SceneManager(this.world);

        /** ID do laço de execuçãos. */
        this.loop_id = undefined;


        /**
         * Período transpassado desde o último carregamento do contexto de `window`.
         * Serve para o cálculo de tempo a cada atualização no contexto.
         */
        this.last_update = undefined;
    }


    /**
     * Cria uma nova cena.
     * 
     * @param {Number} width Opcional. Valor de largura customizada para a nova cena. Caso não esteja presente, assume a largura do canvas.
     * @param {Number} height Opcional. Valor de altura customizada para a nova cena. Caso não esteja presente, assume a altura do canvas.
     * @param {Object} options Objeto de configurações relacionadas à instância de `Scene` que será criada.
     */
    createScene(options = {}){ return this.sceneManager.createScene(options); }


    /**
     * Define o caminho para os assets (arquivos estáticos) do jogo.
     * 
     * @param {String} path Caminho para diretório de arquivos estáticos. 
     */
    defineAssetsPath(path)
    {
        if(!this.assetManager){ this.assetManager = AssetManager.create(path); }
        else return;
    }


    /** Inicia o loop principal da instância de `Game`. */
    start()
    {
        this.last_update = performance.now();

        this.update = this.update.bind(this);
        requestAnimationFrame(this.update);
    }


    /**
     * Função callback que será executada em loop e armazenada como atributo na instância de game, para possibilidade futura de pausa.
     * É uma *arrow function*, para manter o contexto de `Game`.
     * 
     * Cada vez que `requestAnimationFrame` chama `gameLoop`, aquela passa como argumento o atual tempo de execução do programa, o que é importante aqui.
     * 
     * @param {Number} current_time Tempo de execução do programa, passado por `requestAnimationFrame`.
     */
    update(current_time)
    {
        // console.log("...");
        const delta = (current_time - this.last_update) / 1000; // Tempo que passou, em segundos.
        this.last_update = current_time;

        // // // ROTINA PRINCIPAL // // //

            this.world.update(delta)
            this.sceneManager.update(delta); // Atualizar cenas do `sceneManager`.

        // // // // // // // // // // // //

        this.loop_id = requestAnimationFrame(this.update); // Invoca a próxima execução de gameLoop.
    }

    /* OBSOLETO */
    // setupKeyboard()
    // {
    //     if(this.keyboard_control) return;
    //     this.keyboard_control = Object.entries(controls).vkey.map( ([key, _code_string]) =>{ return [key, false]; } )
    // }
}