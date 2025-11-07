import * as behaviors from "./behaviors/behaviors.js";
import { composeEntity } from "./utils/compose.js";

// Outros
import Shape    from './components/Shape.js';


// TODO Documentar classe.
export default class World
{
    constructor(event_bus)
    {
        /** Instância de `EventBus` herdado de `Game`. */
        this.event_bus = event_bus;

        /** Sistemas globais. */
        this.systems = new Map();

        /** Conjunto de entidades/objetos presentes em cada cena. */
        this.entities = new Map();

        /** Lista de acesso rápido a ids de entidades. */
        this.entity_ids = new Set();
    }


    /** Injeta um sistema na instância de `World`. */
    addSystem(name, system){ this.systems.set(name, system); }

    
    getSystem(system_name)
    { return this.systems.get(system_name); }


    /** Atualiza a isntância de `World`. */
    update(delta)
    {
        this.systems.forEach((system) =>
        {
            // TODO Remover essa verificação de encadeamento opcional.
            system.update?.(delta);
        });
    };


    // TODO Documentar método.
    createEntity(name, scene, config = {})
    {
        // Lança um erro caso haja a tentativa de criar uma entidade com um nome que já existe.
        if(this.entity_ids.has(name)){ throw new Error("Já existe uma entidade com esse identificador."); }

        // FIXME Isso aqui obviamente precisa de uma melhorada.
        const { Animatable, Cacheable, Controllable, Movable, PhysicalObject2D, Positional, Visible } = behaviors;

        // Top repetições dos animes...
        const entity_composition = composeEntity( Animatable, Cacheable, Controllable, Movable, PhysicalObject2D, Positional, Visible );

        // Cria a instância da entidade.
        const entity = new entity_composition(name, config);

        // Relaciona a entidade à cena à qual ela pertence.
        this.entities.get(scene).push(entity);

        // Adiciona id da entidade à lista. Serve para acesso posterior.
        this.entity_ids.add(name);

        // Verifica o pertencimento da entidade nos sistemas registrados.
        for(let [_, system] of this.systems)
        {
            system.register?.(entity);
            system.setup?.(entity);
        }



        // entity.subscribe()

        return entity;
    }
}