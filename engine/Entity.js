import EventManager from "./Observer/EventManager.js";

/**
 * Classe base para instanciação de um determinado objeto na engine.
 */
export default class Entity
{
    /**
     * Construtor da classe básica.
     * @param {*} name Nome do objeto.
     */
    constructor(name)
    {
        // if(!name) throw new Error("É necessário dar um nome ao objeto.");
        console.log(`Criando o objeto "${name}"...`);
        console.log("Classe de entidade básica, com as seguintes extensões:");
        
        this.name = name;
        this.initial_routine_functions = [];

        this.eventManager = new EventManager();
    }

}