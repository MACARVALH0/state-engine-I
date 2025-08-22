import ImageManager from "./ImageManager.js";

import { composeGeneric } from "../utils/compose.js";
const asset_manager_composition = composeGeneric(ImageManager);

// TODO Documentar classe.
// const AssetManager = Base => class extends Base
export default class AssetManager extends asset_manager_composition
{
    constructor(base_path = 'public/')
    {
        super();
    }
};