/**
 * Classe do objeto responsável pelo gerenciamento da abastração de cenas do jogo. 
 */
export default class SceneManager
{
    constructor()
    {
        /** Pilha de cenas do gerenciador. */
        this.stack = [];
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
        this.stack.at(-1)?.update?.(delta);
    }

    /**
     * Renderiza os gráficos dos objetos visíveis presentes em **todas** as cenas (`Scene`) na pilha.
     * @param {CanvasRenderingContext2D} ctx Objeto de contexto do canvas do jogo.
     */
    render(ctx)
    {
        for(const scene of this.stack)
        {
            scene.render(ctx);
        }
    }

    /**
     * Renderiza apenas os gráficos dos objetos visíveis da última cena (`Scene`) na pilha.
     * @param {CanvasRenderingContext2D} ctx Objeto de contexto do canvas do jogo.
     */
    renderLast(ctx)
    {
        this.stack.at(-1)?.render?.(ctx);
    }
}