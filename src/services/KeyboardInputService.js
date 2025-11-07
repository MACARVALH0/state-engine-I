export default class KeyboardInputService
{
    constructor(eventBus)
    {
        this.eventBus = eventBus;

        // TODO Eventualmente, se necessário, utilizar funções nomeadas para garantir a possibilidade de pausa do sistema.
        window.addEventListener("keydown", this.#onKeyDown);
        window.addEventListener("keyup",   this.#onKeyUp);
    }

    #onKeyDown  = (e) => this.#handleInput(e, true);
    #onKeyUp    = (e) => this.#handleInput(e, false);


    // TODO Documentar método.
    #handleInput(event, is_active)
    {
        // Evita um processamento avançado para eventos disparados sequencialmente com a tecla pressionada, por motivos de eficiência.
        if(event.repeat) return;

        // Emite evento de input da tecla.
        this.eventBus.emit("key_input", { key_code: event.code, is_active });
    }


    dispose()
    {
        window.removeEventListener("keydown", this.#onKeyDown);
        window.removeEventListener("keyup", this.#onKeyUp);
    }
}