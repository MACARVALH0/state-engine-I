import Entity from "../Entity";

/**
 * Função compositora de mixins em uma classe base.
 * @param {*} Base Classe base para ser estendida.
 * @param  {...mixins} mixins Funções que estendem uma determinada classe base.
 * @returns Retorna uma classe composta com as propriedades dos mixins fornecidos.
 */
export default function compose(Base, ...mixins)
{
	const initial_routine = [];

	const Composed =  mixins.reduce( (acc, mixin) =>
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
        for(let fn of initial_routine){ fn(); }
		console.log(`O objeto "${this.name}" está adequado.`);
	};

	return Composed;
}


export function composeEntity(...mixins)
{
	const initial_routine = [];

	const Composed =  mixins.reduce( (acc, mixin) =>
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
        for(let fn of initial_routine){ fn(); }
		console.log(`O objeto "${this.name}" está adequado.`);
	};

	return Composed;
}