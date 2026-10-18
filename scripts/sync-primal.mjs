import { cpSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] || join(root, '../../Jogos/Primal-Clash'));
const { STAGES } = await import(pathToFileURL(join(source, 'src/campaign.js')));
// Copy only runtime files. Keep repository history, tests and exports private.
const files = [...new Set(['index.html', 'style.css', 'menu.mp3',
  ...STAGES.flatMap(stage => [stage.music, stage.art]),
  'assets/campaign-map.png', 'assets/dinosaurs-daylight.png',
  'assets/fonts/Tiny5-Regular.ttf', 'assets/fonts/OFL.txt',
  ...readdirSync(join(source, 'src')).filter(name => name.endsWith('.js') && name !== 'crazygames-entry.js').map(name => 'src/' + name)
])];
for (const file of files) if (!existsSync(join(source, file))) throw new Error(`Arquivo ausente: ${file}`);
const targets = [join(root, 'jogos/primal-clash/play')];
const blog = resolve(process.argv[3] || join(root, '../brunomartins94.github.io'));
if (existsSync(join(blog, 'astro.config.mjs'))) targets.push(join(blog, 'public/jogar/primal-clash/play'));
for (const target of targets) {
  for (const file of files) {
    mkdirSync(dirname(join(target, file)), { recursive: true });
    cpSync(join(source, file), join(target, file));
  }
  console.log(`Primal Clash: ${files.length} arquivos em ${target}`);
}
