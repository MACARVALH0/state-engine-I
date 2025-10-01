import ImageManager from "./ImageManager.js";

import { composeGeneric } from "../utils/compose.js";
const asset_manager_composition = composeGeneric(ImageManager);

// TODO Documentar classe.
// const AssetManager = Base => class extends Base
export default class AssetManager extends asset_manager_composition
{
    constructor(assets_path = "Game/Assets", ...config)
    {
        super(...config);

        this.base_path = assets_path;

        /** Caminhos para os arquivos dos assets separados por tipo. */
        this.files = this.getPaths();
    }

    /** Captura informações de Assets via `manifest.json` no caminho especificado em `this.assets_path`. */
    async getPaths()
    {
        const route = this.base_path + "/manifest.json";

        const response = await fetch(route);
        if(!response.ok) throw new Error( "Não foi possível carregar informações de assets.\n"+err );

        const content = await response.json();
        console.log("Arquivo de caminhos de sprites carregado.")

        return content;
    }
};