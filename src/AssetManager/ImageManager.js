// TODO Documentar mixin.
// TODO Fazer testes.
const ImageManager = Base => class extends Base
{
    constructor(...config)
    {
        super(...config);

        this.rel_image_path = ".";
    }

    /**
     * Cria um cache para elementos HTML correspondentes às imagens estáticas no diretório de assets, sem carregar um `src`.
     * @param {Array<String>} path_list 
     * @returns {Map<String, HTMLImageElement>}
     */
    preloadImages(path_list)
    {
        const image_elements = new Map();

        for(let path of path_list)
        {
            const img = document.createElement("img");
            img.dataset.src = path;

            image_elements.set(path, img);
        }

        return image_elements;
    }

//     /**
//      * Carrega uma imagem ou uma sequência de imagens para a memória.
//      * @param {String | Number} id_name String ou número de referência do arquivo de mídia para ser utilizado dentro da interface do programa, algo como um "id".
//      * @param {String} filename Nome do arquivo de mídia.
//      * @param {Boolean} find_strip Procura por uma sequência de sprites com o mesmo nome que seguem uma sequência e possuem "strip" no nome do arquivo.
//      * Adiciona um overhead à função, mas é útil para importação de uma sequência de sprites de uma animação.
//      * @returns {Set<String>} Retorna uma array contendo o caminho para cada arquivo adicionado.
//      */
//     loadImage(id_name, filename, find_strip = false)
//     {
//         if(typeof filename != 'string') throw new Error("O nome do arquivo deve ser uma string.");

//         if(this.sprites.has(id_name))
//         {
//             console.warn("Uma imagem já foi renderizada sob o id", "\""+id_name+"\".");
//             return;
//         }

//         if(find_strip)
//         {
//             /** Índice do primeiro caractere do trecho "strip" no nome do arquivo, caso ele exista. */
//             const strip_index = filename.search(/strip/i);
            
//             // Verifica se o texto "strip" está presente no nome do arquivo.
//             if(strip_index >= 0)
//             {
//                 const frame_path_strip = this.loadStrip(filename);

//                 const frame_list = [];

//                 frame_path_strip.forEach( frame_src =>
//                 {
//                     const img = new Image();
//                     img.src = frame_src;
//                     frame_list.push( img );    
//                 });

//                 this.sprites.set(id_name.slice(0, strip_index), frame_list);

//                 // TODO Adicionar esquema de debug que exiba a chave da sequência de sprites recém adicionada no console.
//                 return frame_list;
//             }
//         }


//         // Caso `find_strip` seja falso ou o trecho "strip" não seja encontrado no nome do arquivo.
//         const img = new Image();
//         img.src = filename;
//         this.sprites.set(id_name, [img]);

//         // TODO O mesmo esquema de debug poderia exibir a chave para o sprite.
//         return [img];
//     }


//     /**
//      * Carrega uma sequência de sprites com o mesmo nome.
//      * @param {String} filename Nome base do arquivo.
//      * @returns {Array<String>} uma lista caminhos para imagens que (teoricamente) formam uma sequência.
//      */
//     loadStrip(filename)
//     {
//         // TODO Corrigir uso de `var` aqui.
//         /** Índice de ordem do sprite na sequência/strip (em forma de string). */
//         var sprite_string_index = filename.match(/\d{1,3}/g).pop();
        
//         // TODO Contornar uso de `var`.
//         /** Número de casas decmimais do índice de um sprite pertencente a uma animação. */
//         var index_string_len = sprite_string_index.length;
        
//         /** Índice da posição na string de `filename` onde o índice do sprite em uma sequência (strip) está localizado. */
//         const index_string_pos = filename.indexOf(sprite_string_index);
        
//         // TODO Contornar uso de `var`.
//         /** Índice em forma numérica. */
//         var sprites_index_n = Number(sprite_string_index);

//         /** Núcleo do caminho para o sprite antes do índice de ordem na sequência (strip). */
//         const sprite_path_part1 = `${this.img_base_path}/${filename.substring(0, index_string_pos)}`;

//         /** Continuação do nome do caminho para o sprite da sequência após o índice. */
//         const sprite_path_part2 = filename.substring(index_string_pos+index_string_len, filename.length-1);


//         /** Sequência/tira de sprites de uma mesma animação. */
//         const strip = new Set();


//         // Confirma a existência de um índice no filename.
//         if(index_string_pos >= 0)
//         {
//             let finished = false;

//             while( !finished )
//             {
//                 const path = sprite_path_part1 + sprites_index_n + sprite_path_part2;

//                 if( this.files.sprites.includes(path) ) strip.add(path);
                
//                 else finished = true;

//                 // Verifica se a quantidade de casas decimais no índice aumentou e atualiza posição de `sprite_path_part2`.
//                 if( sprite_string_index.toString().length != (++sprite_string_index).toString() )
//                 {
//                     index_string_len++;
//                     sprite_path_part2 = filename.substring(index_pos+index_len, filename.length-1);
//                 }
//             }
//         }


//         return strip.size > 0
//         ? strip
//         : undefined;
//     }
}


export default ImageManager;