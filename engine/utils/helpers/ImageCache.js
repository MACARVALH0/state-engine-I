// TODO Documentar classe.
class ImageCache
{
    // TODO Documentar elementos do construtor.
    constructor()
    {
        this.id = 0;

        this.width = undefined;
        this.height = undefined;

        this.scale = 1;

        this.x = undefined;
        this.y = undefined;

        this.offset_x = undefined;
        this.offset_y = undefined;
    }

    set(target, x, y, width, height, scale, options)
    {
        if(!target){ throw new Error("É necessário apontar um objeto para o cache."); }

        // this.options = options;
        this.target = target;

        this.width = width >= 1 ? width : 1;
        this.height = height >=1 ? height : 1;

        this. scale = scale ?? 1;

        this.x = x ?? 0;
        this.y = y ?? 0;

        this.update();
    }

    update();
}