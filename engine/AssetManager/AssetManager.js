import ImageManager from "./ImageManager.js";

import { composeGeneric } from "./utils/compose.js";
const asset_manager_composition = composeGeneric(ImageManager);

// TODO Documentar classe.
// const AssetManager = Base => class extends Base
export default class AssetManager extends asset_manager_composition
{
    constructor(base_path = 'public/')
    {
        super();
    }

    checkFileExists(path)
    {
        return new Promise( resolve =>
        {
            const img = new Image();
            img.onload = () => resolve(true);   // O arquivo existe.
            img.onerror = () => resolve(false); // O arquivo não existe.
            img.src = path + '?cachebust=' + Date.now();
        })
    }

};