import Tile     from './Tile.js';
import TileSet  from './TileSet.js';

export default class TileMapLayer
{
    /**
     * Construtor da classe `TileMapLayer`.
     * 
     * @param {Number} width Largura do `TileMapLayer`.
     * @param {Number} height Altura `TileMapLayer`.
     * @param {ImageData} tileset Instância de objeto `ImageData` do atlas/tileset de sprites.
     * @param  {...any} options Conjunto de configurações opcionais na construção do `TileMapLayer`.
     */
    constructor(width, height, tileset, ...options)
    {
        /** Posição x do ponto de origem do `TileMapLayer` no canvas. */
        this.origin_x = 0;
        
        /** Posição y do ponto de origem do `TileMapLayer` no canvas. */
        this.origin_y = 0;


        /** Largura do `TileMapLayer`. */
        this.width = Math.abs(width);

        /** Altura do `TileMapLayer`. */
        this.height = Math.abs(height);


        /** Largura de um tile. O programa pode assumir o valor 64 como padrão. */
        this.tile_w = options['tile_w'] ? Math.abs(options['tile_w']) : 64;

        /** Altura de um tile. O programa pode assumir o valor 64 como padrão. */
        this.tile_h = options['tile_h'] ? Math.abs(options['tile_h']) : 64;

        /** Garante que a proporção entre largura e altura dos tiles seja mantida nas funções que alteram seus tamanhos. */
        this.keep_tile_size_ratio = true;


        /** Número de colunas de tiles no `TileMapLayer`. */
        this.cols = options['cols'] // Verifica se `cols` foi definido nas opções passadas como argumento para o construtor (caso existam).
            ? Math.ceil(Math.abs(options['cols']))
            : Math.ceil(this.width/this.tile_w);

        /** Número de linhas de tiles no `TileMapLayer`. */
        this.rows = options['rows'] // Verifica se `rows` foi definido nas opções passadas como argumento para o construtor (caso existam).
            ? Math.ceil(Math.abs(options['cols']))
            : Math.ceil(this.height/this.tile_h);


        /** Matriz de tiles do objeto `TileMapLayer`. */
        this.visualGrid = this.setupVisualGrid();

        /** Instância de TileSet do mapa. */
        this.tileset = new TileSet(tileset ?? new ImageData(), this.tile_w, this.keep_tile_size_ratio ? this.tile_w : this.tile_h);
    }

    /**
     * Define o arquivo fonte do TileSet do mapa.
     * 
     * @param {Object} tileset_src Caminho para o arquivo fonte do atlas do TileSet.
     */
    setTileSet(tileset_src)
    {
        try
        {
            this.tileset.atlas.src = tileset_src; // Define o arquivo de fonte do atlas do tileset.
            this.tileset.tileset_config = {}; // Reinicia a definição de valores dos tiles.
        }

        catch(e){ throw new Error(`Não foi possível definir o caminho \'${tileset_src}\' como fonte para o tileset.`); }
    }


     
    /** Cria uma matriz de tiles de duas dimensões com a quantidade de linhas e colunas da instância do `TileMapLayer`. */
    setupVisualGrid()
    {
        const tiles = [];

        // this.rows?.forEach( (element, index, arr) => {});
        for(let i = 0; i < this.rows; i++)
        {
            // Adiciona à array de tiles uma nova linha com o número de colunas especificado na instância de `TileMapLayer`.
            tiles.push( Array.from({length: this.cols}, () => 0) );
        };

        return tiles;
    }



    getTile(row, col){ return this.tiles[row][col]; }
}