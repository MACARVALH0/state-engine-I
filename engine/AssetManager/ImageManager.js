// TODO Documentar mixin.
// TODO Fazer testes.
const ImageManager = Base => class extends Base
{
    constructor()
    {
        super();

        this.img_base_path = 'Game/Sprites';
        this.sprites = new Map();
        this.src_list = new Set();
    }

    
    /**
     * Aponta se um arquivo de imagem existe ou não.
     * @param {String} path Caminho para o arquivo a ser verificado.
     * @returns {Promise<Boolean>}
     */
    checkImageExists(path)
    {
        return new Promise( resolve =>
        {
            const img = new Image();
            img.onload = () => resolve(true);   // O arquivo existe.
            img.onerror = () => resolve(false); // O arquivo não existe.
            img.src = path + '?cachebust=' + Date.now();
        })
    }


    /**
     * Carrega uma imagem ou uma sequência de imagens para a memória.
     * @param {String} name Nome de referência do arquivo de mídia para ser utilizado dentro da interface do programa, algo como um "id".
     * @param {String} filename Nome do arquivo de mídia.
     * @param {?|Boolean} find_strip Procura por uma sequência de sprites com o mesmo nome que seguem uma sequência e possuem "strip" no nome do arquivo.
     * Adiciona um overhead à função, mas é útil para importação de uma sequência de sprites de uma animação.
     * @returns Retorna uma array contendo o caminho para cada arquivo adicionado.
     */
    loadImage(name, filename, find_strip = false)
    {
        if(typeof filename != 'string') throw new Error("O nome do arquivo deve ser uma string.");

        const full_path = `${this.img_base_path}/${filename.trim()}`;

        // Verifica se o arquivo `filename` já foi carregado na memória.
        if(this.src_list.has(filename))
        {
            console.warn("O arquivo", filename, "já foi carregado.");
            return new Set([filename]);
        }

        // Verifica se `name` já foi registrado.
        if(this.sprites.has(name))
        {
            console.warn("Já existe um sprite registrado sob o id", name, "na memória.");
            return new Set([this.sprites.get(name).src]);
        }

        // Verificação sobre `find_strip`.
        if(find_strip)
        {
            // Verifica se a palavra `strip` está presente no nome do arquivo e executa `loadStrip`.
            const strip_index = filename.search(/strip/);
            if(strip_index >= 0)
            {
                const strip = this.loadStrip(filename);
                
                if(strip)
                {
                    let index = 0;
                    
                    strip.forEach( src =>
                    {
                        const img = new Image();
                        img.src = src;

                        this.sprites.set(`${name}${index++}`, {img: img, src: src});
                    });

                    return strip;
                }
            }
        }

        // Nesse caso, não se preocupa em encontrar algum tipo de continuidade da imagem buscada.
        const img = new Image();
        img.src = full_path;

        this.sprites.set(name, {img: img, src: full_path});

        return new Set([img.src]);
    }

    /**
     * Carrega uma sequência de sprites com o mesmo nome.
     * @param {String} filename Nome base do arquivo.
     * @returns uma lista caminhos para imagens que (teoricamente) formam uma sequência.
     */
    loadStrip(filename)
    {
        /** Índice de ordem do sprite na sequência/strip (em forma de string). */
        const sprite_index = filename.match(/\d{1,3}/g).pop();
        
        /** Índice em forma numérica. */
        let sprites_index = Number(sprite_index);
        
        /** Número de casas decmimais do índice de um sprite pertencente a uma animação. */
        let index_len = sprite_index.length;

        /** Índice da posição na string de `filename` onde o índice do sprite em uma sequência (strip) está localizado. */
        const index_pos = filename.indexOf(sprite_index);

        /** Núcleo do caminho para o sprite antes do índice de ordem na sequência (strip). */
        const sprite_path_core1 = `${this.img_base_path}/${filename.substring(0, index_pos)}`;

        /** Continuação do nome do caminho para o sprite da sequência após o índice. */
        const sprite_path_core2 = filename.substring(index_pos+index_len, filename.length-1);

        /** Sequência/tira de sprites de uma mesma animação. */
        const strip = new Set();

        let finished = false;

        while(index_pos >= 0)
        {
            /** Path para o sprite. */
            const path = sprite_path_core1 + sprites_index + sprite_path_core2;

            this.checkFileExists(path).then( exists =>
            {
                if(exists) strip.add(path);
                else finished = true;
                
            });

            if(finished) break;

            // Verifica se a quantidade de casas decimais no índice aumentou e atualiza posição de `sprite_path_core2`.
            if(sprites_index.toString().length != ++sprites_index.toString())
            {
                index_len++;
                sprite_path_core2 = filename.substring(index_pos+index_len, filename.length-1);
            }
        }

        return strip.size>0 ? strip : undefined;
    }
}


export default ImageManager;