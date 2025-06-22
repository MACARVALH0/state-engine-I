/**
 * Classe que define um sistema de animações para determinado objeto.
 * @param {*} Base Classe base que acumulará as propriedades de `Animatable`.
 */
const Animatable = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);
        console.log("- Animatable");
    }

    /** Lança um erro caso o objeto de sprites não seja encontrado. */
    static initialRoutine()
    {
        if(!this.sprites)
            throw new Error("Não foi possível encontrar os sprites do objeto.\n");
            
        if(Object.keys(this.sprites).length == 0)
            throw new Error("Não foi possível encontrar os sprites do objeto.\n");
    }
}

export default Animatable;