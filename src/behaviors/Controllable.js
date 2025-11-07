/**
 * Uma extensão de classe que carrega propriedades de um objeto controlável via inputs do usuário.
 * @param {*} Base Classe base que acumulará as propriedades de `Controllable`.
 * @returns Uma nova classe `Controllable` estendida com as propriedades de `Base`, recebida como argumento.
 */
const Controllable = Base => class extends Base
{
    constructor(name, config)
    {
        super(name, config);
        console.log("- Controllable.");

        this.is_controllable = true;

        // TODO Criar método que adiciona determinada configuração de tecla para uma instância de `Controllable`.
        /** Mapa de teclas e ações. */
        // this.key_set = config["config"]?.key_set ?? new Map();
    }
}

export default Controllable;