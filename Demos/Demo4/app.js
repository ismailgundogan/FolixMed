const formulas = [
  {
    id: 'shampoo', name: ['Shampoo', 'Şampuan'], category: ['Daily cleanse', 'Günlük temizlik'],
    summary: ['Gentle cleansing for hair and scalp.', 'Saç ve saç derisi için nazik temizlik.'],
    description: ['The cleansing step in the FolixMed collection. A daily shampoo formulated with biotin, peptide complex and niacinamide.', 'FolixMed koleksiyonunun temizlik adımı. Biyotin, peptit kompleksi ve niasinamid içeren günlük bakım şampuanı.'],
    ingredients: ['Biotin · Peptide complex · Niacinamide', 'Biyotin · Peptit kompleksi · Niasinamid']
  },
  {
    id: 'foam', name: ['Foam', 'Köpük'], category: ['Lightweight care', 'Hafif bakım'],
    summary: ['A light foam for targeted scalp care.', 'Saç derisine yönelik hafif köpük bakım.'],
    description: ['A lightweight foam for focused scalp care. Peptide complex, biotin and panthenol come together in an airy texture.', 'Saç derisine yönelik hafif bir bakım köpüğü. Peptit kompleksi, biyotin ve pantenol ince bir köpük dokusunda bir araya gelir.'],
    ingredients: ['Peptide complex · Biotin · Panthenol', 'Peptit kompleksi · Biyotin · Pantenol']
  },
  {
    id: 'serum', name: ['Serum', 'Serum'], category: ['Concentrated care', 'Yoğun bakım'],
    summary: ['Concentrated care with a precision applicator.', 'Hedefli uygulama için yoğun saç derisi bakımı.'],
    description: ['A concentrated scalp serum with a directional applicator for targeted application. The formula combines biotin, peptides, niacinamide and panthenol.', 'Yönlendirilebilir uygulama ucuyla saç derisine odaklanan yoğun bakım serumu. Formülünde biyotin, peptitler, niasinamid ve pantenol bir araya gelir.'],
    ingredients: ['Biotin · Peptides · Niacinamide · Panthenol', 'Biyotin · Peptitler · Niasinamid · Pantenol']
  }
];
const panel = document.querySelector('#panel');
const content = document.querySelector('#content');
const cards = document.querySelector('#cards');
const labels = [...document.querySelectorAll('[data-tr]')].map(el => [el, el.textContent, el.dataset.tr]);
let lang = 'en';
try { if (localStorage.getItem('folixmed-demo4-lang') === 'tr') lang = 'tr'; } catch {}
const t = (en, tr) => lang === 'en' ? en : tr;

const productUrl = product => `product-details.html?product=${product.id}`;
const requestedId = new URLSearchParams(location.search).get('product');
const selectedProduct = document.querySelector('.product-profile')
  ? formulas.find(product => product.id === requestedId) || formulas[0]
  : null;

function renderProduct(product) {
  const name = t(...product.name);
  document.title = `FolixMed | ${name}`;
  document.querySelector('#current-name').textContent = name;
  document.querySelector('#product-title').textContent = `FolixMed ${name}`;
  const image = document.querySelector('#product-image');
  image.src = `assets/${product.id}.webp`;
  image.alt = `FolixMed ${name}`;
  document.querySelector('#product-category').textContent = t(...product.category);
  document.querySelector('#product-description').textContent = t(...product.description);
  document.querySelector('#product-ingredients').innerHTML = t(...product.ingredients)
    .split(' · ').map(ingredient => `<li>${ingredient}</li>`).join('');
}

function render() {
  if (selectedProduct) renderProduct(selectedProduct);
  document.documentElement.lang = lang;
  labels.forEach(([el, en, tr]) => { el.textContent = t(en, tr); });
  document.querySelectorAll('.langs button').forEach(button => button.setAttribute('aria-pressed', button.value === lang));
  cards.innerHTML = formulas.map(p => `<a class="card" href="${productUrl(p)}">
    <div class="pack"><img src="assets/${p.id}.webp" alt=""></div>
    <div class="info"><span class="tag">${t(...p.category)}</span><h3>${t(...p.name)}</h3>
    <p class="desc">${t(...p.summary)}</p><span class="detail">${t('View formula', 'Formülü incele')} <b aria-hidden="true">↗</b></span></div></a>`).join('');
  document.querySelector('.shop-items').innerHTML = formulas.map(p => `<a href="${productUrl(p)}">
    <img src="assets/${p.id}.webp" alt=""><strong>FolixMed ${t(...p.name)}</strong>
    <span>${t(...p.category)}</span></a>`).join('');
  updateThemeButton();
  showRoute();
}
const pages = {
  about: [['About FolixMed', 'FolixMed hakkında'], ['FolixMed develops clinically inspired hair and scalp care. The collection brings together a cleansing shampoo, a lightweight foam and a concentrated serum, each with a distinct place in scalp care.', 'FolixMed, klinik yaklaşımdan ilham alan saç ve saç derisi bakım ürünleri geliştirir. Koleksiyon, saç derisi bakımında farklı ihtiyaçlara yönelik bir şampuan, hafif dokulu köpük ve yoğun bakım serumunu bir araya getirir.']],
  contact: [['Contact', 'İletişim'], ['Official contact details will be added when the store launches.', 'Mağaza açıldığında markanın resmî iletişim bilgileri burada yer alacak.']]
};
for (const number of [1, 2]) {
  pages['contact-' + number] = [[`Contact ${number}`, `İletişim ${number}`], pages.contact[1]];
}
function showRoute() {
  const route = location.hash.slice(1);
  const product = formulas.find(p => p.id === route);
  const page = Object.hasOwn(pages, route) && pages[route];
  if (product) {
    location.replace(productUrl(product));
    return;
  }
  if (!page) {
    if (panel.open) panel.close();
    return;
  }
  content.innerHTML = `<span class="tag">FolixMed</span><h2 id="dialog-title">${t(...page[0])}</h2><p>${t(...page[1])}</p>`;
  panel.setAttribute('aria-labelledby', 'dialog-title');
  if (!panel.open) panel.showModal();
}
function dismiss() {
  history.replaceState(null, '', location.pathname + location.search);
  panel.close();
}
document.querySelector('.close').addEventListener('click', dismiss);
panel.addEventListener('cancel', e => { e.preventDefault(); dismiss(); });
panel.addEventListener('click', e => {
  const r = panel.getBoundingClientRect();
  if (e.target === panel && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dismiss();
});
document.querySelectorAll('.langs button').forEach(button => button.addEventListener('click', () => {
  lang = button.value;
  try { localStorage.setItem('folixmed-demo4-lang', lang); } catch {}
  render();
}));
const themeButton = document.querySelector('.theme-toggle');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.title = t('Dark mode', 'Koyu tema');
  themeButton.setAttribute('aria-label', themeButton.title);
  themeButton.firstElementChild.textContent = dark ? '☀' : '☾';
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('folixmed-demo4-theme', theme); } catch {}
  updateThemeButton();
});

const nav = document.querySelector('.mast nav');
const triggers = [...nav.querySelectorAll('.nav-trigger')];
function openMenu(selected) {
  for (const trigger of triggers) {
    const expanded = trigger === selected;
    trigger.setAttribute('aria-expanded', String(expanded));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !expanded;
  }
}
for (const trigger of triggers) {
  const group = trigger.parentElement;
  group.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') openMenu(trigger);
  });
  group.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && !group.matches(':focus-within')) openMenu(null);
  });
  trigger.addEventListener('click', event => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    openMenu(expanded && event.pointerType !== 'mouse' ? null : trigger);
  });
}
document.addEventListener('pointerdown', event => {
  if (!nav.contains(event.target)) openMenu(null);
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.nav-group')) openMenu(null);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) openMenu(null);
});
document.addEventListener('keydown', event => {
  const trigger = triggers.find(item => item.getAttribute('aria-expanded') === 'true');
  if (trigger && event.key === 'Escape') {
    openMenu(null);
    trigger.focus();
  }
});
window.addEventListener('hashchange', showRoute);
render();

const preloader = document.querySelector('.preloader');
// Give the logo one full rotation even on cached or local page loads.
const pageLoaded = new Promise(resolve => {
  if (document.readyState === 'complete') resolve();
  else window.addEventListener('load', resolve, { once: true });
});
const logoDisplayed = new Promise(resolve => {
  requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 1500)));
});
Promise.all([pageLoaded, logoDisplayed]).then(() => preloader.classList.add('is-loaded'));

const compactHero = window.matchMedia('(max-width: 900px)');
const formulaNotes = document.querySelector('.formula-notes');
function setFormulaLayout() { formulaNotes.open = !compactHero.matches; }
if (formulaNotes) {
  setFormulaLayout();
  compactHero.addEventListener('change', setFormulaLayout);
}
