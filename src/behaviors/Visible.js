import Sprite from "../components/Sprite.js"
import Shape from "../components/Shape.js";
import { composeBehavior }  from "../utils/compose.js"

/**
 * Uma extensão de classe para objetos que agregam propriedades visíveis num plano bidimensional.
 * 
 * @param {*} Base Classe base que acumulará as propriedades de `Visible`.
 * @returns Uma nova classe `Visible` estendida com as propriedades de `Base` passada como argumento.
 */
const Visible = Base =>
{
    const Composition = composeBehavior(Base);//, Sprite);

    return class extends Composition
    {
        constructor(...config)
        {
            // Construtor do behavior `Visible`.
            super(...config);
            console.log("- Visible");
    
            this.is_visible = true;

            this.w = config["width"]  ?? 1;
            this.h = config["height"] ?? 1;

            // Representação do tipo de abstração que será desenhada.
            this.view = {};
        }
    }
}

export default Visible;