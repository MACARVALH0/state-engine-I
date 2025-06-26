export default class Tileset
{
    constructor(tileset_atlas, tile_width, tile_height)
    {
        this.atlas = tileset_atlas; // Atlas image data

        this.tile_w = tile_width;
        this.tile_h = tile_height;
        
        this.col_number = this.atlas.width/this.tile_w;

        this.tile_sprites = [];
    }
}