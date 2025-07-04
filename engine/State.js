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
        // Nova instância de `Game`.
        this.game = new Game(canvas ?? document.createElement("canvas")); // Garante que um elemento do tipo `HTMLCanvasElement` será passado como argumento.
    
        
    }


}


export default new Proxy( new State(),
{
    set(obj, attr, value)
    {
        if(attr == 'keyboard'){ throw new Error("Não é possível alterar a configuração do teclado predefinido."); }
        if(attr == 'game')
        {
            // TODO Talvez, programar um caminho para cancelar a inscrição do objeto em todos os eventos.
            obj.keyboard.eventManager.unsubscribe("key_down", obj);
            obj.keyboard.eventManager.unsubscribe("key_up", obj);
            obj.keyboard.eventManager.unsubscribe("key_pressed", obj);
        }
        
        obj[attr] = value;
        return true;
    }
});