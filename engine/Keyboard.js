import vkey from "./virtualKeyboardSetup.js";
import EventManager from "./Observer/EventManager.js";

const key_control = Object.entries(controls).vkey.map( ([key, _code_string]) =>{ return [key, false]; } )

class Keyboard
{
    constructor()
    {
        this.eventManager = new EventManager();
    }


    check(key_code){ return key_control.get(key_code); }
    
    update_key_state(key_code){ key_control.set(key_code, active); }
}

export default new Keyboard();