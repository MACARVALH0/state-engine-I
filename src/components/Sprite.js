// TODO Documentar classe.
// const Sprite = Base => class extends Base
// {
//     constructor(...config)
//     {
//         super(...config);

//         /** Sobrecarrega o tipo de renderização da entidade para "Sprite". */
//         this.kind = "sprite";

//         /** Textura/Imagem do sprite. */
//         this.texture = config["texture_src"] ?? undefined;
//     }
// }

class Sprite
{
    constructor(config)
    {
        /** Sobrecarrega o tipo de renderização da entidade para "Sprite". */
        this.view_type = "sprite";

        /** Textura/Imagem do sprite. */
        this.texture = config["texture_src"] ?? undefined;
    }
}

export default Sprite;