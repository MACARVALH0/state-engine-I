/**
 * Classe de objetos com propriedades físicas.
 */
const PhysicalObject2D = Base => class extends Base
{
    /**
     * @param {*} config Objeto com definições de propriedades físicas.
     */
    constructor(...config)
    {
        super(...config);
        console.log("- PhysicalObject2D");

        /** Posição do objeto. */
        this.pos = {x: config['x'] ?? 0, y: config['y'] ?? 0};
        
        // Velocidade do objeto.
        this.vel = {x: 0, y: 0};

        // Acceleration constants.
        this.acc_x = config['acc_x'] ?? 0;
        this.acc_y = config['acc_y'] ?? 0;

        this.mass = config['mass'] ?? 1;

        this.x_spd = config['x_spd'] ?? 0;
        this.y_spd = config['y_spd'] ?? 0;
    }
}

export default PhysicalObject2D;