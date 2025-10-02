# Sobre a engine

​	**State** é o projeto de uma interface de desenvolvimento que fornece uma série de objetos 'pré-cozidos' pensados para a criação de experiências interativas na Web, como jogos, de forma intuitiva e fácil de aprender.


## Os pilares do projeto

Visando manter um padrão conciso no desenvolvimento da engine, o projeto busca manter os seguintes pilares de design:

1. **Aprendizado fácil:** O desenvolvedor deve ser capaz de criar projetos e se aprofundar nas capacidades da engine sem muita dificuldade.
2. **Agilidade:** A construção de protótipos funcionais deve ser fácil e ter o mínimo de complexidade possível.
3. **Compreensibilidade:** Objetos e configurações devem ter funcionalidades claras e compreensíveis a leitores humanos, de escopo bem definido na hora de sua utilização.

# State

O objeto `State` é o ponto de partida da engine, oferecendo as ferramentas adequadas para configurações de escopo global e criação do objeto `Game`, segundo na sucessão de atribuições, mais relacionado ao jogo em si.

# Game

Como mencionado anteriormente, é em `Game` que são definidas as configurações iniciais do jogo e em sua responsabilidade estão o loop principal e o gerenciador de cenas.

***Trabalho em progresso. * ** 👷‍♂️

<!--

# Documentação

Documentação referente à biblioteca de uma engine para programação de jogos e outras experiências virtuais. O código-fonte deste programa programa é escrito utilizando apenas **JavaScript puro**, disponível nas distribuições ECMAScript até o modelo ES6, especificamente para navegadores Web.





## Diretórios

Este trecho trata da descrição dos diretórios do projeto e suas respectivas atribuições na construção da biblioteca.

### `/engine`
​	Corresponde aos elementos essenciais da biblioteca, que descrevem estruturas básicas e atributos utilizados na construção das experiências que a engine é capaz de promover.

### `/game`

​	Contém os itens utilizados no desenvolvimento do jogo atual, com configurações globais, objetos e a definição de cenas. Nele estão contidos os subdiretórios: `scenes`.

1. **/game/scenes**

   Considerando a perspectiva de uma engine de jogos, definimos como "cenas" as abstrações de diferentes cenários em um jogo.

