import fs from "fs";
import path from "path";

/**
 * Gera um arquivo `manifest.json` contendo as informações de caminhos para sprites (Apenas isso no momento).
 * @param {String} sprites_dir Diretório de sprites no caminho de arquivos estáticos.
 * @param {String} static_prefix Prefixo para o caminho de arquivos estáticos.
 */
export default function generateManifest(sprites_dir, static_prefix = "/static/Game")
{
    const manifest_path = path.join(sprites_dir, "../manifest.json");

    const files = fs.readdirSync(sprites_dir).filter( file => /\.(png|jpg|jpeg|gif)$/i.test(file) );
    
    const manifest_content = 
    {
        sprites: files.map( file => `${static_prefix}/Sprites/${file}`)
    }

    fs.writeFileSync(manifest_path, JSON.stringify(manifest_content, null, 2));

    fs.close();
    
    console.log("Manifest gerado em", manifest_path);
}