const Cacheable = Base => class extends Base
{
    constructor()
    {
        this.width = undefined;
        this.height = undefined;

        this.scale = 1;

        this.x = undefined;
        this.y = undefined;

        this.offset_x = undefined;
        this.offset_y = undefined;

        this._f_offset_x = undefined;
        this._f_offset_y = undefined;

        this._DataURL_id = 0;

        this._DataURL = null;

        this._draw_width = 0;

        this._draw_height = 0;
    }
}

export default Cacheable;