import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] || join(root, '../../Jogos/orbital.io/public'));
const files = ['index.html', 'game.js', 'i18n.js', 'ui.js', 'planet-art.js', 'engine.js', 'bots.js', 'solo-session.js', 'solo-worker.js', 'local-session.js', 'fonts'];
for (const file of files) if (!existsSync(join(source, file))) throw new Error(`Arquivo ausente: ${join(source, file)}`);
const targets = [join(root, 'jogos/orbital/play')];
const blog = resolve(process.argv[3] || join(root, '../brunomartins94.github.io'));
if (existsSync(join(blog, 'astro.config.mjs'))) targets.push(join(blog, 'public/jogar/orbital/play'));
for (const target of targets) {
  mkdirSync(target, { recursive: true });
  for (const file of files) cpSync(join(source, file), join(target, file), { recursive: true });
  const entry = join(target, 'index.html');
  // Standalone hosting does not load the portal SDK or depend on its services.
  const html = readFileSync(entry, 'utf8')
    .replace(/\s*<!-- SDK v3[^]*?-->\s*<script async src="https:\/\/sdk\.crazygames\.com\/crazygames-sdk-v3\.js"><\/script>/, '')
    .replace(/window\.ORBITAL_CONFIG = \{[^]*?\};/, 'window.ORBITAL_CONFIG = { singlePlayer: true, rewardedAdsEnabled: false };');
  writeFileSync(entry, html);
  console.log(`Orbital.io atualizado em ${target}`);
}
