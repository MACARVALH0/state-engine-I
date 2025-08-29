import fs from "fs";
import yaml from "js-yaml";

export function loadDirConfig(file_path = "./State/src/dir_config.yml")
{
	try
	{
        const file = fs.readFileSync(file_path, "utf8");

		/**
		 * Conteúdo do arquivo de configuração de caminhos para diretórios de arquivos do jogo.
		 * @type {Object} Objeto de configurações.
		 */
    	const config = yaml.load(file);
      
        return config;
    }

    catch (err)
	{
		// console.error("Erro ao carregar YAML:", err);
		throw new Error("Não foi possível carregar o arquivo YAML em \`" + file_path + "\`.\n"  + err);
    }
}
