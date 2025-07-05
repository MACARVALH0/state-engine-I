import Game from "../Game";
import compose from "./compose";

import baseEventHandler from "../behaviors/event-handlers/BaseEventHandler";
import GameSceneHandler from "../behaviors/event-handlers/SceneHandler";


/**
 * Função responsável por criar uma instância de `Game` na engine.
 * @param {HTMLCanvasElement} canvas Elemento de canvas no HTML onde o jogo será renderizado.
 */
export default function createGame(canvas)
{
    const game = new Game(canvas); // Nova instância de `Game`.
    // const eventHandlerComposition = compose(baseEventHandler, GameSceneHandler); // Cria uma composição de funcionalidades de event handlers.
    // Object.assign(game.prototype, eventHandlerComposition); // Atribui ao `prototype` de `game` os atributos/métodos dos event listeners.

    return game; // Retorna o objeto criado.
}

// Note: Instância de `Game` deve lidar com os eventos do teclado e repassá-los à ultima cena.