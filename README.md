# Bruno Martins — site pessoal

Portfólio com três áreas de atuação: desenvolvimento de sistemas, aplicativos e sites; desenvolvimento de games; engenharia de dados.

## Executar localmente

Com Node.js instalado, execute `npm start` e abra http://localhost:4174. Não há dependências para instalar. O servidor local apenas entrega arquivos estáticos.

## Orbital.io jogável

O botão **Jogar agora** abre `jogos/orbital/`, com retorno ao portfólio, opção de tela cheia e alternativa para abrir o jogo diretamente. A simulação roda no navegador, com nove bots e três dificuldades. Não depende de Node.js, WebSocket ou VPS em produção. A cópia do site não carrega o SDK da CrazyGames.

Para atualizar a cópia do jogo, execute `npm run sync:orbital`. O script busca `../../Jogos/orbital.io/public` e também atualiza os arquivos do blog vizinho, quando disponível. Caminhos alternativos podem ser passados como argumentos: `node scripts/sync-orbital.mjs "caminho/public" "caminho/blog"`.

## Publicar

Publique `index.html`, `style.css`, `menu.js`, `images/` e `jogos/` em uma hospedagem estática HTTPS. Preserve as pastas e os tipos MIME de JavaScript e fontes. Os links são relativos para funcionar também em subpastas, como `/personal_site/` no GitHub Pages. Não publique `.git/`, `state/` ou `scripts/`.

O primeiro acesso precisa carregar os arquivos; não há cache offline instalável. O navegador deve aceitar JavaScript, Canvas e Web Workers com módulos. Verifique mouse, toque e tela cheia no host final. As alterações locais não publicam o site nem cancelam serviços contratados.
