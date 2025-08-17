import Observer     from "./Observer/Observer.js";
import Publisher    from "./Observer/Publisher.js";

import { composeGeneric } from "./utils/compose.js";


const entity_composition = composeGeneric(Observer, Publisher);

/**
 * Classe base para instanciação de uma entidade na engine.
 */
export default class Entity extends entity_composition
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

        super();
        
        this.name = name;
        this.initial_routine_functions = [];

        this.components = new Map();

        console.log("Nova `Entity` criada.");
    }

    // TODO Documentar método.
    has(...props){ return props.every(p => p in this); }

}