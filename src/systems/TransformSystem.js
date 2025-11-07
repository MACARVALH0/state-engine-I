export default class TransformSystem
{
    #event_bus;

    constructor(eventBus)
    {
        this.#event_bus = eventBus;
    }

    setup(entity)
    {
        const props = ['x', 'y', 'width', 'height', "n_vertices"];

        if( !props.every( p => p in entity ) ) return;


        this.#setupVertices(entity);

    }

    #setupVertices(entity)
    {
        const n_sides = entity.n_vertices;
        const r = entity.radius;

        const TWO_PI = Math.PI*2;
        const step_angle = TWO_PI/n_sides;

        // const initial_a = n_sides !== 4 ? TWO_PI/4 : entity.angle;
        const initial_a = entity.angle;

        // TODO Coisas a corrigir aqui.
        // Utiliza os atributos de altura e largura como referência apenas caso a forma não seja um quadrilátero.
        const w = n_sides !== 4 && r ? r/2 : entity.width /2;
        const h = n_sides !== 4 && r ? r/2 : entity.height/2;

        // const w = n_sides !== 4 && r ? r : entity.width /2;
        // const h = n_sides !== 4 && r ? r : entity.height/2;


        const cx = entity.center_x;
        const cy = entity.center_y;


        for(let i = 0; i < n_sides; i++)
        {
            const a = initial_a + step_angle*i;

            const x = w * Math.cos(a);
            const y = h * Math.sin(a);

            entity.vertices.push([cx+x, cy+y, a]);
        }
    }


    /**
     * 
     * @param {*} entity 
     * @param {*} x 
     * @param {*} y 
     */
    move(entity, x, y)
    {
        entity.x += x;
        entity.y += y;

        entity.center_x += x;
        entity.center_y += y;

        if(entity.vertices.length > 0){ this.updateVerticesPos(entity, x, y) }
    }


    /**
     * 
     * @param {*} entity 
     * @param {*} x 
     * @param {*} y 
     */
    updateVerticesPos(entity, x, y)
    {
        entity.vertices.forEach( v =>
        {
            v[0] += x;
            v[1] += y;
        });
    }






    /**
     * Atualiza o ângulo de uma entidade e de seus vértices.
     * @param {*} entity 
     * @param {*} angle 
     */
    moveAngle(entity, angle)
    {
        // TODO Limitar ângulos futuros para o intervalo [0, 2PI], adaptando matematicamente.
        entity.angle += angle;

        const cx = entity.center_x;
        const cy = entity.center_y;

        entity.vertices.forEach( v =>
        {
            v[2] += angle;
            const x = cx + (v[0]-cx)*Math.cos(angle) - (v[1]-cy)*Math.sin(angle);
            const y = cy + (v[1]-cy)*Math.cos(angle) + (v[0]-cx)*Math.sin(angle);

            v[0] = x;
            v[1] = y;
        });
    }
}