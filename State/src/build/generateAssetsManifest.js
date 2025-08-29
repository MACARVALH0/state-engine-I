import fs from "fs";
import { join } from "path";
import { loadDirConfig } from "../utils/loadConfig.js";


/** Mapeamento de extensões aceitas segundo o tipo de arquivo. */
const asset_exts = new Map
([
    ["sprites", "(png|jpg|jpeg|gif)"],
]);


/**
 * Retorna um conjunto de strings contendo o caminho para arquivos identificados sob `file_extensions`.
 * @param {String} files_dir Diretório onde deverão ser buscados os arquivos.
 * @param {String} file_extensions String no formato "(ext1|ext2|ext3|...)".
 */
function getFilePaths(files_dir, files_regex)
{
    console.log("\t- files_dir: ", files_dir, "\n");

    // Cria o diretório caso ele não exista previamente.
    if( !fs.existsSync(files_dir) )
    {
        console.log("\tO diretório \'", "..."+files_dir.slice(25), "\' não existe ainda!\n");
        
        fs.mkdirSync(files_dir, { recursive: true });
        console.warn("O diretório \'", "..."+files_dir.slice(25), "\' Não existia a princípio e foi criado durante a build.\n");
    }

    return fs.readdirSync(files_dir).filter( file => files_regex.test(file) ) || [];
}


// export default function generateAssetsManifest(cwd_game_path, static_prefix, ...assets_dir)
export default function generateAssetsManifest()
{
    /** Conteúdo do arquivo `dir_config`. */
    const config = loadDirConfig( join(process.cwd(), "State", "src", "dir_config.yml") );
    console.log("\t- Config path: ", join(process.cwd(), "State", "/src", "dir_config.yml"));


    /** Caminho relativo para a pasta do jogo no diretório estático/público. */
    const game_path = config.game_path;
    console.log("\t- game_path:", game_path);

    /** Caminho absoluto para o diretório do jogo. */
    const cwd_game_path = join(process.cwd(), game_path);
    console.log("\t- cwd_game_path:", cwd_game_path);
    

    const
    {
        root_path:          rel_assets_path,
        sprites_dir_path:   rel_sprites_path,

    } = config.game_assets;


    console.log("\nConfiguração restaurada com sucesso.\n|", rel_assets_path, " - ", rel_sprites_path, '|\n');



    ///// CAMINHOS ABSOLUTOS PARA OS DIRETÓRIOS /////
        /** Caminho para `public/Game/Assets/Sprites/`. */
        const sprites_path  =   join( cwd_game_path, rel_sprites_path );
        /** Caminho para `public/Game/Assets/manifest.json`. */
        const manifest_path =   join( cwd_game_path, rel_assets_path, "manifest.json" );
    console.log("\t- sprites_path:", sprites_path, "\n\n\t- manifest_path: ", manifest_path, "\n");

    ///// REGEX DOS TIPOS DE ARQUIVOS /////
        /** RegExp de arquivos de sprites. */
        const sprites_regex = new RegExp(`\.${asset_exts.get("sprites")}$`, "i");
    console.log("\t- sprites_regex: ", sprites_regex, "\n");

    ///// ARRAYS DE ARQUIVOS /////
        /** Arquivos de sprites. */
        const sprite_files = getFilePaths( sprites_path, sprites_regex );
    console.log("\t- sprites_files: ", sprite_files, "\n");


    /** Conteúdo de `manifest.json`. */
    const manifest_content =
    {
        sprites: sprite_files.map( file => `${join( game_path, rel_sprites_path )}/${file}`),
        // audio
    }

    fs.writeFileSync( manifest_path, JSON.stringify(manifest_content, null, 2) );

    console.log(`Arquivo \`manifest.json\` gerado em ${manifest_path}.`);
}

// TODO Refatorar.
// /**
//  * Gera um arquivo `manifest.json` contendo as informações de caminhos para sprites (Apenas isso no momento).
//  * @param {String} sprites_dir Diretório de sprites no caminho de arquivos estáticos.
//  * @param {String} static_prefix Prefixo para o caminho de arquivos estáticos.
//  */
// export default function generateManifest(sprites_dir, static_prefix = "/static/Game")
// {
//     const manifest_path = path.join(sprites_dir, "../manifest.json");

//     // TODO Carregar isso numa função separada.
//     const files = fs.readdirSync(sprites_dir).filter( file => /\.(png|jpg|jpeg|gif)$/i.test(file) );
    
//     const manifest_content = 
//     {
//         sprites: files.map( file => `${static_prefix}/Sprites/${file}`)
//     }

//     fs.writeFileSync(manifest_path, JSON.stringify(manifest_content, null, 2));

//     fs.close();
    
//     console.log("Manifest gerado em", manifest_path);
// }