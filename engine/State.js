import  Observer    from "./Observer/Observer.js";
import  Publisher   from "./Observer/Publisher.js";
import  Game        from "./Game.js";
import  keyboard    from "./Keyboard.js";

import { composeGeneric } from "./utils/compose.js";


// TODO Documentar classe `State`.
const state_composition = composeGeneric(Observer, Publisher);

class State extends state_composition
{
    constructor()
    {
        super();

        // INPUTS
        this.keyboard = keyboard;

        this.game;
        this.sound;
    }


    /**
     * Função responsável por criar uma instância de `Game` na engine.
     * @param {HTMLCanvasElement} canvas Elemento de canvas no HTML onde o jogo será renderizado.
     */
    createGame(canvas)
    {
        if(this.game){ throw new Error("Uma instância de \`Game\` já existe."); }

        // Garante que um elemento do tipo `HTMLCanvasElement` será passado como argumento.
        const game_obj = new Game(canvas ?? document.querySelector("canvas") ?? document.createElement("canvas"));

        try
        {
            /// Eventos do teclado ouvidos pelo game_obj.
            this.keyboard.eventManager.subscribe(game_obj, "key_down", "key_up", "key_pressed");

            this.keyboard.startGlobalListener();

            
        } catch (err)
        { throw new Error(`Houve um problema na criação do objeto \`Game\`.\nMotivo:\n${err}`); }
        
        
        this.game = game_obj;
        return this.game; 
    }

}





export default new Proxy( new State(),
{
    set(obj, attr, value)
    {
        if(attr == 'keyboard'){ throw new Error("Não é possível alterar a configuração do teclado predefinido."); }
        
        if(attr == 'game')
        {
            obj.keyboard.eventManager.unsubscribe(obj.game, "key_down", "key_up", "key_pressed");
            // throw new Error("Não é possível alterar a instância de `Game` dessa forma.");
        }
        
        obj[attr] = value;
        return true;
    }
});