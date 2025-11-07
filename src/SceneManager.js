import Scene from "./Scene";

/**
 * Classe do objeto responsável pelo gerenciamento da abastração de cenas do jogo. 
 */
export default class SceneManager
{
    #event_bus;
    #world;
    
    constructor(event_bus, world)
    {
        /** Número máximo de cenas consecutivas permitido. */
        this.MAX_SCENE_NUMBER = 16;

        /** Pilha de cenas do gerenciador. */
        this.stack = [];

        /** Referência para o `EventBus` herdado de `Game`. */
        this.#event_bus = event_bus;

        /** Referência de `World` herdada de `Game`. */
        this.#world = world;
    }

    /**
     * Cria uma nova cena.
     * 
     * @param {Number} width Opcional. Valor de largura customizada para a nova cena. Caso não esteja presente, assume a largura do canvas.
     * @param {Number} height Opcional. Valor de altura customizada para a nova cena. Caso não esteja presente, assume a altura do canvas.
     * @param {Object} options Objeto de configurações relacionadas à instância de `Scene` que será criada.
     */
    createScene(options)
    {
        if(this.stack.length > this.MAX_SCENE_NUMBER) throw new Error("O número máximo de cenas foi excedido.");

        // Define a instância de `Scene` com as informações providenciadas.
        const scene = new Scene (this.#event_bus, this.#world);

        // /*
        //     Espera notificação de:
        //     - Nova entidade criada;
        // */
        // // scene.eventManager.subscribe(this, "entity_created");

        this.push(scene); // Adiciona a cena ao `SceneManager` de `Game`.

        
        this.#world.entities.set(scene, []);

        return scene; // Retorna a instância de `Scene` criada.
    }


    /**
     * Adiciona uma cena à pilha gerenciada pelo `SceneManager`.
     * @param {Scene} scene Uma instância de objeto da classe `Scene`.
     */
    push(scene)
    {
        this.stack.at(-1)?.pause?.();
        this.stack.push(scene);
    }

    /**
     * Remove a última instância de cena e retorna ela. Reativa a cena anterior.
     * @returns Instância de cena removida.
     */
    pop()
    {
        const removed_scene = this.stack.pop(); // Remove a última cena iniciada e armazena em uma variável.
        this.stack.at(-1).resume?.(); // Volta a executar a cena anterior.

        return removed_scene; // Retorna a instância da cena encerrada.
    }

    /**
     * Atualiza a lógica da última cena da pilha.
     * @param {*} delta Refere-se ao "delta time", ou seja, o tempo que passou desde o último frame, em milissegundos.
     */
    update(delta)
    {
        if(!this.stack.at(-1)?.paused) this.stack.at(-1)?.update?.(delta);
    }

    // OBSOLETO
    // /**
    //  * Renderiza os gráficos dos objetos visíveis presentes em **todas** as cenas (`Scene`) na pilha.
    //  * @param {CanvasRenderingContext2D} ctx Objeto de contexto do canvas do jogo.
    //  */
    // render(ctx)
    // {
    //     for(const scene of this.stack)
    //     {
    //         scene.render(ctx);
    //     }
    // }

    /**
     * Renderiza apenas os gráficos dos objetos visíveis da última cena (`Scene`) na pilha.
     * @param {CanvasRenderingContext2D} ctx Objeto de contexto do canvas do jogo.
     */
    renderLast(ctx)
    {
        if(!this.stack.at(-1)?.paused) this.stack.at(-1)?.render?.(ctx);
    }
}