/**
 * Uma extensão de classe para objetos com propriedades visíveis.
 * @param {*} Base Classe base que acumulará as propriedades de `Visible`.
 * @returns Uma nova classe `Visible` estendida com as propriedades de `Base` passada como argumento.
 */
const Visible = Base => class extends Base
{
    /**
     * 
     * @param  {...any} config 
     */
    constructor(...config)
    {
        super(...config);
        console.log("- Visible");

        this.sprites = config[1].sprites ?? {};
    }
}

export default Visible;