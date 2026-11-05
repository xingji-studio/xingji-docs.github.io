import { once } from 'node:events';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import chokidar from 'chokidar';
import { createPreviewServer } from './preview.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(root, 'docs');
const assets = path.join(root, 'src');
const buildScript = path.join(root, 'scripts/build.mjs');
const output = path.join(root, '.dev-dist');
const next = path.join(root, '.dev-dist-next');
const previous = path.join(root, '.dev-dist-old');
let port = Number(process.env.PORT || 5173);
const server = createPreviewServer({ root: output, liveReload: true });

// Poll on WSL so edits made by Windows editors are detected on mounted drives.
const usePolling = process.env.CHOKIDAR_USEPOLLING === '1' || /microsoft/i.test(os.release());
const watcher = chokidar.watch([docs, assets, buildScript], {
  ignoreInitial: true,
  usePolling,
  interval: 150,
  awaitWriteFinish: { stabilityThreshold: 150, pollInterval: 50 },
});
let pending = false;
let running = null;
let debounce;
let version = 0;
let hasSuccessfulBuild = false;

async function buildNext() {
  // A new module URL makes edits to the page template take effect without restarting dev mode.
  const { build } = await import(`${pathToFileURL(buildScript).href}?version=${version++}`);
  await build({ sourceDir: docs, assetDir: assets, outDir: next });
  await fs.rm(previous, { recursive: true, force: true });
  let hadPrevious = false;
  try {
    await fs.rename(output, previous);
    hadPrevious = true;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  try {
    await fs.rename(next, output);
  } catch (error) {
    if (hadPrevious) await fs.rename(previous, output);
    throw error;
  }
  await fs.rm(previous, { recursive: true, force: true });
  hasSuccessfulBuild = true;
}

function rebuild() {
  if (running) return running;
  running = (async () => {
    while (pending) {
      pending = false;
      try {
        await buildNext();
        if (!pending) server.reload();
      } catch (error) {
        console.error('开发模式构建失败，修正文件后会自动重试：', error);
      }
    }
  })().finally(() => { running = null; });
  return running;
}

watcher.on('all', () => {
  pending = true;
  clearTimeout(debounce);
  debounce = setTimeout(() => { void rebuild(); }, 120);
});
watcher.on('error', (error) => console.error('文件监听失败：', error));

async function shutdown() {
  clearTimeout(debounce);
  await watcher.close();
  server.closeLiveConnections();
  if (server.listening) server.close();
}
process.once('SIGINT', () => { void shutdown(); });
process.once('SIGTERM', () => { void shutdown(); });
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && port < 65535) {
    console.log(`端口 ${port} 已被占用，尝试下一个端口。`);
    server.listen(++port, '127.0.0.1');
  } else {
    console.error('开发服务器启动失败：', error);
    process.exitCode = 1;
    void shutdown();
  }
});

try {
  await once(watcher, 'ready');
  pending = true;
  await rebuild();
  if (!hasSuccessfulBuild) {
    await watcher.close();
    process.exitCode = 1;
  } else {
    server.listen(port, '127.0.0.1', () => {
      console.log(`开发服务器：http://localhost:${server.address().port}`);
      console.log('修改 docs/、src/ 或 scripts/build.mjs 后，浏览器将自动刷新。');
    });
  }
} catch (error) {
  console.error('无法启动开发服务器：', error);
  await watcher.close();
  process.exitCode = 1;
}
