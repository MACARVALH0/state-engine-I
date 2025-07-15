const controls = 
{
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",

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

    d0: "Digit0",
    d1: "Digit1",
    d2: "Digit2",
    d3: "Digit3",
    d4: "Digit4",
    d5: "Digit5",
    d6: "Digit6",
    d7: "Digit7",
    d8: "Digit8",
    d9: "Digit9",

    n0: "Numpad0",
    n1: "Numpad1",
    n2: "Numpad2",
    n3: "Numpad3",
    n4: "Numpad4",
    n5: "Numpad5",
    n6: "Numpad6",
    n7: "Numpad7",
    n8: "Numpad8",
    n9: "Nu",

    nDivide: "NumpadDivide",
    nMultiply: "NumpadMultiply",
    nSubtract: "NumpadSubtract",
    nAdd: "NumpadAdd",
    nComma: "NumpadComma",
    nDecimal: "NumpadDecimal",
    
    l_shift: "ShiftLeft",
    r_shift: "ShiftRight",
    tab: "Tab",
    space: "Space",
    backspace: "Backspace",
};

const vkey = new Proxy( controls,
{ 
    set(){ throw new Error("Não é permitido alterar a configuração dos controles predefinidos."); },

    deleteProperty(){ throw new Error("Não é permitido deletar propriedades dos controles predefinidos."); }
});

export default vkey;