// TODO Documentar classe.
const Transform = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);
        
        this.x = config['x'] ?? 0;
        this.y = config['y'] ?? 0;

        this.scale_x = config['scale_x'] ?? 0;
        this.scale_y = config['scale_y'] ?? 0;

        this.rotation = config['rotation'] ?? 0;
    }
}

export default Transform;