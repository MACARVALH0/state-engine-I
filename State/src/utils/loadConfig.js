import fs from "fs";
import yaml from "js-yaml";

export function loadConfig(file_path = "./config.yml")
{
    try
    {
        const file = fs.readFileSync(file_path, "utf8");
        const config = yaml.load(file);
      
        return config;
      }
      catch (err)
      {
        console.error("Erro ao carregar YAML:", err);
        throw new Error("Não foi possível carregar o arquivo YAML:\n"+err);
      }
      
}
