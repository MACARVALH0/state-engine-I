import vkey from "./virtualKeyboardSetup.js";

const key_control = Object.entries(controls).vkey.map( ([key, _code_string]) =>{ return [key, false]; } )

class Keyboard
{
    check(key_code){ return key_control.get(key_code); }
    
    update_key_state(key_code){ key_control.set(key_code, active); }
}

export default new Keyboard();