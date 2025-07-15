import	Entity		from "../Entity.js";
import	Observer	from "../Observer/Observer.js";

/**
 * Função compositora de mixins em uma classe base.
 * @param {*} Base Classe base para ser estendida.
 * @param  {...mixins} mixins Funções que estendem uma determinada classe base.
 * @returns Retorna uma classe composta com as propriedades dos mixins fornecidos.
 */
export function compose(Base, ...mixins)
{
	// Lista de funções de rotina inicial dos mixins.
	const initial_routine = [];

	const mixin_list = [...mixins];
	mixin_list.push(Observer); // Propriedade de Observer.

	const Composed =  mixin_list.reduce( (acc, mixin) =>
	{
		const Mixin = mixin(acc);

		// COMPOSIÇÃO DA ROTINA INICIAL DA CLASSE ESTENDIDA.
		if(typeof Mixin.initialRoutine === 'function'){ initial_routine.push(Mixin.initialRoutine); }

		return Mixin; // Retorna mixin para próxima iteração da função redutora.
		
	}, Base );

	// Adiciona ao protótipo da classe composta uma função que executa as funções de rotina inicial existentes em cada mixin.
	Composed.prototype.runInitialRoutine = function()
	{
		console.log(`Running initial routine on "${this.name}"`); // FIXME Debug, não será necessário adiante.
		initial_routine.forEach( fn => fn() );
		console.log(`O objeto "${this.name}" está adequado.`);
	};

	return Composed;
}


export function composeGeneric(...mixins)
{
	// Lista de funções de rotina inicial dos mixins.
	const initial_routine = [];

	const mixin_list = [...mixins];
	mixin_list.push(Observer); // Propriedade de Observer.

	const Composed =  mixin_list.reduce( (acc, mixin) =>
	{
		const Mixin = mixin(acc);

		// COMPOSIÇÃO DA ROTINA INICIAL DA CLASSE ESTENDIDA.
		if(typeof Mixin.initialRoutine === 'function'){ initial_routine.push(Mixin.initialRoutine); }

		return Mixin; // Retorna mixin para próxima iteração da função redutora.
		
	}, class Generic {} );

	// Adiciona ao protótipo da classe composta uma função que executa as funções de rotina inicial existentes em cada mixin.
	Composed.prototype.runInitialRoutine = function()
	{
		console.log(`Running initial routine on "${this.name}"`); // FIXME Debug, não será necessário adiante.
		initial_routine.forEach( fn => fn() );
		console.log(`O objeto "${this.name}" está adequado.`);
	};

	return Composed;
}




/**
 * Função compositora de mixinscom base na classe `Entity`.
 * @param  {...mixins} mixins Funções que estendem a classe base.
 * @returns Retorna uma classe composta com as propriedades dos mixins fornecidos.
 */
export function composeEntity(...mixins)
{
	/** Lista de funções de rotina inicial dos mixins. */
	const initial_routine = [];

	/** Lista de mixins na qual são adicionados outros valores arbitrários. */
	const mixin_list = [...mixins];
	mixin_list.push(Observer); // Propriedade de Observer.

	const Composed =  mixin_list.reduce( (acc, mixin) =>
	{
		const Mixin = mixin(acc);

		// COMPOSIÇÃO DA ROTINA INICIAL DA CLASSE ESTENDIDA.
		if(typeof Mixin.initialRoutine === 'function'){ initial_routine.push(Mixin.initialRoutine); }

		return Mixin; // Retorna mixin para próxima iteração da função redutora.
		
	}, Entity );

	// Adiciona ao protótipo da classe composta uma função que executa as funções de rotina inicial existentes em cada mixin.
	Composed.prototype.runInitialRoutine = function()
	{
		console.log(`Running initial routine on "${this.name}"`); // FIXME Debug, não será necessário adiante.
		initial_routine.forEach( fn => fn() );
		console.log(`O objeto "${this.name}" está adequado.`); // FIXME Debug, não será necessário adiante.
	};

	return Composed;
}