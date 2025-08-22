import EventManager from "./EventManager.js";

const Publisher = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);

        /** Gerenciador de eventos. */
        this.eventManager = new EventManager();
    }
}

export default Publisher;