const controls = 
{
    up: {code: "ArrowUp", active: false},
    down: {code: "ArrowDown", active: false},
    left: {code: "ArrowLeft", active: false},
    right: {code: "ArrowRight", active: false},

    q: "KeyQ",
    w: "KeyW",
    e: "KeyE",
    r: "KeyR",
    t: "KeyT",
    y: "KeyY",
    u: "KeyU",
    i: "KeyI",
    o: "KeyO",
    p: "KeyP",
    a: "KeyA",
    s: "KeyS",
    d: "KeyD",
    f: "KeyF",
    g: "KeyG",
    h: "KeyH",
    j: "KeyJ",
    k: "KeyK",
    l: "KeyL",
    z: "KeyZ",
    x: "KeyX",
    c: "KeyC",
    v: "KeyV",
    b: "KeyB",
    n: "KeyN",
    m: "KeyM",

    digit0: "Digit0",
    digit1: "Digit1",
    digit2: "Digit2",
    digit3: "Digit3",
    digit4: "Digit4",
    digit5: "Digit5",
    digit6: "Digit6",
    digit7: "Digit7",
    digit8: "Digit8",
    digit9: "Digit9",

    numpad0: "Numpad0",
    numpad1: "Numpad1",
    numpad2: "Numpad2",
    numpad3: "Numpad3",
    numpad4: "Numpad4",
    numpad5: "Numpad5",
    numpad6: "Numpad6",
    numpad7: "Numpad7",
    numpad8: "Numpad8",
    numpad9: "Numpad9",

    numpadDivide: "NumpadDivide",
    numpadMultiply: "NumpadMultiply",
    numpadSubtract: "NumpadSubtract",
    numpadAdd: "NumpadAdd",
    numpadComma: "NumpadComma",
    numpadDecimal: "NumpadDecimal",
    
    shift_l: "ShiftLeft",
    shift_r: "ShiftRight",
    tab: "Tab",
    space: "Space",
    backspace: "Backspace",
};

const vkey = new Proxy( controls,
{ 
    set(){ throw new Error("Não é permitido alterar a configuração dos controles predefinidos."); },

    deleteProperty(){ throw new Error("Não é permitido deletar propriedades dos controles predefinidos."); }
}
)


export default vkey;