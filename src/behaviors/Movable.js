/**
 * Classe de objetos com propriedades de movimentação.
 */
const Movable = Base => class extends Base
{
    /**
     * Classe de objetos com propriedades de movimentação.
     */
        /**
     * @param {*} config Objeto com definições de propriedades físicas.
     */
    constructor(name, config)
    {
        super(name, config);
        console.log("- Movable");
    
        /* UP | RIGHT | DOWN | LEFT */
        this.moves = [false, false, false, false];
    }
     
}

export default Movable;