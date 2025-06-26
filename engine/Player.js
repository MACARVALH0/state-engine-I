class Player
{
    /**
     * @param {string} name O nome do jogador, utilizável pra identificação.
     */
    constructor(name = "Player")
    {
        this.name = name;
        this.is_setup = false;
    }

    setup(config_obj)
    {
        console.log(`Configurando personagem para ${this.name}.`);
        super(config_obj);
        this.is_setup = true;
    }
}

