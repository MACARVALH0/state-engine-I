// TODO Documentar classe.
const Transform = Base => class extends Base
{
    #n_vertices;
    #vertices;

    constructor(name, config)
    {
        super(name, config);
        
        this.x = config['x'] ?? 0;
        this.y = config['y'] ?? 0;
        
        this.w = config["width"]  ?? 2;
        this.h = config["height"] ?? 2;

        this.width = config['width']  ?? 64;
        this.height = config['height'] ?? 64;

        this.center_x = this.x + (this.width/2);
        this.center_y = this.y + (this.height/2);

        this.scale_x = config['scale_x'] ?? 0;
        this.scale_y = config['scale_y'] ?? 0;

        this.angle = config['angle'] ?? 0;

        this.radius = config.shape?.radius ?? 1;
        
        this.n_vertices = config.shape?.vertices >= 3 ? Math.round(config.shape?.vertices ?? 4) : 3;
        this.vertices = [] // TODO Eventualmente, mudar para `shape.vertices`.
        this.visible_vertices = true;
    }
}

export default Transform;