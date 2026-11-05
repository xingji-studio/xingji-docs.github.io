import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { build, rewriteMarkdownLink } from '../scripts/build.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetDir = path.join(projectRoot, 'src');

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'xingji-docs-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const sourceDir = path.join(root, 'docs');
  const outDir = path.join(root, 'out');
  await fs.mkdir(sourceDir);
  async function write(name, content) {
    const filename = path.join(sourceDir, name);
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, content);
  }
  return { root, sourceDir, outDir, write };
}

test('builds every Markdown file faithfully and resolves document links and assets', async (t) => {
  const { sourceDir, outDir, write } = await fixture(t);
  const content = `# 原文标题\n\n**原样重复**\n\n**原样重复**\n\n[跨页](../空%20白.md?mode=raw#章节) · [站外](https://example.com/a.md)\n\n![图片](./diagram.svg)\n\n| 名称 | 内容 |\n| :---: | ---: |\n| 一 | 二 |\n\n- [x] 完成\n- [ ] 待办\n\n\`\`\`cpp\nvector<T> value;\n\`\`\`\n\n<div data-example="yes">原始 HTML</div>\n\n脚注引用[^1]。\n\n[^1]: 脚注内容\n\n## 章节\n\n## 章节\n`;
  await write('README.md', '# 首页\n\n[内容](guide/deep/source.md)');
  await write('_sidebar.md', '## 文档\n\n* [源文档](guide/deep/source.md)');
  await write('guide/deep/source.md', content);
  await write('guide/空 白.md', '# 有空格的路径');
  await write('guide/index.md', '# 目录页面\n\n![图片](./deep/diagram.svg)');
  await write('orphan.md', '# 未加入目录的文档');
  await write('guide/deep/diagram.svg', '<svg></svg>');
  await build({ sourceDir, outDir, assetDir });

  const html = await fs.readFile(path.join(outDir, 'guide/deep/source.html'), 'utf8');
  assert.match(html, /<link rel="icon" href="\/_site\/logo\/XINGJI_rect\.png" type="image\/png">/);
  assert.match(html, /<img class="brand-logo" src="\/_site\/logo\/XINGJI\.png" alt="" width="3208" height="897">/);
  assert.match(html, /<h1 id="原文标题">原文标题<\/h1>/);
  assert.equal((html.match(/<strong>原样重复<\/strong>/g) || []).length, 2);
  assert.match(html, /href="\/guide\/%E7%A9%BA%20%E7%99%BD\?mode=raw#%E7%AB%A0%E8%8A%82"/);
  assert.match(html, /href="https:\/\/example\.com\/a\.md"/);
  assert.match(html, /src="\/guide\/deep\/diagram\.svg"/);
  assert.match(html, /<table>/);
  assert.match(html, /<th align="center">名称<\/th>/);
  assert.match(html, /<td align="right">二<\/td>/);
  assert.match(html, /type="checkbox" checked disabled/);
  assert.match(html, /vector&#x3C;T> value;/);
  assert.match(html, /<div data-example="yes">原始 HTML<\/div>/);
  assert.match(html, /脚注内容/);
  assert.match(html, /id="章节"/);
  assert.match(html, /id="章节-1"/);
  assert.match(await fs.readFile(path.join(outDir, 'orphan.html'), 'utf8'), /未加入目录的文档/);
  assert.equal(await fs.readFile(path.join(outDir, 'guide/deep/diagram.svg'), 'utf8'), '<svg></svg>');
  assert.deepEqual(await fs.readFile(path.join(outDir, '_site/logo/XINGJI.png')), await fs.readFile(path.join(assetDir, 'logo/XINGJI.png')));
  assert.deepEqual(await fs.readFile(path.join(outDir, '_site/logo/XINGJI_rect.png')), await fs.readFile(path.join(assetDir, 'logo/XINGJI_rect.png')));
  assert.match(await fs.readFile(path.join(outDir, 'guide/index/index.html'), 'utf8'), /src="\/guide\/deep\/diagram\.svg"/);
  assert.match(await fs.readFile(path.join(outDir, 'index.html'), 'utf8'), /<h1 id="首页">首页<\/h1>/);
  assert.match(await fs.readFile(path.join(outDir, 'README.html'), 'utf8'), /<h1 id="首页">首页<\/h1>/);
  assert.equal(await fs.readFile(path.join(sourceDir, 'guide/deep/source.md'), 'utf8'), content);
});

test('keeps deeply nested sidebar items independently collapsible', async (t) => {
  const { sourceDir, outDir, write } = await fixture(t);
  const deepList = Array.from({ length: 9 }, (_, index) => `${'    '.repeat(index)}* [第 ${index + 1} 层](deep.md#level-${index + 1})`).join('\n');
  await write('README.md', '# 首页');
  await write('deep.md', '# 深层文档');
  await write('_sidebar.md', `## 一级标题\n\n### 二级标题\n\n${deepList}\n`);
  await build({ sourceDir, outDir, assetDir });
  const html = await fs.readFile(path.join(outDir, 'deep.html'), 'utf8');
  const nav = html.match(/<nav class="navigation"[\s\S]*?<\/nav>/)[0];
  // Two headings and the first eight list levels all have their own children.
  assert.equal((nav.match(/<details\b/g) || []).length, 10);
  assert.match(nav, /href="\/deep#level-9"/);
  assert.equal((nav.match(/data-nav-item/g) || []).length, 11);
});

test('does not silently overwrite assets with generated pages', async (t) => {
  const { sourceDir, outDir, write } = await fixture(t);
  await write('README.md', '# 首页');
  await write('_sidebar.md', '## 目录');
  await write('clash.md', '# 文档');
  await write('clash.html', 'existing asset');
  await assert.rejects(build({ sourceDir, outDir, assetDir }), /输出路径冲突：clash\.html/);
  assert.equal(await fs.readFile(path.join(sourceDir, 'clash.html'), 'utf8'), 'existing asset');
});

test('rewrites only relative Markdown links while preserving query and fragment', () => {
  assert.equal(rewriteMarkdownLink('../x.md?mode=1#标题', 'a/b/c.md'), '/a/x?mode=1#标题');
  assert.equal(rewriteMarkdownLink('/a/x.MD#section', 'b.md'), '/a/x#section');
  assert.equal(rewriteMarkdownLink('https://example.com/x.md', 'b.md'), 'https://example.com/x.md');
  assert.equal(rewriteMarkdownLink('#section', 'b.md'), '#section');
  assert.equal(rewriteMarkdownLink('./image.png', 'b.md'), './image.png');
});
