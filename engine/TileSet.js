export default class Tileset
{
    constructor(tileset_atlas_data, tile_width, tile_height, tileset_config = {})
    {
        /** Objeto ImageData do atlas do TileSet. */
        this.atlas = tileset_atlas_data; // Atlas image data

        this.tile_w = tile_width;
        this.tile_h = tile_height;
        
        this.cols = this.atlas.width/this.tile_w;
        this.rows = this.atlas.height/this.tile_h;

        this.tile_amount = this.cols * this.rows;

        this.tileset_config = tileset_config ?? {};
    }

    /**
     * Define informações de tiles específicos no TileSet.
     * 
     * @param  {{ [index: number]: Object }} config Conjunto de itens índice-valor com definições para um ou múltiplos tiles.
     */
    defineTiles(config)
    {
        const entries = Object.entries(config);

        for(const [key, value] of entries)
        {
            if(isNaN(key)) continue; // Se a chave não for um índice numérico, ignora.

            const index = Math.abs(key >> 0); // Garante que a chave seja um inteiro positivo.
            this.tileset_config[index] = value; // Atualiza na configuração do TileSet o índice na posição da chave recebida.
        }
    }
}