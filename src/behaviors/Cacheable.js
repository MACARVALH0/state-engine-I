// TODO Criar sistema de caching.

// TODO Documentar mixin.
const Cacheable = Base => class extends Base
{
    constructor(name, config)
    {
        super(name, config);

        this.cache =
        {
            exists: false, // FIXME Solução provisória.

            width: undefined,
            height: undefined,
    
            scale: 1,
    
            x: undefined,
            y: undefined,
    
            offset_x: undefined,
            offset_y: undefined,
    
            _f_offset_x: undefined,
            _f_offset_y: undefined,
    
            _DataURL_id: 0,
    
            _DataURL: null,
    
            _draw_width: 0,
    
            _draw_height: 0,
        }
    }
}

export default Cacheable;