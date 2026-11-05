const menuButton = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const backdrop = document.querySelector('.sidebar-backdrop');
const navigation = document.querySelector('.navigation');
const search = document.querySelector('.nav-search input');
const noResults = document.querySelector('.no-results');
let savedDetails = null;

function setMenu(open) {
  document.body.classList.toggle('nav-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭文档目录' : '打开文档目录');
  backdrop.hidden = !open;
}
menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
backdrop.addEventListener('click', () => setMenu(false));
window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (document.body.classList.contains('nav-open')) { setMenu(false); menuButton.focus(); }
    else if (document.activeElement === search) { search.value = ''; filterNavigation(); search.blur(); }
  }
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
    event.preventDefault();
    if (window.innerWidth <= 760) setMenu(true);
    search.focus();
  }
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && window.innerWidth <= 760) setMenu(false);
});

function currentNavigation() {
  const links = [...navigation.querySelectorAll('a[href]')];
  const normalizePath = (value) => value === '/README' ? '/' : (value.replace(/\/+$/, '') || '/');
  const currentPath = normalizePath(window.location.pathname);
  const candidates = links.filter((link) => {
    const url = new URL(link.href, window.location.href);
    const linkPath = normalizePath(url.pathname);
    return url.origin === window.location.origin && linkPath === currentPath;
  });
  let current = candidates.find((link) => link.hash && link.hash === window.location.hash);
  if (!current) current = candidates.find((link) => !link.hash);
  for (const link of links) {
    link.removeAttribute('aria-current');
    if (link.classList.contains('home-link')) link.classList.remove('is-current');
  }
  if (current) {
    current.setAttribute('aria-current', current.hash ? 'location' : 'page');
    if (current.classList.contains('home-link')) current.classList.add('is-current');
    let ancestor = current.parentElement;
    while (ancestor && ancestor !== navigation) {
      if (ancestor.tagName === 'DETAILS') ancestor.open = true;
      ancestor = ancestor.parentElement;
    }
  }
}
window.addEventListener('hashchange', currentNavigation);
currentNavigation();

function filterNavigation() {
  const query = search.value.trim().toLocaleLowerCase();
  const details = [...navigation.querySelectorAll('details')];
  if (query && !savedDetails) savedDetails = new Map(details.map((item) => [item, item.open]));
  if (!query && savedDetails) {
    for (const [item, open] of savedDetails) item.open = open;
    savedDetails = null;
  }

  function apply(item, parentMatches = false) {
    const ownMatch = Boolean(query) && item.dataset.search.toLocaleLowerCase().includes(query);
    const childList = item.querySelector(':scope > details > .nav-list');
    const children = childList ? [...childList.children] : [];
    const childMatches = children.map((child) => apply(child, parentMatches || ownMatch));
    const visible = !query || parentMatches || ownMatch || childMatches.some(Boolean);
    item.hidden = !visible;
    const group = item.querySelector(':scope > details');
    if (query && group && visible) group.open = true;
    return visible;
  }
  const roots = navigation.querySelectorAll(':scope > .nav-list > [data-nav-item]');
  const matches = [...roots].map((root) => apply(root));
  const home = navigation.querySelector('.home-link');
  const homeMatches = !query || '文档首页'.includes(query);
  home.hidden = !homeMatches;
  noResults.hidden = !query || homeMatches || matches.some(Boolean);
}
search.addEventListener('input', filterNavigation);
