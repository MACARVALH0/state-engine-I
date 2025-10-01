const Shape = Base => class extends Base
{
    constructor()
    {
        /** Posição x do centro da forma. */
        this.x = 0;

        /** Posição y do centro da forma. */
        this.y = 0;

        /** Cor de preenchimento do polígono. */
        this.color = "";

        /** Cor das bordas do polígono. */
        this.b_color = "";

        /** Conjunto de pontos representando os vértices do polígono. */
        this.points = new Map( points.map( ([x, y], i) => [ `p${i}`, [x, y] ] ) );

        console.log( this.points ); // DEBUG
            
    }
}

export default Shape;