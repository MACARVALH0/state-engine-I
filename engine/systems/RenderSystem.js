class RenderSystem
{
    constructor(renderer)
    {
        this.renderer = renderer;
        this.entities = new Set();

    }

    register(entity)
    {
        if(entity.has('x', 'y', 'is_visible')){ this.entities.add(entity); }
    }

    update()
    {
        for(let entity of this.entities)
        {
            // this.renderer.draw
        }
    }
}