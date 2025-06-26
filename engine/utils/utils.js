/**
 * Função compositora de mixins em uma classe base.
 * @param {*} Base Classe base para ser estendida.
 * @param  {...mixins} mixins Funções que estendem uma determinada classe base.
 * @returns Retorna uma classe composta com as propriedades dos mixins fornecidos.
 */
export function compose(Base, ...mixins)
{
	const initial_routine = [];

	const Composed =  mixins.reduce( (acc, mixin) =>
	{
		const Mixin = mixin(acc);

		// COMPOSIÇÃO DA ROTINA INICIAL DA CLASSE ESTENDIDA.
		if(typeof Mixin.initialRoutine === 'function'){ initial_routine.push(Mixin.initialRoutine); }

		return Mixin; // Retorna mixin para próxima iteração da função redutora.
		
	}, Base );

	Composed.prototype.runInitialRoutine = function()
	{
		// console.log(`Running initial routine on "${this.name}"`);
        for(let fn of initial_routine){ fn(); }
		console.log(`O objeto "${this.name}" está adequado.`);
	};

	return Composed;
}

export function getCanvas(el)
{
	const width = el.width;
	const height = el.height;

	const ctx = el.getContext("2d");

	return { width, height, ctx }
}