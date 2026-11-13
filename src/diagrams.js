const sources = [...document.querySelectorAll('.markdown-body pre[data-mermaid]')];

function showError(source, message) {
  const error = document.createElement('p');
  error.className = 'diagram-error';
  error.setAttribute('role', 'status');
  error.textContent = message;
  source.before(error);
}

try {
  const { default: mermaid } = await import('./vendor/mermaid/mermaid.esm.min.mjs');
  await document.fonts.ready;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    suppressErrorRendering: true,
    theme: 'neutral',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif',
    flowchart: { htmlLabels: false },
  });

  // Render separately so one invalid diagram does not prevent later ones from appearing.
  for (const [index, source] of sources.entries()) {
    try {
      const { svg, bindFunctions } = await mermaid.render(`mermaid-diagram-${index}`, source.textContent);
      const figure = document.createElement('figure');
      figure.className = 'diagram';
      figure.setAttribute('aria-label', 'Mermaid 图表');
      const drawing = document.createElement('div');
      drawing.className = 'diagram-drawing';
      drawing.tabIndex = 0;
      drawing.setAttribute('aria-label', '图表，可横向滚动');
      drawing.innerHTML = svg;
      const svgElement = drawing.querySelector('svg');
      // Keep labels readable on narrow screens and let the container scroll.
      if (svgElement?.viewBox.baseVal.width) svgElement.setAttribute('width', String(svgElement.viewBox.baseVal.width));
      const details = document.createElement('details');
      details.className = 'diagram-source';
      const summary = document.createElement('summary');
      summary.textContent = '查看图表源码';
      details.append(summary);
      figure.append(drawing, details);
      source.replaceWith(figure);
      details.append(source);
      bindFunctions?.(drawing);
    } catch {
      showError(source, '图表渲染失败，请检查 Mermaid 语法。下方保留了源码。');
    }
  }
} catch {
  for (const source of sources) showError(source, '图表组件加载失败，刷新页面可重试。下方保留了源码。');
}
