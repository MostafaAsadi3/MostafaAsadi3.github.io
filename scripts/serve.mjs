import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('dist');
const port = Number(process.env.PORT || 4321);
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json' };

export const server = createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
    if (base && pathname !== base && !pathname.startsWith(`${base}/`)) {
      response.writeHead(404).end();
      return;
    }
    pathname = pathname.slice(base.length);
    let file = resolve(root, `.${pathname || '/'}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' }).end(content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(await readFile(resolve(root, '404.html')));
  }
}).listen(port, '0.0.0.0', () => console.log(`Portfolio ready at http://127.0.0.1:${port}${base}/`));
