export default class ShapeSystem
{
    constructor()
    {
        this.entities = new Set();
    }

    /** Registra uma instância `Entity` no sistema se a mesma cumprir com certos requisitos. */
    register(entity)
    {
        if(entity.view?.view_type == "shape")
    { this.entities.add(entity); }

        console.log(this.entities);
    }

    /** Cancela o registro de uma ou mais entidades no sistema. */
    unregister(...entities)
    {
        entities.forEach( entity =>
        {
            this.entities.delete(entity);
        });
    }

    moveAngle(angle)
    {
        
    }

    update(delta)
    {
        this.entities.forEach( entity =>
        {
            entity.view.points.forEach( point =>
            {
                // point[0] = entity.x + point[0];
                // point[1] = entity.y + point[1];
            });
        });
    }
}