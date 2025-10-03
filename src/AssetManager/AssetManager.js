import ImageManager from "./ImageManager.js";

import { composeGeneric } from "../utils/compose.js";
const asset_manager_composition = composeGeneric(ImageManager);

// TODO Documentar classe.
// const AssetManager = Base => class extends Base
export default class AssetManager extends asset_manager_composition
{
    constructor(assets_path = "Game/Assets", manifest, ...config)
    {
        super(...config);

        this.assets_path = assets_path;

        this.assets_manifest = undefined;
        
        // TODO Criar função que modifica essas variáveis
        // this.rel_audio_path = ".";

        /** Caminhos para os arquivos dos assets separados por tipo. */
        this.assets = 
        {
            /** @type {Map<String, HTMLImageElement>} */
            image: this.preloadImages(manifest.images),
            
            // audio
        }
    }


    /**
     * Prepara e retorna uma instância da classe AssetManager.
     * @param {String} assets_path Caminho para o diretório de assets. 
     * @returns {AssetManager} Instância de AssetManager já estendendo outros managers de assets específicos.
     */
    static async create(assets_path)
    {
        // Rota para `assets_path/assets.json`.
        const route = assets_path + (assets_path.at(-1) == '/' ? '' : '/') + "assets.json";

        const response = await fetch(route);

        if(!response.ok){ throw new Error(`Não foi possível carregar o caminho do \`assets.json\`:\n${response.status}`); }

        const manifest = await response.json();

        return new AssetManager(assets_path, manifest);
    }


    
    getImages(path_array)
    {
        // const elements = [];
        // let img_id;
        // state ? img_id = `media/${directory}/${group}/${state}` : img_id = `media/${directory}/${group}`;

        // document.querySelector('#game_sprites').innerHTML += `<img id='${group}' src="${img_id}.png">`

        // return document.querySelector(`#${group}`);
    }
}