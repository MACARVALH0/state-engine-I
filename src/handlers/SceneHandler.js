/**
 * // TODO Deletar isso e desfazer a composição de `Game`.
 * Uma extensão para a classe `Game` responsável por lidar com eventos de `Scene`.
 * @param {*} Base Classe base que receberá as propriedades deste mixin.
 * @returns Uma nova classe `GameSceneHandler` estendida com as propriedades de `Base`, recebida como argumento.
 */
const GameSceneHandler = Base => class extends Base
{
    sceneCreated(event){}
    sceneDeleted(event){}
}

export default GameSceneHandler;