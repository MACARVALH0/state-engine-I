export default class KeyboardInputSystem
{
    constructor(eventBus)
    {
        this.eventBus = eventBus;

        // TODO Eventualmente, se necessário, utilizar funções nomeadas para garantir a possibilidade de pausa do sistema.
        window.addEventListener("keydown", e => this.handleInput(e, true));
        window.addEventListener("keyup",   e => this.handleInput(e, false));
    }

    // TODO Documentar método.
    handleInput(event, is_active)
    {
        // Evita um processamento avançado para eventos disparados sequencialmente com a tecla pressionada, por motivos de eficiência.
        if(event.repeat) return;

        /** Código da chave. */
        const key_code = event.code;

        // Emite evento de input da tecla.
        this.eventBus.emit("key_input", {key_code, is_active});
    }
}


// import vkey from "../../virtualKeyboardSetup.js"

// import EventManager from "./Observer/EventManager.js";
// import EntitySystem from "../EntitySystem.js";

// /** Mapa de elementos tecla-boolean indicando se determinada tecla está ou não ativa. */
// const key_switch = Object.entries(vkey).map( ([_, code_string]) => [code_string, false] )
// const key_control = new Map(key_switch);

// /** Processa a mudança de estados de teclas fora do escopo de classe, para maior segurança. */
// function handleKeyboardInput(event, active)
// {
//     // Evita um processamento avançado para eventos disparados sequencialmente com a tecla pressionada, por motivos de eficiência.
//     if(event.repeat) return;

//     const key_code = event.code;
//     key_control.set(key_code, active);
// }

// class KeyboardInputSystem
// {
//     constructor(eventBus)
//     {
//         this.eventBus = eventBus;
//         // this.eventManager = new EventManager();

//         this.onKeyDown = e => { handleKeyboardInput(e, true);  }
//         this.onKeyUp   = e => { handleKeyboardInput(e, false); }
//     }


//     /** Inicializa listeners globais para o teclado. */
//     startGlobalListener()
//     {
//         window.addEventListener("keydown", this.onKeyDown);
//         window.addEventListener("keyup", this.onKeyUp);
//     }


//     /** Encerra listeners globais para o teclado. */
//     finishGlobalListener()
//     {
//         window.removeEventListener("keydown", this.onKeyDown);
//         window.removeEventListener("keyup", this.onKeyUp);
//     }


//     check(key_code){ return key_control.get(key_code); }


//     update_key_state(key_code, active){ key_control.set(key_code, active); }
// }



// export default new Proxy ( new Keyboard(),
// {
//     set(obj, attr, value)
//     { throw new Error("As propriedades na instância de \`Keyboard\` não devem ser alteradas."); }
// });