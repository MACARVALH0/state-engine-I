/**
 * Uma extensão de classe que carrega propriedades de um objeto controlável via inputs do usuário.
 * @param {*} Base Classe base que acumulará as propriedades de `Controllable`.
 * @returns Uma nova classe `Controllable` estendida com as propriedades de `Base`, recebida como argumento.
 */
const Controllable = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);
        console.log("- Controllable.");

        this.is_contrlb = true;

        this.key_set = config[1].key_set ?? {};
    }
}

export default Controllable;