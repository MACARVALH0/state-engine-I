// TODO Documentar classe.
class Entity
{

    /**
     * Construtor da classe básica.
     * @param {*} name Nome do objeto.
     */
    constructor(name, config)
    {
        console.log(`\nCriando o objeto "${name}"...`);
        console.log("Classe de entidade básica, com as seguintes extensões:");
        
        this.name = name;

        this.components = new Set();

        this.initial_routine_functions = [];

        console.log("Nova `Entity` criada.");
    }
}

export default Entity;