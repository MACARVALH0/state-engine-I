// TODO Documentar função.
export default function handleKeyboardInput(game, event_bus)
{
    event_bus.on( "key_input",

    /** @param {{ key_code: string, is_active: boolean }} data Informação recebida pelo evento emitido no sistema de input. */
    function ({key_code, is_active})
    {
        console.log(key_code, "->", is_active); // DEBUG
        
        // Define input `key_code` como ativo ou desativado.
        game.keyboard.set(key_code, is_active);
    });
}