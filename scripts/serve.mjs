import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf'};
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const path = decodeURIComponent(url.pathname);
    // Serve only the public site; exclude repository internals and maintenance scripts.
    if (path.split('/').some(part => part.startsWith('.') || part === 'scripts' || part === 'state')) { res.writeHead(404); return res.end(); }
    const file = resolve(root, '.' + (path.endsWith('/') ? path + 'index.html' : path));
    if (!file.startsWith(root + sep) || !['GET','HEAD'].includes(req.method)) { res.writeHead(404); return res.end(); }
    const content = await readFile(file);
    res.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404); res.end('Página não encontrada'); }
}).listen(Number(process.env.PORT || 4174), '127.0.0.1', () => console.log('Site em http://localhost:' + (process.env.PORT || 4174)));
