/**
 * Uma extensão de classe para objetos com posições horizontal e vertical num plano bidimensional.
 * @param {*} Base Classe base que acumulará as propriedades de `Positional`.
 * @returns Uma nova classe `Positional` estendida com as propriedades de `Base` passada como argumento.
 */
const Positional = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);
        console.log("- Positional");

        this.x = config['x'] ?? 0;
        this.y = config['y'] ?? 0;
    }
}