/** 
 * Função compositora de mixins em uma classe base.
 * 
 * @typedef {(base: any) => any} Mixin Uma função que recebe uma classe base e retorna uma classe estendida.
 *
 * @param {...Mixin} mixins Funções `mixin` cujas propriedades serão adicionadas à extensão da classe base.
 * @returns {(base: any) => any} Uma função que, ao receber uma classe base, retorna uma nova classe composta com os mixins.
 */
const compose = (...mixins) => base => mixins.reduce( (acc, mixin) => mixin(acc), base );

export default compose;
