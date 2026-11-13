import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toString as hastToString } from 'hast-util-to-string';
import { toString as mdastToString } from 'mdast-util-to-string';
import { all, createLowlight } from 'lowlight';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lowlight = createLowlight(all);
lowlight.registerAlias({ cpp: ['c++'], csharp: ['c#'] });
const markdownParser = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter).use(remarkMath);
const htmlProcessor = unified()
  .use(remarkAlerts)
  .use(remarkRehype, { allowDangerousHtml: true, footnoteLabel: '脚注', footnoteBackLabel: '返回正文' })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(() => (tree) => {
    // Read headings before KaTeX adds parallel HTML and MathML representations.
    visit(tree, 'element', (node) => {
      if (/^h[1-6]$/.test(node.tagName)) node.data = { ...node.data, headingText: hastToString(node) };
    });
  })
  .use(rehypeKatex, { trust: false, strict: 'ignore' })
  .use(rehypeCodeBlocks);
const htmlStringifier = unified().use(rehypeStringify);

function element(tagName, properties, children) {
  return { type: 'element', tagName, properties, children };
}

function text(value) {
  return { type: 'text', value };
}

function remarkAlerts() {
  const titles = { NOTE: '说明', TIP: '提示', IMPORTANT: '重要', WARNING: '警告', CAUTION: '注意' };
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const paragraph = node.children[0];
      const first = paragraph?.type === 'paragraph' && paragraph.children[0];
      const marker = first?.type === 'text' && first.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\r?\n|$)/);
      if (!marker) return;
      first.value = first.value.slice(marker[0].length);
      if (!first.value) paragraph.children.shift();
      if (!paragraph.children.length) node.children.shift();
      const kind = marker[1].toLowerCase();
      node.data = { ...node.data, hName: 'div', hProperties: { className: ['markdown-alert', `markdown-alert-${kind}`] } };
      node.children.unshift({
        type: 'paragraph', data: { hProperties: { className: ['markdown-alert-title'] } },
        children: [text(titles[marker[1]])],
      });
    });
  };
}

function rehypeCodeBlocks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre' || node.children.length !== 1) return;
      const code = node.children[0];
      if (code.type !== 'element' || code.tagName !== 'code') return;
      const classes = code.properties.className || [];
      const language = (classes.find((name) => name.startsWith('language-')) || '').slice(9).toLowerCase();
      if (language === 'mermaid') {
        node.properties.dataMermaid = '';
        node.properties.className = ['mermaid-source'];
        return;
      }
      const plain = ['', 'text', 'txt', 'plain', 'plaintext', 'no-highlight', 'nohighlight'].includes(language);
      if (!plain && lowlight.registered(language) && !classes.includes('no-highlight') && !classes.includes('nohighlight')) {
        code.children = lowlight.highlight(language, hastToString(code)).children;
        code.properties.className = [...classes, 'hljs'];
      }
      node.properties.dataCodeBlock = '';
      node.properties.dataLanguage = language || 'text';
      node.properties.tabIndex = 0;
    });
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function pageRoute(relativePath) {
  return '/' + relativePath.replace(/\.md$/i, '').split('/').map(encodeURIComponent).join('/');
}

// Relative Markdown links are resolved against the source file, then pointed at
// the matching extensionless static page. Other URLs keep their original meaning.
export function rewriteMarkdownLink(href, sourcePath) {
  if (typeof href !== 'string' || /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(href)) return href;
  const match = href.match(/^([^?#]*)([?#][\s\S]*)?$/);
  if (!match || !match[1]) return href;
  let target;
  try {
    target = decodeURIComponent(match[1]);
  } catch {
    return href;
  }
  if (!/\.md$/i.test(target)) return href;
  const resolved = target.startsWith('/')
    ? path.posix.resolve('/', target)
    : path.posix.resolve('/', path.posix.dirname(sourcePath), target);
  return pageRoute(resolved.slice(1)) + (match[2] || '');
}

function resolveRelativeResource(url, sourcePath) {
  if (typeof url !== 'string' || /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#|\?)/i.test(url)) return url;
  const match = url.match(/^([^?#]*)([?#][\s\S]*)?$/);
  if (!match || !match[1]) return url;
  try {
    const originalPath = decodeURIComponent(match[1]);
    const resolved = path.posix.resolve('/', path.posix.dirname(sourcePath), originalPath);
    const encoded = resolved.split('/').map(encodeURIComponent).join('/');
    const trailingSlash = originalPath.endsWith('/') && !encoded.endsWith('/') ? '/' : '';
    return encoded + trailingSlash + (match[2] || '');
  } catch {
    return url;
  }
}

function resolveHref(href, sourcePath) {
  const rewritten = rewriteMarkdownLink(href, sourcePath);
  return rewritten === href ? resolveRelativeResource(href, sourcePath) : rewritten;
}

function transformLinks(tree, sourcePath) {
  visit(tree, 'element', (node) => {
    if (node.tagName === 'a' && typeof node.properties?.href === 'string') {
      node.properties.href = resolveHref(node.properties.href, sourcePath);
    }
    if (['img', 'source', 'video', 'audio', 'iframe'].includes(node.tagName) && typeof node.properties?.src === 'string') {
      node.properties.src = resolveRelativeResource(node.properties.src, sourcePath);
    }
  });
}

function renderDocument(markdown, sourcePath) {
  const tree = htmlProcessor.runSync(markdownParser.parse(markdown));
  transformLinks(tree, sourcePath);
  let title = '';
  const headings = [];
  visit(tree, 'element', (node) => {
    if (!/^h[1-6]$/.test(node.tagName)) return;
    const text = (node.data?.headingText ?? hastToString(node)).trim();
    const depth = Number(node.tagName[1]);
    if (!title && depth === 1) title = text;
    const classes = node.properties?.className || [];
    if (depth >= 2 && depth <= 4 && text && node.properties?.id && !classes.includes('sr-only')) {
      headings.push({ depth, text, id: String(node.properties.id) });
    }
  });
  let hasMermaid = false;
  let hasMath = false;
  visit(tree, 'element', (node) => {
    if ('dataMermaid' in node.properties) hasMermaid = true;
    if (node.properties.className?.includes('katex')) hasMath = true;
    if (/^h[2-6]$/.test(node.tagName) && node.properties.id && !node.properties.className?.includes('sr-only')) {
      node.children.push(element('a', {
        className: ['heading-anchor'], href: `#${encodeURIComponent(node.properties.id)}`, ariaLabel: '链接到此标题',
      }, [text('#')]));
    }
  });
  return { title: title || path.posix.basename(sourcePath, path.posix.extname(sourcePath)), headings, hasMermaid, hasMath, html: htmlStringifier.stringify(tree) };
}

function sidebarTree(markdown) {
  const ast = markdownParser.parse(markdown);
  const definitions = ast.children.filter((node) => node.type === 'definition');
  const root = { children: [] };
  const stack = [{ depth: 0, node: root }];

  function listItems(list) {
    return list.children.map((item) => {
      const label = item.children.find((node) => node.type === 'paragraph') || { type: 'paragraph', children: [] };
      const children = item.children.filter((node) => node.type === 'list').flatMap(listItems);
      return { label, children, kind: 'item' };
    });
  }

  for (const node of ast.children) {
    if (node.type === 'heading') {
      while (stack.length > 1 && stack.at(-1).depth >= node.depth) stack.pop();
      const entry = { label: { type: 'paragraph', children: node.children }, children: [], kind: 'heading' };
      stack.at(-1).node.children.push(entry);
      stack.push({ depth: node.depth, node: entry });
    } else if (node.type === 'list') {
      stack.at(-1).node.children.push(...listItems(node));
    } else if (node.type === 'paragraph') {
      stack.at(-1).node.children.push({ label: node, children: [], kind: 'item' });
    }
  }
  return { children: root.children, definitions };
}

function sidebarHtml(sidebar, currentRoute) {
  function renderLabel(label) {
    const tree = htmlProcessor.runSync({ type: 'root', children: [label, ...sidebar.definitions] });
    transformLinks(tree, '_sidebar.md');
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href === currentRoute) {
        node.properties.ariaCurrent = 'page';
      }
    });
    return htmlStringifier.stringify(tree).replace(/^<p>/, '').replace(/<\/p>\s*$/, '');
  }

  function renderEntries(entries, depth = 0) {
    if (!entries.length) return '';
    return `<ul class="nav-list ${depth === 0 ? 'nav-list-root' : 'nav-list-nested'}">${entries.map((entry) => {
      const label = renderLabel(entry.label);
      const search = escapeHtml(mdastToString(entry.label));
      const groupClass = entry.kind === 'heading' ? ' nav-heading' : '';
      if (!entry.children.length) {
        return `<li class="nav-item${groupClass}" data-nav-item data-search="${search}"><div class="nav-line">${label}</div></li>`;
      }
      const open = depth === 0 && entry.kind === 'heading';
      return `<li class="nav-item${groupClass}" data-nav-item data-search="${search}"><details${open ? ' open' : ''}><summary><span class="nav-label">${label}</span><svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m5 6 3 3 3-3"/></svg></summary>${renderEntries(entry.children, depth + 1)}</details></li>`;
    }).join('')}</ul>`;
  }
  return renderEntries(sidebar.children);
}

const githubIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.31-3.75-1.31-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.07-.68.07-.68 1.12.08 1.7 1.15 1.7 1.15 1 1.7 2.62 1.21 3.25.93.1-.72.39-1.21.7-1.49-2.47-.28-5.08-1.24-5.08-5.5 0-1.21.44-2.2 1.15-2.98-.11-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.14 1.77 1.14 2.98 0 4.27-2.61 5.21-5.1 5.49.4.35.75 1.02.75 2.06V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z"/></svg>`;

function pageTemplate({ title, html, headings, sidebar, currentRoute, sourcePath, hasMermaid = false, hasMath = false }) {
  const isHome = currentRoute === '/' || currentRoute === '/README';
  const crumbs = sourcePath ? sourcePath.replace(/\.md$/i, '').split('/').slice(0, -1) : [];
  const breadcrumb = `<a href="/">文档</a>${crumbs.map((part) => `<span aria-hidden="true">/</span><span>${escapeHtml(part)}</span>`).join('')}<span aria-hidden="true">/</span><span class="breadcrumb-current">${escapeHtml(isHome ? '首页' : title)}</span>`;
  const toc = headings.length ? `<aside class="toc" aria-label="本文目录"><div class="toc-inner"><div class="toc-title"><span></span> 本文目录</div><ol>${headings.map((heading) => `<li class="toc-level-${heading.depth}"><a href="#${encodeURIComponent(heading.id)}">${escapeHtml(heading.text)}</a></li>`).join('')}</ol><a class="back-to-top" href="#top">↑ <span>返回顶部</span></a></div></aside>` : '<aside class="toc" aria-hidden="true"></aside>';
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="XINGJI 工作室线上文档站，查阅开发文档与许可协议。">
<meta name="theme-color" content="#ffffff">
<title>${escapeHtml(title)} | XINGJI 文档</title>
<link rel="icon" href="/_site/logo/XINGJI_rect.png" type="image/png">
<link rel="stylesheet" href="/_site/site.css">
${hasMath ? '<link rel="stylesheet" href="/_site/vendor/katex/katex.min.css">' : ''}
<script src="/_site/site.js" defer></script>
${hasMermaid ? '<script type="module" src="/_site/diagrams.js"></script>' : ''}
</head>
<body id="top">
<a class="skip-link" href="#content">跳至正文</a>
<header class="topbar">
  <a class="brand" href="/" aria-label="XINGJI 文档首页"><img class="brand-logo" src="/_site/logo/XINGJI.png" alt="" width="3208" height="897"><span class="brand-context">DOCS</span></a>
  <span class="topbar-divider"></span><span class="topbar-label">工作室文档中心</span>
  <div class="topbar-actions"><span class="topbar-caption"><span class="status-dot"></span> 线上文档</span><a class="github-link" href="https://github.com/xingji-studio/xingji-docs.github.io" target="_blank" rel="noopener noreferrer">${githubIcon}<span>GitHub</span><span class="external-arrow" aria-hidden="true">↗</span></a><button class="menu-toggle" type="button" aria-controls="sidebar" aria-expanded="false" aria-label="打开文档目录"><span></span><span></span></button></div>
</header>
<div class="layout">
  <div class="sidebar-backdrop" hidden></div>
  <aside class="sidebar" id="sidebar" aria-label="文档导航">
    <div class="sidebar-content">
      <div class="sidebar-eyebrow">DOCUMENTATION <span>01 / INDEX</span></div>
      <div class="sidebar-title">浏览文档<span class="sidebar-title-dot">.</span></div>
      <p class="sidebar-description">探索 XINGJI 的开发指南与资料。</p>
      <label class="nav-search"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.7" cy="8.7" r="5.4"/><path d="m12.8 12.8 3.5 3.5"/></svg><span class="sr-only">筛选目录</span><input type="search" placeholder="筛选目录" autocomplete="off"><kbd>/</kbd></label>
      <nav class="navigation" aria-label="文档目录"><a class="home-link${isHome ? ' is-current' : ''}" href="/"${isHome ? ' aria-current="page"' : ''}><svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="m2.5 8 6.5-5.5L15.5 8v6.5h-5V10H7.5v4.5h-5V8Z"/></svg>文档首页<span>↗</span></a>${sidebarHtml(sidebar, isHome ? '/README' : currentRoute)}<p class="no-results" hidden>没有找到匹配的目录。</p></nav>
    </div>
    <div class="sidebar-footer"><span class="footer-mark">✳</span><span>保持好奇，持续创造。<small>XINGJI STUDIO</small></span></div>
  </aside>
  <main class="main" id="content" tabindex="-1"><div class="content-wrap"><div class="breadcrumb">${breadcrumb}</div><article class="markdown-body">${html}</article><footer class="article-footer"><div class="footer-line"></div><div><span>XINGJI STUDIO <b>／</b> DOCUMENTATION</span><a href="#top">返回顶部 ↑</a></div></footer></div></main>
  ${toc}
</div>
</body>
</html>\n`;
}

async function walk(directory, relative = '') {
  const entries = await fs.readdir(path.join(directory, relative), { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const next = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await walk(directory, next));
    else if (entry.isFile()) files.push(next);
  }
  return files;
}

function outputForMarkdown(relativePath) {
  const stem = relativePath.replace(/\.md$/i, '');
  // An index.html is special on static hosts, so keep index.md at its own URL.
  return path.posix.basename(stem).toLowerCase() === 'index' ? `${stem}/index.html` : `${stem}.html`;
}

async function vendorAssets() {
  const mermaidDist = path.dirname(fileURLToPath(import.meta.resolve('mermaid')));
  const katexDist = path.dirname(fileURLToPath(import.meta.resolve('katex')));
  const mermaidFiles = ['mermaid.esm.min.mjs', ...(await walk(path.join(mermaidDist, 'chunks/mermaid.esm.min')))
    .filter((name) => name.endsWith('.mjs')).map((name) => `chunks/mermaid.esm.min/${name}`)];
  const katexFiles = ['katex.min.css', ...(await walk(path.join(katexDist, 'fonts')))
    .filter((name) => /\.(?:woff2?|ttf)$/.test(name)).map((name) => `fonts/${name}`)];
  return [
    ...mermaidFiles.map((name) => ({ source: path.join(mermaidDist, name), output: `_site/vendor/mermaid/${name}` })),
    ...katexFiles.map((name) => ({ source: path.join(katexDist, name), output: `_site/vendor/katex/${name}` })),
    ...[['mermaid', mermaidDist], ['katex', katexDist]].map(([name, directory]) => ({
      source: path.join(directory, '../LICENSE'), output: `_site/vendor/${name}/LICENSE`,
    })),
  ];
}

export async function build({ sourceDir = path.join(projectRoot, 'docs'), outDir = path.join(projectRoot, 'dist'), assetDir = path.join(projectRoot, 'src') } = {}) {
  const files = await walk(sourceDir);
  const markdownFiles = files.filter((name) => /\.md$/i.test(name));
  if (!markdownFiles.includes('README.md') || !markdownFiles.includes('_sidebar.md')) {
    throw new Error('docs/README.md 和 docs/_sidebar.md 是构建所必需的。');
  }
  const assetFiles = files.filter((name) => !/\.md$/i.test(name) && name !== 'index.html');
  const siteAssets = ['site.css', 'site.js', 'diagrams.js', 'logo/XINGJI.png', 'logo/XINGJI_rect.png'];
  const vendors = await vendorAssets();
  const outputs = new Set(['index.html', ...siteAssets.map((asset) => `_site/${asset}`), ...vendors.map((asset) => asset.output)]);
  for (const filename of [...markdownFiles.map(outputForMarkdown), ...assetFiles]) {
    if (outputs.has(filename)) throw new Error(`输出路径冲突：${filename}`);
    outputs.add(filename);
  }
  const sidebar = sidebarTree(await fs.readFile(path.join(sourceDir, '_sidebar.md'), 'utf8'));
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(path.join(outDir, '_site'), { recursive: true });
  for (const asset of siteAssets) {
    const destination = path.join(outDir, '_site', asset);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(path.join(assetDir, asset), destination);
  }
  for (const asset of vendors) {
    const destination = path.join(outDir, asset.output);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(asset.source, destination);
  }
  for (const filename of assetFiles) {
    const destination = path.join(outDir, filename);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(path.join(sourceDir, filename), destination);
  }
  for (const filename of markdownFiles) {
    const document = renderDocument(await fs.readFile(path.join(sourceDir, filename), 'utf8'), filename);
    const output = outputForMarkdown(filename);
    const destination = path.join(outDir, output);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, pageTemplate({ ...document, sidebar, currentRoute: pageRoute(filename), sourcePath: filename }));
    if (filename === 'README.md') {
      await fs.writeFile(path.join(outDir, 'index.html'), pageTemplate({ ...document, sidebar, currentRoute: '/', sourcePath: filename }));
    }
  }
  if (!outputs.has('404.html')) {
    await fs.writeFile(path.join(outDir, '404.html'), pageTemplate({
      title: '页面未找到', html: '<h1>页面未找到</h1><p>这个页面不存在，或者已被移动。</p><p><a href="/">返回文档首页</a></p>',
      headings: [], sidebar, currentRoute: '/404', sourcePath: '',
    }));
  }
  console.log(`已生成 ${markdownFiles.length} 篇 Markdown 文档，输出目录：${outDir}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build().catch((error) => { console.error(error); process.exitCode = 1; });
}
