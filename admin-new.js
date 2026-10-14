// GiftMaster Admin Panel — admin-new.js
// Handles: login gate, navigation, CRUD gifts, export/import/reset

const INITIAL_DB = {
  him: [
    { name: "Шкіряний портмоне / гаманець", desc: "Преміальна натуральна шкіра ручної роботи", icon: "👛", baseWeight: 40 },
    { name: "Бездротові навушники TWS", desc: "Чітке звучання та шумозаглушення", icon: "🎧", baseWeight: 45 },
    { name: "Термокухоль з подвійними стінками", desc: "Зберігає тепло до 12 годин", icon: "☕", baseWeight: 20 },
    { name: "Крафтовий набір горіхів та сухофруктів", desc: "Добірний асорті-мікс в дерев'яному боксі", icon: "🥜", baseWeight: 15 },
    { name: "Подарунковий набір для догляду за бородою", desc: "Олія, бальзам та дерев'яний гребінець", icon: "🪮", baseWeight: 25 },
    { name: "Багатофункціональний мультитул", desc: "Нержавіюча сталь, 14 інструментів в одному", icon: "🛠️", baseWeight: 30 },
    { name: "Елітна парфумована вода (міні-формат)", desc: "Деревно-пряний насичений аромат", icon: "🧪", baseWeight: 35 },
    { name: "Шоколад з перцем чилі та сіллю", desc: "Крафтовий темний бельгійський шоколад", icon: "🍫", baseWeight: 10 }
  ],
  her: [
    { name: "Ароматична свічка зі соєвого воску", desc: "Аромат ванілі, лаванди та пачулі", icon: "🕯️", baseWeight: 18 },
    { name: "Шовкова маска для сну та пов'язка", desc: "100% натуральний шовк mulberry", icon: "🎀", baseWeight: 22 },
    { name: "Набір органічної доглядової косметики", desc: "Скраб, зволожуючий крем та бальзам", icon: "🧴", baseWeight: 35 },
    { name: "Бездротова колонка в стилі ретро", desc: "Компактна з глибоким басом", icon: "📻", baseWeight: 40 },
    { name: "Колекційний трав'яний чай з бутонами квітів", desc: "Авторський купаж у скляній баночці", icon: "🫖", baseWeight: 15 },
    { name: "Елегантна скринька для прикрас", desc: "Оксамитове оздоблення з дзеркальцем", icon: "💎", baseWeight: 30 },
    { name: "Солодощі Макарон ручної роботи", desc: "Набір з 8 ніжних французьких тістечок", icon: "🧁", baseWeight: 18 },
    { name: "Плед крупної в'язки", desc: "Надзвичайно м'який та затишний", icon: "🧶", baseWeight: 35 }
  ],
  child: [
    { name: "Інтерактивний конструктор", desc: "Розвиваючий набір для творчості", icon: "🧩", baseWeight: 35 },
    { name: "М'яка іграшка-обіймашка", desc: "Гіпоалергенна та надзвичайно приємна", icon: "🧸", baseWeight: 25 },
    { name: "Набір кольорових маркерів та арт-бук", desc: "50 яскравіших кольорів для малювання", icon: "🎨", baseWeight: 20 },
    { name: "Нічник-проектор зоряного неба", desc: "М'яке світло та 8 режимів світіння", icon: "🌌", baseWeight: 30 },
    { name: "Набір дитячих крафтових солодощів", desc: "Без цукру та штучних барвників", icon: "🍭", baseWeight: 15 },
    { name: "Настільна гра для всієї родини", desc: "Захоплюючі пригоди та веселощі", icon: "🎲", baseWeight: 30 }
  ],
  colleague: [
    { name: "Стильний щоденник у твердій обкладинці", desc: "Датований планер з якісним папером", icon: "📓", baseWeight: 20 },
    { name: "Металева ручка Parker у футлярі", desc: "Класичний синій чорнильний стрижень", icon: "🖊️", baseWeight: 25 },
    { name: "Настільний зволожувач повітря з підсвіткою", desc: "Безшумний ультразвуковий спрей", icon: "💧", baseWeight: 28 },
    { name: "Спеціальна зернова кава Premium Arabica", desc: "Свіже обсмаження, нотки шоколаду", icon: "☕", baseWeight: 22 },
    { name: "Бездротова зарядка-підставка 3-в-1", desc: "Для смартфона, годинника та навушників", icon: "⚡", baseWeight: 45 },
    { name: "Стильний термопрес для напоїв", desc: "Компактна фляга-кухоль 500 мл", icon: "🥤", baseWeight: 25 }
  ],
  parents: [
    { name: "Набір елітних сортів меду з горішками", desc: "4 баночки акацієвого та гречаного меду", icon: "🍯", baseWeight: 22 },
    { name: "Затишний махровий парний комплект рушників", desc: "100% бавовна високої щільності", icon: "🧺", baseWeight: 30 },
    { name: "Електрочайник з терморегулятором", desc: "Скляний корпус із м'яким підсвічуванням", icon: "🫖", baseWeight: 40 },
    { name: "Набір затишних фарфорових чашок", desc: "Авторський розпис та позолота", icon: "☕", baseWeight: 25 },
    { name: "Масажер для шиї та плечей з прогрівом", desc: "Знімає втому та розслабляє м'язи", icon: "💆", baseWeight: 50 },
    { name: "Подарунковий кошик екзотичних фруктів", desc: "Свіжий манго, ананас, драгонфрут", icon: "🧺", baseWeight: 35 }
  ],
  friend: [
    { name: "Настільна гра для вечірок", desc: "Гарантія сміху та крутого вечора", icon: "🃏", baseWeight: 25 },
    { name: "Портативна bluetooth колонка", desc: "Захист від води IPX7 та потужний звук", icon: "🔊", baseWeight: 40 },
    { name: "Набір для вирощування еко-рослини", desc: "Горщик, ґрунт та насіння м'яти чи базиліку", icon: "🌱", baseWeight: 15 },
    { name: "Смішні брендові шкарпетки в баночці", desc: "3 пари з яскравими принтами", icon: "🧦", baseWeight: 12 },
    { name: "Набір маршмеллоу та гарячого шоколаду", desc: "Для затишних кіновечорів", icon: "☕", baseWeight: 15 },
    { name: "Постер зі 100 справами Scratch Off", desc: "Містить цікаві челенджі та ідеї", icon: "🗺️", baseWeight: 20 }
  ]
};

const CAT_LABELS = {
  him: '👨 Для нього', her: '👩 Для неї', child: '👶 Для дитини',
  colleague: '💼 Колезі / Босу', parents: '🏡 Батькам',
  friend: '👥 Другу / Подрузі', teacher: '🎓 Учителю',
  grandparents: '👵👴 Дідусеві та бабусі', pet: '🐾 Улюбленцю'
};

const STORAGE_KEY = 'giftmaster_admin_gifts';
const SESSION_KEY = 'giftmaster_admin_session';
const ADMIN_PWD   = '1234';

let db = loadDb(), editRef = null, changes = 0;
const $ = id => document.getElementById(id);

function loadDb() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object' && !Array.isArray(saved))
      return { ...structuredClone(INITIAL_DB), ...saved };
  } catch(_) {}
  return structuredClone(INITIAL_DB);
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  changes++;
  renderStats();
  showToast('✅ Зміни збережено');
}

function allGifts() {
  return Object.entries(db).flatMap(([cat, items]) =>
    (items || []).map((item, index) => ({ ...item, cat, index }))
  );
}

// === LOGIN ===
const loginOverlay = $('loginOverlay');
const loginForm    = $('loginForm');
const loginErr     = $('loginErr');
const adminPwd     = $('adminPwd');
const adminPanel   = $('adminPanel');
const adminFB      = $('adminFloatBtn');

function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === 'yes'; }

adminFB.addEventListener('click', () => {
  if (isLoggedIn()) openAdminPanel();
  else { loginOverlay.classList.add('open'); setTimeout(() => adminPwd.focus(), 280); }
});

$('loginClose').addEventListener('click', closeLogin);
loginOverlay.addEventListener('click', e => { if (e.target === loginOverlay) closeLogin(); });

function closeLogin() {
  loginOverlay.classList.remove('open');
  loginForm.reset();
  loginErr.classList.remove('visible');
  adminPwd.classList.remove('err');
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  if (adminPwd.value === ADMIN_PWD) {
    sessionStorage.setItem(SESSION_KEY, 'yes');
    closeLogin();
    openAdminPanel();
  } else {
    loginErr.classList.add('visible');
    adminPwd.classList.add('err');
    adminPwd.style.animation = 'none';
    void adminPwd.offsetWidth;
    adminPwd.style.animation = 'shake .35s ease';
    adminPwd.value = '';
    adminPwd.focus();
  }
});

adminPwd.addEventListener('input', () => { loginErr.classList.remove('visible'); adminPwd.classList.remove('err'); });

function openAdminPanel() {
  adminPanel.classList.add('open');
  document.body.style.overflow = 'hidden';
  adminRender();
}

$('admClose').addEventListener('click', closeAdminPanel);
$('admLogout').addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  closeAdminPanel();
  showToast('👋 Ви вийшли з панелі адміна');
});

function closeAdminPanel() {
  adminPanel.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if ($('gmOverlay').classList.contains('open')) closeGmModal();
  else if (adminPanel.classList.contains('open')) closeAdminPanel();
  else if (loginOverlay.classList.contains('open')) closeLogin();
});

// === NAVIGATION ===
function switchView(view) {
  document.querySelectorAll('.adm-view').forEach(v => v.classList.remove('active'));
  const vId = 'aView' + view.charAt(0).toUpperCase() + view.slice(1);
  $(vId).classList.add('active');
  document.querySelectorAll('.adm-nav button').forEach(b => b.classList.toggle('active', b.dataset.aview === view));
  if (view === 'gifts') renderRows();
}

document.querySelectorAll('.adm-nav button').forEach(b => b.addEventListener('click', () => switchView(b.dataset.aview)));
document.querySelectorAll('[data-agoto]').forEach(b => b.addEventListener('click', () => switchView(b.dataset.agoto)));

// === STATS ===
function renderStats() {
  const items = allGifts();
  $('aStatGifts').textContent   = items.length;
  $('aStatCats').textContent    = Object.values(db).filter(a => a?.length).length;
  $('aStatChanges').textContent = changes;
  $('aNavCount').textContent    = items.length;
}

// === CATEGORY OPTIONS ===
function initCatFilter() {
  const sel = $('aCatFilter');
  while (sel.options.length > 1) sel.remove(1);
  Object.entries(CAT_LABELS).forEach(([k, v]) => sel.appendChild(new Option(v, k)));
  $('gmCategory').innerHTML = Object.entries(CAT_LABELS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
}

// === TABLE ===
function esc(v = '') {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderRows() {
  const q   = $('aSearch').value.trim().toLowerCase();
  const cat = $('aCatFilter').value;
  const rows = allGifts().filter(g =>
    (cat === 'all' || g.cat === cat) &&
    (`${g.name} ${g.desc}`).toLowerCase().includes(q)
  );
  $('aTableSub').textContent     = `Всього ${allGifts().length} подарунків у базі`;
  $('aVisibleCount').textContent = `${rows.length} шт`;
  $('aGiftRows').innerHTML = rows.map(g => `
    <tr>
      <td><div class="gift-cell"><span class="gift-emoji">${esc(g.icon||'🎁')}</span><div><b>${esc(g.name)}</b><small>${esc(g.desc)}</small></div></div></td>
      <td><span class="cbadge">${esc(CAT_LABELS[g.cat]||g.cat)}</span></td>
      <td><div class="wbar"><div class="wbar-t"><div class="wbar-f" style="width:${Math.min(100,Number(g.baseWeight)||1)}%"></div></div><span style="font-size:.78rem;color:#94a3b8;">${Number(g.baseWeight)||1}</span></div></td>
      <td><div class="row-acts"><button class="ibtn" title="Редагувати" data-edit="${g.cat}:${g.index}">✏️</button><button class="ibtn del" title="Видалити" data-del="${g.cat}:${g.index}">🗑️</button></div></td>
    </tr>`).join('');
  $('aEmptyTbl').classList.toggle('hidden', rows.length > 0);
  document.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openEdit(b.dataset.edit)));
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => deleteGift(b.dataset.del)));
}

// === GIFT MODAL ===
const gmOverlay = $('gmOverlay');
function openGmModal() { gmOverlay.classList.add('open'); }
function closeGmModal() { gmOverlay.classList.remove('open'); }

$('aAddGiftBtn').addEventListener('click', () => {
  editRef = null;
  $('gmForm').reset();
  $('gmIcon').value = '🎁'; $('gmWeight').value = 25;
  $('gmTitle').textContent = 'Новий подарунок';
  openGmModal();
  setTimeout(() => $('gmName').focus(), 200);
});

function openEdit(ref) {
  const [cat, idx] = ref.split(':');
  const item = db[cat]?.[Number(idx)];
  if (!item) return;
  editRef = { cat, index: Number(idx) };
  $('gmName').value = item.name; $('gmDesc').value = item.desc;
  $('gmCategory').value = cat; $('gmWeight').value = item.baseWeight;
  $('gmIcon').value = item.icon;
  $('gmTitle').textContent = 'Редагувати подарунок';
  openGmModal();
}

$('gmClose').addEventListener('click', closeGmModal);
$('gmCancel').addEventListener('click', closeGmModal);
gmOverlay.addEventListener('click', e => { if (e.target === gmOverlay) closeGmModal(); });

$('gmForm').addEventListener('submit', e => {
  e.preventDefault();
  const cat = $('gmCategory').value;
  const item = {
    name: $('gmName').value.trim(), desc: $('gmDesc').value.trim(),
    icon: $('gmIcon').value.trim() || '🎁', baseWeight: Number($('gmWeight').value)
  };
  if (!item.name || !item.desc || !Number.isFinite(item.baseWeight) || item.baseWeight < 1 || item.baseWeight > 100) return;
  if (editRef) {
    db[editRef.cat].splice(editRef.index, 1);
    if (!db[editRef.cat]?.length) delete db[editRef.cat];
  }
  if (!db[cat]) db[cat] = [];
  db[cat].push(item);
  persist(); closeGmModal(); renderRows(); switchView('gifts');
});

// === DELETE ===
function deleteGift(ref) {
  const [cat, idx] = ref.split(':');
  const item = db[cat]?.[Number(idx)];
  if (!item || !confirm(`Видалити «${item.name}»?`)) return;
  db[cat].splice(Number(idx), 1);
  if (!db[cat]?.length) delete db[cat];
  persist(); renderRows();
}

// === SEARCH/FILTER ===
$('aSearch').addEventListener('input', renderRows);
$('aCatFilter').addEventListener('change', renderRows);

// === EXPORT / IMPORT / RESET ===
$('aExportBtn').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' }));
  Object.assign(document.createElement('a'), { href: url, download: 'giftmaster-backup.json' }).click();
  URL.revokeObjectURL(url);
  showToast('📤 Базу експортовано');
});

$('aImportFile').addEventListener('change', async e => {
  const file = e.target.files[0]; if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) ||
        !Object.values(parsed).every(v => Array.isArray(v) && v.every(x => x && typeof x.name === 'string' && typeof x.desc === 'string' && Number.isFinite(Number(x.baseWeight)))))
      throw new Error('format');
    db = parsed; persist(); adminRender(); showToast('📥 Базу імпортовано');
  } catch (_) { alert('Невалідний файл. Перевірте формат JSON.'); }
  e.target.value = '';
});

$('aResetBtn').addEventListener('click', () => {
  if (!confirm('Відновити початкові подарунки? Всі ваші зміни будуть втрачені.')) return;
  db = structuredClone(INITIAL_DB);
  localStorage.removeItem(STORAGE_KEY);
  changes = 0; adminRender(); showToast('🔄 Базу скинуто до початкових значень');
});

// === TOAST ===
let _tt;
function showToast(msg) {
  const t = $('admToast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(_tt); _tt = setTimeout(() => t.classList.remove('show'), 2800);
}
window.showAdminToast = showToast;

// === MAIN RENDER ===
function adminRender() { initCatFilter(); renderStats(); }
adminRender();
