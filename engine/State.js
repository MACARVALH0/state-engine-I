import  Game        from "./Game";
import  Keyboard    from "./Keyboard";

class State
{
    constructor()
    {
        // INPUTS
        this.keyboard = new Keyboard();

        this.game;
        this.sound;
    }



    /**
     * Função responsável por criar uma instância de `Game` na engine.
     * @param {HTMLCanvasElement} canvas Elemento de canvas no HTML onde o jogo será renderizado.
     */
    createGame(canvas)
    { 
        const game_obj = new Game(canvas ?? document.createElement("canvas")); // Garante que um elemento do tipo `HTMLCanvasElement` será passado como argumento.
    

        try
        {
            /// Eventos do teclado ouvidos pelo game_obj.
            this.keyboard.eventManager.subscribe(game_obj, "key_down", "key_up", "key_pressed");


        } catch (err)
        {
            
        }

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
            this.keyboard.eventManager.unsubscribe(game_obj, "key_down", "key_up", "key_pressed");
        }
        
        obj[attr] = value;
        return true;
    }
});