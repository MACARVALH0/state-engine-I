import Tile     from './Tile.js';
import TileSet  from './TileSet.js';

export default class TileMapLayer
{
    /**
     * Construtor da classe `TileMapLayer`.
     * 
     * @param {*} width Largura do `TileMapLayer`.
     * @param {*} height Altura `TileMapLayer`.
     * @param {*} tileset Instância de objeto `ImageData` do atlas/tileset de sprites.
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


        /** Número de colunas de tiles no `TileMapLayer`. */
        this.cols = options['cols'] // Verifica se `cols` foi definido nas opções passadas como argumento para o construtor (caso existam).
            ? Math.ceil(Math.abs(options['cols']))
            : Math.ceil(this.width/this.tile_w);

        /** Número de linhas de tiles no `TileMapLayer`. */
        this.rows = options['rows'] // Verifica se `rows` foi definido nas opções passadas como argumento para o construtor (caso existam).
            ? Math.ceil(Math.abs(options['cols']))
            : Math.ceil(this.height/this.tile_h);


        /** Garante que a proporção entre os tiles seja mantida nas funções que alteram seus tamanhos.  */
        this.keep_tile_size_ratio = true;



        /** Matriz de tiles do objeto `TileMapLayer`. */
        this.tiles = this.setupTiles();

        /** Instância de TileSet do mapa. */
        this.tileset = new TileSet(tileset ?? new ImageData(), this.tile_w, this.keep_tile_size_ratio ? this.tile_w : this.tile_h);
    }


    setupTiles()
    {
        const tiles = [];

        this.rows.forEach( (element, index, arr) =>
        {
            // Adiciona à array de tiles uma nova linha com o número de colunas especificado na instância de `TileMapLayer`.
            tiles.push( Array.from({length: this.cols}, () => 0) );
        });

        return tiles;
    }

    // TODO concluir função que define o tileset do mapa.
    setTileSet(tileset_src)
    {
        try
        {
            this.tileset.src = tileset_src;

        }

        catch(e){}
    }

    getTile(row, col){ return this.tiles[row][col]; }


    

    // constructor(...config)
    // {
    //     this.origin_x = config["origin_x"] ?? 0;
    //     this.origin_y = config["origin_y"] ?? 0;

    //     this.rows = undefined;
    //     this.cols = undefined;

    //     this.tile_width = config["size"] ?? 0;
    //     this.tile_height = config["size"] ?? 0;

    //     this.map = [];

    //     this.tilesets = [];

    //     this.tiles = [];
    // }

    // setupTileSet(){}

    // getTile(){}

    // buildMap(){}
}