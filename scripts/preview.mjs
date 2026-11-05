import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.woff': 'font/woff', '.woff2': 'font/woff2',
};
const reloadClient = `<script>(() => {
  const events = new EventSource('/__xingji_dev/events');
  let connected = false;
  events.addEventListener('open', () => { if (connected) location.reload(); connected = true; });
  events.addEventListener('reload', () => location.reload());
})();</script>`;

async function existingFile(filename) {
  try {
    const stat = await fs.stat(filename);
    return stat.isFile() ? filename : stat.isDirectory() ? existingFile(path.join(filename, 'index.html')) : null;
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null;
    throw error;
  }
}

// The same static route handling is shared by production preview and dev mode.
export function createPreviewServer({ root = defaultRoot, liveReload = false } = {}) {
  const clients = new Set();
  root = path.resolve(root);
  const server = http.createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
      const requestPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (liveReload && req.method === 'GET' && requestPath === '/__xingji_dev/events') {
        res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
        res.write(': connected\n\n');
        clients.add(res);
        res.on('close', () => clients.delete(res));
        return;
      }
      const target = path.resolve(root, '.' + requestPath);
      if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
      const file = await existingFile(target) || await existingFile(target + '.html');
      const chosen = file || path.join(root, '404.html');
      const content = await fs.readFile(chosen);
      const extension = path.extname(chosen).toLowerCase();
      const headers = { 'Content-Type': mime[extension] || 'application/octet-stream' };
      if (liveReload) headers['Cache-Control'] = 'no-store';
      res.writeHead(file ? 200 : 404, headers);
      if (req.method === 'HEAD') { res.end(); return; }
      if (liveReload && extension === '.html') {
        res.end(content.toString('utf8').replace('</body>', `${reloadClient}</body>`));
      } else {
        res.end(content);
      }
    } catch (error) {
      res.writeHead(error instanceof URIError ? 400 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('预览服务出错。请先运行 npm run build。');
      console.error(error.message);
    }
  });
  server.reload = () => { for (const client of clients) client.write('event: reload\ndata: changed\n\n'); };
  server.closeLiveConnections = () => { for (const client of clients) client.end(); clients.clear(); };
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  createPreviewServer().listen(port, '127.0.0.1', () => console.log(`本地预览：http://127.0.0.1:${port}`));
}
