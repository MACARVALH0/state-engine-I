import  Game        from "./Game";
import  Keyboard    from "./Keyboard";

class State
{
    constructor()
    {
        // INPUTS
        this.keyboard = Keyboard;

        this.game;
        this.sound;

        /** Mapa no modelo {tipo_de_evento, handler} */
        this.handlers = new Map
        ([
            ["scene_created", (e)=>{}], // Handler para requisição de teclado a partir da última instância de `Scene`.
            ["scene_deleted", (e)=>{}]
        ]);
    }

    // TODO Talvez, definir uma classe `MasterHandler` (ou algo assim), que leva em si o método de redirecionamento.
    /** Função responsável por redirecionar cada tipo de notificação de evento disparada ao seu handler específico. */
    handleEvent(event_type, data)
    { if(this.handlers?.has(event_type)){ this.handlers.get(event_type)(data); } else { throw new Error(`O handler para eventos do tipo ${event_type} não existe.`); } }


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

            /// Eventos de `Game` ouvidos por `State`.
            // game_obj.eventManager.subscribe(this, "scene_created");

            
        } catch (err)
        { throw new Error(`Houve um problema na criação do objeto \`Game\`.\nMotivo:\n${err}`); }

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