// TODO Documentar classe.
const Health = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);

        this.hp = config["hp"] ?? 0b1;
        this.max_hp = config["max_hp"] ?? 0b100;
    }
}


export default Health;