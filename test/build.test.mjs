import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import rehypeRaw from 'rehype-raw';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import { build, rewriteMarkdownLink } from '../scripts/build.mjs';
import { createPreviewServer } from '../scripts/preview.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetDir = path.join(projectRoot, 'src');

function elements(html, tagName) {
  const tree = unified().use(rehypeRaw).runSync({ type: 'root', children: [{ type: 'raw', value: html }] });
  const matches = [];
  visit(tree, 'element', (node) => { if (node.tagName === tagName) matches.push(node); });
  return matches;
}

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
  assert.equal(toString(elements(html, 'code')[0]), 'vector<T> value;\n');
  assert.match(html, /class="language-cpp hljs"/);
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
  // Links to different anchors in the current document must not open every branch.
  assert.equal((nav.match(/<details open>/g) || []).length, 1);
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

test('highlights mainstream languages and aliases without changing code text', async (t) => {
  const { sourceDir, outDir, write } = await fixture(t);
  const cases = [
    ['c', '#include <stdio.h>\nint main(void) { return 0; }'],
    ['cpp', '#include <iostream>\nint main() { std::cout << "Hello"; }'],
    ['C++', 'int main() { return 0; }'],
    ['java', 'public class Main { String value = "Hello"; }'],
    ['csharp', 'using System; class Program { static void Main() {} }'],
    ['C#', 'Console.WriteLine("Hello");'],
    ['cs', 'public class Program { int value = 1; }'],
    ['bash', '#!/bin/bash\nprintf "%s\\n" "$HOME"'],
    ['sh', 'echo "Hello"'],
    ['shell', '$ echo "Hello"'],
    ['javascript', 'const value = "Hello";'],
    ['js', 'const value = 42;'],
    ['typescript', 'const value: string = "Hello";'],
    ['ts', 'interface Value { name: string; }'],
    ['python', 'def hello():\n    return "Hello"'],
    ['py', 'print("Hello")'],
    ['go', 'package main\nfunc main() { println("Hello") }'],
    ['rust', 'fn main() { println!("Hello"); }'],
    ['sql', 'SELECT * FROM users WHERE id = 1;'],
    ['json', '{"name": "Hello", "count": 1}'],
    ['yaml', 'name: Hello\ncount: 1'],
    ['html', '<div title="Hello">World</div>'],
    ['css', '.hello { color: red; }'],
    ['powershell', 'Write-Host "Hello"'],
    ['', '<script>alert("$literal$")</script> & **text**'],
    ['text', '<tag> $literal$ & **text**'],
    ['unknown-language', '<tag> $literal$ & **text**'],
  ];
  await write('README.md', '# 代码\n\n' + cases.map(([language, code]) => `\`\`\`${language}\n${code}\n\`\`\``).join('\n\n'));
  await write('_sidebar.md', '## 文档');
  await build({ sourceDir, outDir, assetDir });
  const html = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');
  const codes = elements(html, 'code');
  assert.equal(codes.length, cases.length);
  for (const [index, [language, code]] of cases.entries()) {
    assert.equal(toString(codes[index]), `${code}\n`, language);
    const highlighted = index < cases.length - 3;
    assert.equal(Boolean(codes[index].properties.className?.includes('hljs')), highlighted, language);
    assert.equal(codes[index].children.some((node) => node.type === 'element'), highlighted, language);
  }
  assert.doesNotMatch(html, /src="\/_site\/diagrams\.js"|vendor\/katex\/katex\.min\.css/);
});

test('renders math, alerts, front matter and local diagram assets together', async (t) => {
  const { sourceDir, outDir, write } = await fixture(t);
  const fence = (language, code) => `\`\`\`${language}\n${code}\n\`\`\``;
  const diagrams = ['flowchart TD\n    A[开始] --> B[结束]', 'this is invalid Mermaid', 'sequenceDiagram\n    A->>B: Hello'];
  const source = [
    '---\ntitle: hidden-metadata\ntags: [guide]\n---', '# 扩展示例',
    '## 同名标题', '## 同名标题', '### 标题中的 $x^2$',
    '行内公式 $E = mc^2$，转义美元符号 \\$100，`$literal$`。',
    '$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$',
    '$$\n\\frac{\n$$',
    ...['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'].map((kind) => `> [!${kind}]\n> **内容** [首页](README.md)`),
    '> 普通引用\n> [!NOTE]inline',
    ...diagrams.map((code) => fence('mermaid', code)),
    '<details>\n<summary>更多</summary>\n\n**可折叠内容**\n\n</details>',
    '脚注[^note]。\n\n[^note]: 脚注正文',
  ].join('\n\n');
  await write('README.md', source);
  await write('_sidebar.md', '## 文档');
  await build({ sourceDir, outDir, assetDir });
  const html = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /hidden-metadata/);
  assert.match(html, /<title>扩展示例 \| XINGJI 文档<\/title>/);
  assert.match(html, /class="katex"/);
  assert.match(html, /class="katex-display"/);
  assert.match(html, /<math xmlns="http:\/\/www.w3.org\/1998\/Math\/MathML"/);
  assert.match(html, /class="katex-error"/);
  assert.match(html, /\$100/);
  assert.equal(toString(elements(html, 'code')[0]), '$literal$');
  assert.match(html, /<h2 id="同名标题">同名标题<a class="heading-anchor" href="#%E5%90%8C%E5%90%8D%E6%A0%87%E9%A2%98"/);
  assert.match(html, /id="同名标题-1"/);
  assert.match(html, /<li class="toc-level-2"><a href="#[^"]+">同名标题<\/a>/);
  assert.match(html, /<li class="toc-level-3"><a href="#[^"]+">标题中的 x\^2<\/a>/);
  for (const kind of ['note', 'tip', 'important', 'warning', 'caution']) {
    assert.match(html, new RegExp(`class="markdown-alert markdown-alert-${kind}"`));
  }
  assert.match(html, /<strong>内容<\/strong> <a href="\/README">首页<\/a>/);
  assert.match(html, /<blockquote>\n<p>普通引用\n\[!NOTE\]inline<\/p>\n<\/blockquote>/);
  const renderedDiagrams = elements(html, 'pre').filter((node) => 'dataMermaid' in node.properties);
  assert.deepEqual(renderedDiagrams.map((node) => toString(node)), diagrams.map((code) => `${code}\n`));
  assert.match(html, /<script type="module" src="\/_site\/diagrams\.js"><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\/_site\/vendor\/katex\/katex\.min\.css">/);
  assert.match(html, /<summary>更多<\/summary>/);
  assert.match(html, /<strong>可折叠内容<\/strong>/);
  assert.match(html, /<h2 class="sr-only" id="footnote-label">脚注<\/h2>/);
  assert.match(html, /aria-label="返回正文"/);
  for (const name of ['mermaid/mermaid.esm.min.mjs', 'mermaid/LICENSE', 'katex/katex.min.css', 'katex/fonts/KaTeX_Main-Regular.woff2', 'katex/LICENSE']) {
    assert.ok((await fs.stat(path.join(outDir, '_site/vendor', name))).size > 0, name);
  }
  // Every bundled module import must resolve locally, including lazy diagram types.
  const vendorDir = path.join(outDir, '_site/vendor/mermaid');
  const chunksDir = path.join(vendorDir, 'chunks/mermaid.esm.min');
  const modules = [path.join(vendorDir, 'mermaid.esm.min.mjs'), ...(await fs.readdir(chunksDir)).map((name) => path.join(chunksDir, name))];
  assert.ok(modules.length > 10);
  for (const filename of modules) {
    const script = await fs.readFile(filename, 'utf8');
    for (const [, relative] of script.matchAll(/(?:from\s*|import\s*\(|import\s*)["'](\.[^"']+\.mjs)["']/g)) {
      await assert.doesNotReject(fs.access(path.resolve(path.dirname(filename), relative)), relative);
    }
  }
  assert.equal(await fs.readFile(path.join(sourceDir, 'README.md'), 'utf8'), source);
});

test('reserves vendor asset paths before writing the build output', async (t) => {
  const { sourceDir, outDir, write } = await fixture(t);
  await write('README.md', '# 首页');
  await write('_sidebar.md', '## 文档');
  await write('_site/vendor/mermaid/mermaid.esm.min.mjs', 'conflicting asset');
  await assert.rejects(build({ sourceDir, outDir, assetDir }), /输出路径冲突/);
});

test('serves diagram ES modules with a JavaScript content type', async (t) => {
  const { sourceDir, write } = await fixture(t);
  const script = 'export default { diagram: true };';
  await write('_site/vendor/diagram.mjs', script);
  const server = createPreviewServer({ root: sourceDir });
  const response = await new Promise((resolve) => {
    server.emit('request', { method: 'GET', url: '/_site/vendor/diagram.mjs' }, {
      writeHead(status, headers) { this.status = status; this.headers = headers; return this; },
      end(body) { resolve({ status: this.status, headers: this.headers, body }); },
    });
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers['Content-Type'], 'text/javascript; charset=utf-8');
  assert.equal(response.body.toString(), script);
});
