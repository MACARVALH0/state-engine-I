import Tile     from './Tile.js';
import TileSet  from './TileSet.js';

export default class TileMapLayer
{
    constructor(width, height, cols, rows, tileset)
    {
        this.origin_x = 0;
        this.origin_y = 0;

        this.width = Math.abs(width);
        this.height = Math.abs(height);

        this.cols = parseInt(Math.abs(cols));
        this.rows = parseInt(Math.abs(rows));


        /** Garante que a proporção entre os tiles seja mantida nas funções que alteram seus tamanhos.  */
        this.keep_tile_ratio = true;

        /** Largura de um tile. O programa pode assumir o valor 32 como padrão. */
        this.tile_w = Math.ceil(this.width/cols) || 32;

        /** Altura de um tile. O programa pode assumir o valor 32 como padrão. */
        this.tile_h = Math.ceil(this.height/rows) || 32;

        /** Matriz de tiles do objeto `TileMapLayer`. */
        this.tiles = this.setupTiles();

        /** Instância de TileSet do mapa. */
        this.tileset = new TileSet(tileset ?? new ImageData(), this.tile_w, this.keep_tile_ratio ? this.tile_w : this.tile_h);
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