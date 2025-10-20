class Shape
{
    constructor(config)
    {
        // super(...config);

        // Sobrecarrega o tipo de renderização da entidade para "Shape".
        this.view_type = "shape";

        /** Cor de preenchimento do polígono. */
        this.color = config["color"] ?? "rgb(255, 250, 250)";

        /** Cor das bordas do polígono. */
        this.border_color = config["border_color"] ?? "rgb(30, 30, 30)";

        this.points = config["points"] ?? [];
        /** Conjunto de pontos representando os vértices do polígono. */
        // this.points = new Map( points.map( ([x, y], i) => [ `p${i}`, [x, y] ] ) );
    }
}


export default Shape;