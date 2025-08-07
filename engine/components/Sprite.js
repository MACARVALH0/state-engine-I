// TODO Documentar classe.
const Sprite = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);

        this.texture = config["texture_src"] ?? undefined;
    }
}

export default Sprite;