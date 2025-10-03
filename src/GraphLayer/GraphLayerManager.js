import TileMapLayer from "./TileMap/TileMapLayer";

export default class GraphLayerManager
{
    constructor()
    {
        this.layers = []
        this.max_layers = 16;
    }

    /**
     * Adiciona uma camada de gráfico à cena.
     * @param {"tilemap" | "image"} type O tipo de camada gráfica: tilemap ou imagem.
     */
    push(type)
    {
        if(this.layers.length >= 16) return;

        // Único tipo possível até o momento.
        if(type == "tilemap") this.layers.push( new TileMapLayer() );
    
        return this.layers.at(-1);
    }

    pop(){ return this.layers.pop(); }
}