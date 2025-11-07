import Transform from "../components/Transform.js";
import { composeBehavior } from "../utils/compose.js"; 

/**
 * Uma extensão de classe para objetos que agregam propriedades transformacionais num plano bidimensional,
 * como posições horizontal e vertical, valores de scaling, rotação, etc.
 * 
 * @param {*} Base Classe base que acumulará as propriedades de `Positional`.
 */
const Positional = Base => 
{
    // TODO Atualizar a documentação da classe.

    const Composition = composeBehavior(Base, Transform);

    return class extends Composition
    {
        constructor(name, config)
        {
            // Construtor do behavior `Positional`.
            super(name, config);
            console.log("- Positional");
        }
    }
};

export default Positional;