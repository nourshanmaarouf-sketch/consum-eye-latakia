'use strict';
/* ==========================================================
   عين المستهلك – اللاذقية
   الطبقة 1: أدوات عامة
   ========================================================== */
const $ = id => document.getElementById(id);
const DAY = 864e5;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => Math.round(n).toLocaleString('en-US');
const dt = t => { const d = new Date(t); return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(); };
const ago = t => {
  const m = Math.floor((Date.now() - t) / 6e4);
  if (m < 1) return 'الآن';
  if (m < 60) return 'منذ ' + m + ' دقيقة';
  const h = Math.floor(m / 60);
  if (h < 24) return 'منذ ' + h + ' ساعة';
  return 'منذ ' + Math.floor(h / 24) + ' يوم';
};
const toEn = s => String(s == null ? '' : s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٬,\s]/g, m => (m === ' ' ? ' ' : ''));
const num = v => { const n = Number(toEn(v).replace(/\s/g, '')); return isFinite(n) && String(v).trim() !== '' ? n : NaN; };
const rnd = () => { try { const a = new Uint32Array(4); crypto.getRandomValues(a); return Array.from(a).map(x => x.toString(36)).join(''); } catch (e) { return Math.random().toString(36).slice(2) + Date.now().toString(36); } };

/* SHA-256 (لتجزئة كلمات المرور بدل تخزينها كنص) */
const sha256 = (() => {
  const K = [], H0 = [];
  let p = 0;
  for (let n = 2; p < 64; n++) {
    let ok = 1;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) { ok = 0; break; }
    if (ok) { if (p < 8) H0[p] = (Math.pow(n, .5) % 1) * 4294967296 | 0; K[p++] = (Math.pow(n, 1 / 3) % 1) * 4294967296 | 0; }
  }
  const rr = (x, n) => (x >>> n) | (x << (32 - n));
  return s => {
    const b = unescape(encodeURIComponent(s)), l = b.length, len = (((l + 8) >> 6) + 1) * 16, w = new Array(len).fill(0);
    for (let i = 0; i < l; i++) w[i >> 2] |= b.charCodeAt(i) << (24 - (i % 4) * 8);
    w[l >> 2] |= 0x80 << (24 - (l % 4) * 8);
    w[len - 1] = l * 8;
    let H = H0.slice();
    for (let j = 0; j < len; j += 16) {
      const W = w.slice(j, j + 16);
      for (let i = 16; i < 64; i++) {
        const a = W[i - 15], c = W[i - 2];
        W[i] = (W[i - 16] + (rr(a, 7) ^ rr(a, 18) ^ (a >>> 3)) + W[i - 7] + (rr(c, 17) ^ rr(c, 19) ^ (c >>> 10))) | 0;
      }
      let [a, b2, c, d, e, f, g, h] = H;
      for (let i = 0; i < 64; i++) {
        const t1 = (h + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + W[i]) | 0;
        const t2 = ((rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & b2) ^ (a & c) ^ (b2 & c))) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b2; b2 = a; a = (t1 + t2) | 0;
      }
      H = [H[0] + a, H[1] + b2, H[2] + c, H[3] + d, H[4] + e, H[5] + f, H[6] + g, H[7] + h].map(x => x | 0);
    }
    return H.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
  };
})();

const P = {
  home: 'M3 11l9-8 9 8v10h-6v-6H9v6H3z', bag: 'M6 8h12l1 13H5zM9 8a3 3 0 016 0', store: 'M3 9l1-5h16l1 5M4 9v11h16V9M9 20v-6h6v6',
  shield: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zM8.5 12l2.5 2.5 4.5-5', user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2', search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  check: 'M5 12l5 5 9-10', info: 'M12 8v.01M11 12h1v5h1M12 3a9 9 0 100 18 9 9 0 000-18z', cam: 'M4 8h4l2-3h4l2 3h4v12H4zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z',
  plus: 'M12 5v14M5 12h14', lock: 'M6 11h12v10H6zM8 11V7a4 4 0 018 0v4', list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5', tag: 'M3 12V4h8l10 10-8 8zM7.5 7.5h.01', menu: 'M4 7h16M4 12h16M4 17h16', back: 'M9 6l6 6-6 6'
};
const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n]}"/></svg>`;

function toast(m, t) {
  let e = $('toast');
  if (!e) { e = document.createElement('div'); e.id = 'toast'; document.body.appendChild(e); }
  e.className = 'toast ' + (t || '');
  e.textContent = m;
  e.classList.add('show');
  clearTimeout(window._tt);
  window._tt = setTimeout(() => e.classList.remove('show'), 3400);
}
/* نافذة تأكيد / إدخال نص أو رقم */
function ask(msg, cb, o) {
  o = o || {};
  const md = $('md'), i = $('mdi');
  $('mdt').textContent = msg;
  i.classList.toggle('hide', !o.input);
  i.value = o.v != null ? String(o.v) : '';
  i.inputMode = o.num ? 'numeric' : 'text';
  i.placeholder = o.ph || '';
  md.classList.remove('hide');
  if (o.input) setTimeout(() => i.focus(), 60);
  $('mdn').onclick = () => md.classList.add('hide');
  $('mdy').onclick = () => {
    const v = i.value;
    if (o.input && o.req && !v.trim()) { toast('هذا الحقل مطلوب', 'e'); return; }
    md.classList.add('hide');
    cb(v);
  };
}

/* ==========================================================
   الطبقة 2: التخزين (حالياً على الجهاز، يُستبدل بالسيرفر لاحقاً)
   ========================================================== */
const KEY = 'ain_v4', SK = 'ain_sess_v4';
try { ['ain_db3', 'ain_sess'].forEach(k => localStorage.removeItem(k)); } catch (e) { }   // حذف بيانات النسخة القديمة (فيها حسابات تجريبية)
const blank = () => ({ users: [], items: [], prices: [], reqs: [], quotes: [], comps: [], audit: [], fails: {}, n: 0 });
let DB = (() => {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && Array.isArray(d.users)) return Object.assign(blank(), d); } catch (e) { }
  return blank();
})();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { toast('تعذّر الحفظ: مساحة التخزين ممتلئة', 'e'); } };
const uid = p => p + (++DB.n).toString(36) + rnd().slice(0, 4);
let ME = null;

/* ==========================================================
   الطبقة 3: الاستعلامات (قراءة فقط)
   ========================================================== */
const reqState = r => (r.status === 'open' && Date.now() - r.t > 2 * DAY) ? 'expired' : r.status;
const Q = {
  user: id => DB.users.find(u => u.id === id),
  item: id => DB.items.find(i => i.id === id),
  items: () => DB.items.filter(i => i.status === 'active'),
  merchants: role => DB.users.filter(u => (u.role === 'retail' || u.role === 'wholesale') && (!role || u.role === role)),
  active: role => Q.merchants(role).filter(u => u.status === 'active'),
  /* آخر سعر لكل تاجر معتمد لمادة معيّنة حتى لحظة t */
  latest(item, role, t = Date.now()) {
    const U = new Map(DB.users.map(u => [u.id, u])), m = {};
    for (const p of DB.prices) {
      if (p.item !== item || p.t > t) continue;
      const u = U.get(p.mid);
      if (!u || u.role !== role || u.status !== 'active') continue;
      if (!m[p.mid] || p.t >= m[p.mid].t) m[p.mid] = p;
    }
    return Object.values(m).filter(p => !p.off);
  },
  stat(item, role, t) {
    const L = Q.latest(item, role, t);
    if (!L.length) return null;
    return { min: Math.min(...L.map(x => x.min)), max: Math.max(...L.map(x => x.max)), avg: L.reduce((a, x) => a + (x.min + x.max) / 2, 0) / L.length, n: L.length, L };
  },
  mine(mid) {
    const m = {};
    for (const p of DB.prices) if (p.mid === mid && (!m[p.item] || p.t >= m[p.item].t)) m[p.item] = p;
    return Object.values(m).filter(p => !p.off).sort((a, b) => b.t - a.t);
  },
  lastUpdate(u) {
    let t = u.apt || u.t;
    for (const p of DB.prices) if (p.mid === u.id && p.t > t) t = p.t;
    return t;
  },
  late: () => Q.active().filter(u => Date.now() - Q.lastUpdate(u) > 7 * DAY).sort((a, b) => Q.lastUpdate(a) - Q.lastUpdate(b)),
  quotesOf: rid => DB.quotes.filter(q => q.req === rid && q.status !== 'withdrawn')
};

/* ==========================================================
   الطبقة 4: العمليات (كتابة + التحقق + الصلاحيات)
   كل دالة هنا تقابل نقطة API على السيرفر لاحقاً
   ========================================================== */
const need = (...r) => { if (!ME || !r.includes(ME.role)) throw new Error('غير مصرّح لك بهذا الإجراء'); };
const needStaff = () => need('admin', 'inspector');
const log = (act, det, who) => {
  const w = who || ME;
  DB.audit.push({ t: Date.now(), u: w ? w.id : null, n: w ? (w.biz ? w.biz.name : w.name) : '-', act, det: det || '' });
  if (DB.audit.length > 500) DB.audit.shift();
};
async function mkUser(d) {
  const name = String(d.name || '').trim(), phone = toEn(d.phone || '').trim();
  if (name.length < 3) throw new Error('أدخل الاسم الكامل');
  if (!/^09\d{8}$/.test(phone)) throw new Error('رقم الهاتف غير صحيح (مثال: 09XXXXXXXX)');
  if (String(d.pw || '').length < 6) throw new Error('كلمة المرور 6 أحرف على الأقل');
  if (DB.users.some(u => u.phone === phone)) throw new Error('رقم الهاتف مسجّل مسبقاً');
  const salt = rnd();
  const u = { id: uid('u'), role: d.role, name: name.slice(0, 60), phone, salt, hash: sha256(salt + ':' + d.pw), status: d.status, t: Date.now() };
  if (d.biz) u.biz = d.biz;
  if (d.area) u.area = d.area;
  DB.users.push(u);
  return u;
}
const API = {
  needSetup: () => !DB.users.some(u => u.role === 'admin'),
  async setupAdmin(d) {
    if (!API.needSetup()) throw new Error('النظام مهيّأ مسبقاً');
    const u = await mkUser({ ...d, role: 'admin', status: 'active' });
    log('تهيئة النظام وإنشاء حساب المدير', u.name, u); save(); return u;
  },
  async register(d) {
    if (!['citizen', 'retail', 'wholesale'].includes(d.type)) throw new Error('نوع الحساب غير صحيح');
    const merch = d.type !== 'citizen';
    let biz = null, area = null;
    if (merch) {
      const b = String(d.bn || '').trim(), r = String(d.reg || '').trim(), a = String(d.addr || '').trim();
      if (b.length < 2) throw new Error('أدخل اسم المحل / الشركة');
      if (a.length < 3) throw new Error('أدخل عنوان المحل / الشركة');
      biz = { name: b.slice(0, 60), reg: r.slice(0, 30), addr: a.slice(0, 120) };
      if (d.loc && isFinite(d.loc.lat) && isFinite(d.loc.lng)) biz.loc = { lat: +d.loc.lat, lng: +d.loc.lng };
    } else {
      area = String(d.area || '').trim().slice(0, 60);
      if (area.length < 2) throw new Error('أدخل الحي / المنطقة');
    }
    const u = await mkUser({ name: d.name, phone: d.phone, pw: d.pw, role: d.type, status: merch ? 'pending' : 'active', biz, area });
    log('تسجيل حساب جديد', u.role, u); save(); return u;
  },
  async login(phone, pw) {
    phone = toEn(phone).trim();
    const f = DB.fails[phone] || { n: 0, until: 0 };
    if (Date.now() < f.until) throw new Error('تم تعليق المحاولات مؤقتاً. حاول بعد ' + Math.ceil((f.until - Date.now()) / 6e4) + ' دقيقة');
    const u = DB.users.find(x => x.phone === phone);
    if (!u || sha256(u.salt + ':' + pw) !== u.hash) {
      f.n++; if (f.n >= 5) { f.until = Date.now() + 5 * 6e4; f.n = 0; }
      DB.fails[phone] = f; save();
      throw new Error('رقم الهاتف أو كلمة المرور غير صحيحة');
    }
    delete DB.fails[phone];
    if (u.status === 'pending') throw new Error('حسابك قيد المراجعة من الرقابة التموينية. سيتم تفعيله بعد الموافقة.');
    if (u.status === 'rejected') throw new Error('تم رفض طلب الحساب' + (u.reason ? ': ' + u.reason : ''));
    if (u.status === 'suspended') throw new Error('الحساب موقوف. راجع الرقابة التموينية.');
    ME = u; try { localStorage.setItem(SK, u.id); } catch (e) { }
    log('تسجيل دخول'); save(); return u;
  },
  logout() { ME = null; try { localStorage.removeItem(SK); } catch (e) { } },
  async changePw(o, n) {
    if (!ME) throw new Error('سجّل الدخول أولاً');
    if (sha256(ME.salt + ':' + o) !== ME.hash) throw new Error('كلمة المرور الحالية غير صحيحة');
    if (String(n).length < 6) throw new Error('كلمة المرور الجديدة 6 أحرف على الأقل');
    ME.salt = rnd(); ME.hash = sha256(ME.salt + ':' + n); log('تغيير كلمة المرور'); save();
  },

  /* ---- المواد ---- */
  async addItem(d) {
    need('admin');
    const name = String(d.name || '').trim(), bc = String(d.bc || '').trim();
    if (!name) throw new Error('أدخل اسم المادة');
    if (bc && DB.items.some(i => i.bc === bc)) throw new Error('هذا الباركود مسجّل لمادة أخرى');
    DB.items.push({ id: uid('i'), name: name.slice(0, 60), cat: String(d.cat || '').trim().slice(0, 40) || name, typ: String(d.typ || '').trim().slice(0, 40) || '-', unit: d.unit || '1 كغ', bc, status: 'active', by: ME.id, t: Date.now() });
    log('إضافة مادة', name); save();
  },
  async requestItem(d) {
    need('retail', 'wholesale');
    if (ME.status !== 'active') throw new Error('حسابك غير مفعّل');
    const name = String(d.name || '').trim(), bc = String(d.bc || '').trim();
    if (!name) throw new Error('أدخل اسم المادة');
    if (!String(d.cat || '').trim()) throw new Error('أدخل الصنف');
    if (!String(d.typ || '').trim()) throw new Error('أدخل النوع');
    if (bc && DB.items.some(i => i.bc === bc && i.status !== 'rejected')) throw new Error('هذا الباركود مسجّل أو مطلوب مسبقاً');
    if (DB.items.some(i => i.name === name && i.typ === (String(d.typ || '').trim() || '-') && i.status !== 'rejected')) throw new Error('هذه المادة موجودة أو مطلوبة مسبقاً');
    DB.items.push({ id: uid('i'), name: name.slice(0, 60), cat: String(d.cat || '').trim().slice(0, 40) || name, typ: String(d.typ || '').trim().slice(0, 40) || '-', unit: d.unit || '1 كغ', bc, status: 'pending', by: ME.id, t: Date.now() });
    log('طلب إضافة مادة', name); save();
  },
  async reviewItem(id, ok, reason) {
    needStaff();
    const i = Q.item(id); if (!i || i.status !== 'pending') throw new Error('الطلب غير موجود');
    i.status = ok ? 'active' : 'rejected'; if (!ok) i.reason = reason || '';
    log(ok ? 'اعتماد مادة' : 'رفض مادة', i.name); save();
  },

  async removeMine(id) {
    need('retail', 'wholesale');
    const it = Q.item(id); if (!it) throw new Error('المادة غير موجودة');
    DB.prices.push({ id: uid('p'), item: id, mid: ME.id, min: 0, max: 0, off: true, t: Date.now() });
    log('حذف مادة من قائمة التاجر', it.name); save();
  },
  /* ---- الأسعار (حد أدنى وأعلى) ---- */
  async setPrice(d) {
    need('retail', 'wholesale');
    if (ME.status !== 'active') throw new Error('حسابك غير مفعّل');
    const it = Q.item(d.item);
    if (!it || it.status !== 'active') throw new Error('اختر مادة من القائمة');
    const min = num(d.min), max = num(d.max);
    if (!(min > 0) || !(max > 0)) throw new Error('أدخل الحد الأدنى والحد الأعلى بأرقام صحيحة');
    if (min > max) throw new Error('الحد الأدنى يجب ألا يتجاوز الحد الأعلى');
    if (max > 1e9) throw new Error('الرقم كبير جداً');
    DB.prices.push({ id: uid('p'), item: it.id, mid: ME.id, min, max, t: Date.now() });
    log('تسجيل سعر', it.name + ': ' + min + ' – ' + max); save();
  },

  /* ---- طلبات المواطن وعروض التجار ---- */
  async createReq(d) {
    need('citizen');
    if (!d.lines.length) throw new Error('أضف مادة واحدة على الأقل');
    const area = String(d.area || '').trim();
    if (area.length < 2) throw new Error('أدخل الحي / المنطقة');
    DB.reqs.push({ id: uid('r'), cid: ME.id, area: area.slice(0, 60), note: String(d.note || '').trim().slice(0, 300), lines: d.lines.map(l => ({ item: l.item, qty: l.qty })), status: 'open', t: Date.now() });
    log('طلب بضاعة', d.lines.length + ' مادة'); save();
  },
  async cancelReq(id) {
    need('citizen');
    const r = DB.reqs.find(x => x.id === id && x.cid === ME.id); if (!r) throw new Error('الطلب غير موجود');
    if (reqState(r) !== 'open') throw new Error('لا يمكن إلغاء هذا الطلب');
    r.status = 'cancelled'; log('إلغاء طلب'); save();
  },
  async quote(d) {
    need('retail');
    if (ME.status !== 'active') throw new Error('حسابك غير مفعّل');
    const r = DB.reqs.find(x => x.id === d.req); if (!r || reqState(r) !== 'open') throw new Error('الطلب لم يعد مفتوحاً');
    let total = 0, n = 0;
    const lines = d.lines.map(l => {
      if (!l.avail) return { item: l.item, avail: false, price: 0 };
      const p = num(l.price), it = Q.item(l.item);
      if (!(p > 0)) throw new Error('أدخل سعر «' + (it ? it.name : '') + '» أو علّمها غير متوفرة');
      const q = r.lines.find(x => x.item === l.item);
      total += p * q.qty; n++;
      return { item: l.item, avail: true, price: p };
    });
    if (!n) throw new Error('يجب توفر مادة واحدة على الأقل');
    DB.quotes.forEach(q => { if (q.req === r.id && q.mid === ME.id && q.status === 'sent') q.status = 'withdrawn'; });
    DB.quotes.push({ id: uid('q'), req: r.id, mid: ME.id, lines, total, delivery: !!d.delivery, note: String(d.note || '').trim().slice(0, 200), status: 'sent', t: Date.now() });
    log('عرض سعر على طلب', fmt(total) + ' ل.س'); save();
  },
  async acceptQuote(id) {
    need('citizen');
    const q = DB.quotes.find(x => x.id === id), r = q && DB.reqs.find(x => x.id === q.req);
    if (!q || !r || r.cid !== ME.id) throw new Error('العرض غير موجود');
    if (reqState(r) !== 'open') throw new Error('الطلب لم يعد مفتوحاً');
    DB.quotes.forEach(x => { if (x.req === r.id && x.status === 'sent') x.status = (x.id === id ? 'accepted' : 'rejected'); });
    r.status = 'accepted'; r.qid = id; log('قبول عرض', fmt(q.total) + ' ل.س'); save();
  },

  /* ---- الشكاوى ---- */
  async fileComp(d) {
    need('citizen');
    if (!d.mid) throw new Error('اختر المحل المشكو منه');
    if (String(d.desc || '').trim().length < 10) throw new Error('اكتب وصفاً واضحاً للشكوى (10 أحرف على الأقل)');
    DB.comps.push({ id: uid('c'), cid: ME.id, mid: d.mid, type: d.type, item: d.item || '', desc: String(d.desc).trim().slice(0, 600), photo: d.photo || '', status: 'new', t: Date.now(), hist: [] });
    log('تقديم شكوى', d.type); save();
  },
  async updateComp(id, status, note) {
    needStaff();
    const c = DB.comps.find(x => x.id === id); if (!c) throw new Error('الشكوى غير موجودة');
    c.status = status; c.note = note || ''; c.hist.push({ t: Date.now(), u: ME.name, status, note: note || '' });
    log('تحديث شكوى', status); save();
  },

  /* ---- إدارة الحسابات ---- */
  async approve(id) {
    needStaff();
    const u = Q.user(id); if (!u || u.status !== 'pending') throw new Error('الحساب غير موجود');
    u.status = 'active'; u.apt = Date.now(); log('اعتماد حساب تاجر', dname(u)); save();
  },
  async reject(id, reason) {
    needStaff();
    const u = Q.user(id); if (!u || u.status !== 'pending') throw new Error('الحساب غير موجود');
    u.status = 'rejected'; u.reason = reason || ''; log('رفض حساب تاجر', dname(u)); save();
  },
  async setStatus(id, st) {
    needStaff();
    const u = Q.user(id); if (!u || !['retail', 'wholesale'].includes(u.role)) throw new Error('الحساب غير موجود');
    u.status = st; if (st === 'active' && !u.apt) u.apt = Date.now();
    log(st === 'suspended' ? 'إيقاف حساب' : 'إعادة تفعيل حساب', dname(u)); save();
  },
  async addStaff(d) {
    need('admin');
    const u = await mkUser({ ...d, role: 'inspector', status: 'active' });
    log('إضافة مفتش', u.name); save();
  },
  async resetData(pw) {
    need('admin');
    if (sha256(ME.salt + ':' + pw) !== ME.hash) throw new Error('كلمة المرور غير صحيحة');
    DB.users = DB.users.filter(u => u.role === 'admin' || u.role === 'inspector');
    DB.items = []; DB.prices = []; DB.reqs = []; DB.quotes = []; DB.comps = []; DB.audit = []; DB.fails = {};
    log('مسح بيانات التجربة'); save();
  }
};
const dname = u => u ? (u.biz ? u.biz.name : u.name) : '—';

/* ==========================================================
   الطبقة 5: الواجهات
   ========================================================== */
const ROLEN = { citizen: 'مواطن', retail: 'تاجر تجزئة', wholesale: 'تاجر جملة / مورد', admin: 'مدير النظام', inspector: 'مفتش رقابة' };
const STN = { pending: ['قيد المراجعة', 'a'], active: ['فعّال', ''], rejected: ['مرفوض', 'w'], suspended: ['موقوف', 'w'] };
const isStaff = () => ME && (ME.role === 'admin' || ME.role === 'inspector');
const HOME = { citizen: 'c-prices', retail: 'm-prices', wholesale: 'm-prices', admin: 's-dash', inspector: 's-dash' };
const PUB = ['login', 'register', 'setup'];
const ACCESS = {
  'c-prices': ['citizen'], 'c-item': ['citizen'], 'c-newreq': ['citizen'], 'c-reqs': ['citizen'], 'c-req': ['citizen'], 'c-comps': ['citizen'], 'c-newcomp': ['citizen'],
  'm-prices': ['retail', 'wholesale'], 'm-newitem': ['retail', 'wholesale'], 'r-reqs': ['retail'], 'r-req': ['retail'], 'r-whole': ['retail'],
  's-dash': ['admin', 'inspector'], 's-merch': ['admin', 'inspector'], 's-items': ['admin', 'inspector'], 's-comps': ['admin', 'inspector'], 's-more': ['admin', 'inspector'],
  'acct': ['citizen', 'retail', 'wholesale', 'admin', 'inspector']
};
const TITLE = {
  login: 'تسجيل الدخول', register: 'إنشاء حساب', setup: 'تهيئة النظام', 'c-prices': 'دليل الأسعار', 'c-item': 'تفاصيل المادة', 'c-newreq': 'طلب بضاعة', 'c-reqs': 'طلباتي', 'c-req': 'تفاصيل الطلب',
  'c-comps': 'شكاواي', 'c-newcomp': 'شكوى جديدة', 'm-prices': 'تسجيل الأسعار', 'm-newitem': 'طلب مادة جديدة', 'r-reqs': 'طلبات المواطنين', 'r-req': 'تقديم عرض', 'r-whole': 'أسعار الجملة',
  's-dash': 'لوحة المراقبة', 's-merch': 'حسابات التجار', 's-items': 'المواد', 's-comps': 'الشكاوى', 's-more': 'الإدارة', acct: 'حسابي'
};
const PARENT = { 'c-item': 'c-prices', 'c-newreq': 'c-reqs', 'c-req': 'c-reqs', 'c-newcomp': 'c-comps', 'm-newitem': 'm-prices', 'r-req': 'r-reqs' };
const NAVS = {
  citizen: [['c-prices', 'الأسعار', 'search'], ['c-reqs', 'طلباتي', 'list'], ['c-comps', 'شكاواي', 'flag'], ['acct', 'حسابي', 'user']],
  retail: [['m-prices', 'أسعاري', 'tag'], ['r-reqs', 'الطلبات', 'list'], ['r-whole', 'الجملة', 'store'], ['acct', 'حسابي', 'user']],
  wholesale: [['m-prices', 'أسعاري', 'tag'], ['acct', 'حسابي', 'user']],
  admin: [['s-dash', 'اللوحة', 'shield'], ['s-merch', 'التجار', 'store'], ['s-items', 'المواد', 'bag'], ['s-comps', 'الشكاوى', 'flag'], ['s-more', 'الإدارة', 'menu']]
};
NAVS.inspector = NAVS.admin;

const ST = { loc: null, cart: {}, i: 0, p: 'w', mt: 'pending', ct: 'new', q: '', rt: 'citizen' };
let V = 'login', VP = {};
const STACK = [];
const m = $('m'), nav = $('nav');

/* ---------- مكونات صغيرة ---------- */
const tag = (t, c = '') => `<span class="tag ${c}">${esc(t)}</span>`;
const empty = (t, s) => `<div class="card empty"><b>${esc(t)}</b>${s ? `<div class="sub">${esc(s)}</div>` : ''}</div>`;
const fld = (id, label, extra = '', type = 'text') => `<label for="${id}">${label}</label><input id="${id}" type="${type}" ${extra}>`;
const backBtn = () => `<button class="back" data-act="back">${ic('back', 18)} رجوع</button>`;
const seg = (k, arr, cur) => `<div class="seg">${arr.map(([v, l]) => `<button class="${v === cur ? 'on' : ''}" data-act="tab" data-k="${k}" data-val="${v}">${esc(l)}</button>`).join('')}</div>`;
const itemOpts = (sel) => Q.items().map(i => `<option value="${esc(i.id)}" ${i.id === sel ? 'selected' : ''}>${esc(i.name)} - ${esc(i.typ)} (${esc(i.unit)})</option>`).join('');
const UNITS = ['1 كغ', '1 ليتر', '1 علبة', '1 قطعة'];
const unitSel = id => `<select id="${id}">${UNITS.map(u => `<option>${u}</option>`).join('')}</select>`;
const reqSum = r => r.lines.map(l => { const i = Q.item(l.item); return (i ? i.name : '؟') + ' × ' + l.qty; }).join('، ');
const RST = { open: ['مفتوح', ''], accepted: ['تم قبول عرض', ''], cancelled: ['ملغي', 'a'], expired: ['منتهي', 'a'] };
const CST = { new: ['جديدة', 'w'], review: ['قيد المعالجة', 'a'], closed: ['مغلقة', ''] };
const CTYPES = ['السعر الفعلي مختلف عن السعر المعلن في التطبيق', 'عدم إظهار الأسعار', 'مادة منتهية الصلاحية أو فاسدة', 'امتناع عن البيع', 'أخرى'];
const mapA = u => u && u.biz && u.biz.loc ? `<a class="tag" href="https://www.google.com/maps?q=${u.biz.loc.lat},${u.biz.loc.lng}" target="_blank" rel="noopener">موقع المحل على الخريطة</a>` : '';
const shopLine = u => `${esc(dname(u))}${u.biz && u.biz.addr ? ' · ' + esc(u.biz.addr) : ''}`;
const badge = n => n ? `<span class="nb">${n}</span>` : '';

/* ---------- الواجهات ---------- */
const VIEWS = {
  setup: () => `<div class="hero"><small>● إعداد أولي</small><h2>تهيئة النظام</h2><p>أنشئ حساب مدير النظام. هذا الحساب هو الوحيد الذي يستطيع إضافة مفتشي الرقابة وإدارة قائمة المواد.</p></div>
<div class="card"><h2>حساب مدير النظام</h2>${fld('sun', 'الاسم الكامل')}${fld('sup', 'رقم الهاتف المحمول', 'inputmode="tel" dir="ltr" placeholder="09XXXXXXXX"')}${fld('suw', 'كلمة المرور (6 أحرف على الأقل)', 'dir="ltr"', 'password')}${fld('suw2', 'تأكيد كلمة المرور', 'dir="ltr"', 'password')}
<button class="btn" data-act="setup" style="margin:14px 0 0">${ic('check')} إنشاء الحساب</button></div>`,

  login: () => `<div class="hero"><small>● منظومة رسمية</small><h2>تسجيل الدخول</h2><p>الدخول متاح للمستخدمين المسجّلين فقط: مواطن، تاجر تجزئة، تاجر جملة، ورقابة تموينية.</p></div>
<div class="card">${fld('lph', 'رقم الهاتف المحمول', 'inputmode="tel" dir="ltr" placeholder="09XXXXXXXX" autocomplete="username"')}${fld('lpw', 'كلمة المرور', 'dir="ltr" placeholder="••••••••" autocomplete="current-password"', 'password')}
<button class="btn" data-act="login" style="margin:14px 0 10px">${ic('lock')} تسجيل الدخول</button>
<button class="srch" data-act="go" data-v="register" style="width:100%;justify-content:center;font:inherit;margin:0">إنشاء حساب جديد</button></div>
<div class="hint">حسابات الرقابة التموينية يُنشئها مدير النظام فقط، ولا يمكن التسجيل بها من هنا.</div>`,

  register: () => `<div class="card"><h2>إنشاء حساب جديد</h2><label>نوع الحساب</label>
<div class="seg">${[['citizen', 'مواطن'], ['retail', 'تاجر تجزئة'], ['wholesale', 'جملة / مورد']].map(([v, l]) => `<button class="${v === ST.rt ? 'on' : ''}" data-act="rtype" data-val="${v}">${l}</button>`).join('')}</div>
<div id="rnote" class="hint"></div>
${fld('rn', 'الاسم الكامل')}${fld('rph', 'رقم الهاتف المحمول', 'inputmode="tel" dir="ltr" placeholder="09XXXXXXXX"')}
<div id="rc">${fld('ra', 'الحي / المنطقة')}</div>
<div id="rm">${fld('rb', 'اسم المحل / الشركة')}${fld('rg', 'رقم السجل التجاري (اختياري)', 'inputmode="numeric"')}${fld('rd', 'عنوان المحل / الشركة')}<label>موقع المحل: اضغط على الخريطة أو اسحب العلامة</label><div id="pm" class="mp"></div><button type="button" class="srch" data-act="getloc" style="width:100%;justify-content:center;font:inherit;margin:8px 0 4px">${ic('info', 18)} تحديد موقعي الحالي</button><div id="rlt" class="hint">${ST.loc ? 'تم تحديد الموقع ✓' : 'يساعد المواطن في الوصول إليك'}</div></div>
${fld('rpw', 'كلمة المرور (6 أحرف على الأقل)', 'dir="ltr" autocomplete="new-password"', 'password')}${fld('rpw2', 'تأكيد كلمة المرور', 'dir="ltr" autocomplete="new-password"', 'password')}
<button class="btn" data-act="register" style="margin:14px 0 10px">${ic('check')} إنشاء الحساب</button>
<button class="srch" data-act="go" data-v="login" style="width:100%;justify-content:center;font:inherit;margin:0">لدي حساب، تسجيل الدخول</button></div>`,

  acct() {
    const u = ME, st = STN[u.status] || ['', ''];
    return `<div class="card"><div class="row"><h2>${esc(dname(u))}</h2>${tag(ROLEN[u.role])}</div>
<div class="kv"><span>الاسم</span><b>${esc(u.name)}</b></div><div class="kv"><span>الهاتف</span><b dir="ltr">${esc(u.phone)}</b></div>
${u.area ? `<div class="kv"><span>المنطقة</span><b>${esc(u.area)}</b></div>` : ''}
${u.biz ? `${u.biz.reg ? `<div class="kv"><span>السجل التجاري</span><b>${esc(u.biz.reg)}</b></div>` : ''}<div class="kv"><span>العنوان</span><b>${esc(u.biz.addr)}</b></div><div class="kv"><span>حالة الحساب</span>${tag(st[0], st[1])}</div>` : ''}
<div class="kv"><span>تاريخ التسجيل</span><b>${dt(u.t)}</b></div></div>
<div class="card"><h2>تغيير كلمة المرور</h2>${fld('o1', 'كلمة المرور الحالية', 'dir="ltr"', 'password')}${fld('o2', 'كلمة المرور الجديدة', 'dir="ltr"', 'password')}<button class="btn" data-act="chpw" style="margin:14px 0 0">حفظ</button></div>
<button class="btn dng" data-act="logout">تسجيل الخروج</button>`;
  },

  /* ================= المواطن ================= */
  'c-prices'() {
    const n = Object.keys(ST.cart).length;
    return `<div class="row" style="margin-bottom:12px"><div><h2>دليل الأسعار</h2><div class="sub">أدنى وأعلى سعر لكل مادة لدى المحلات المعتمدة</div></div>${n ? `<button class="btn sm" data-act="go" data-v="c-newreq">${ic('list', 16)} طلبي (${n})</button>` : ''}</div>
<div class="srch">${ic('search')}<input id="q" value="${esc(ST.q)}" placeholder="ابحث بالاسم أو رقم الباركود..."></div>
<button class="btn" data-act="scan">${ic('cam')} مسح الباركود للتحقق من السعر</button><div id="lst">${VIEWS.pList()}</div>`;
  },
  pList() {
    const q = (ST.q || '').trim(), L = Q.items().filter(i => !q || (i.name + ' ' + i.cat + ' ' + i.typ + ' ' + (i.bc || '')).includes(q));
    if (!L.length) return empty(q ? 'لا توجد نتائج' : 'لا توجد مواد بعد', q ? '' : 'ستظهر المواد والأسعار هنا عند تسجيلها من الجهات المعتمدة');
    return L.map(i => {
      const s = Q.stat(i.id, 'retail');
      return `<div class="card" data-act="go" data-v="c-item" data-id="${esc(i.id)}" style="cursor:pointer"><div class="row"><div><h2>${esc(i.name)} <span class="sub">(${esc(i.unit)})</span></h2><div class="sub">${esc(i.cat)} · ${esc(i.typ)}</div></div>${s ? tag(s.n + ' محل') : tag('لا أسعار بعد', 'a')}</div>
${s ? `<div class="pr"><div><span>أدنى سعر</span><b style="color:var(--gr)">${fmt(s.min)} <small>ل.س</small></b></div><div><span>أعلى سعر</span><b style="color:var(--red)">${fmt(s.max)} <small>ل.س</small></b></div></div>` : ''}
</div>`;
    }).join('');
  },
  'c-item'(p) {
    const i = Q.item(p.id); if (!i) return empty('المادة غير موجودة');
    const s = Q.stat(i.id, 'retail'), L = s ? s.L.slice().sort((a, b) => a.min - b.min) : [], U = id => Q.user(id);
    return `${backBtn()}<div class="card"><h2>${esc(i.name)} <span class="sub">(${esc(i.unit)})</span></h2><div class="sub">${esc(i.cat)} · ${esc(i.typ)}${i.bc ? ' · باركود ' + esc(i.bc) : ''}</div>
<div class="acts"><button class="btn sm" data-act="cartadd" data-id="${esc(i.id)}">${ic('plus', 16)} أضف لطلب بضاعة</button><button class="btn sm ghost" data-act="go" data-v="c-newcomp" data-id="${esc(i.id)}">تقديم شكوى</button></div></div>
${L.some(x => { const u = U(x.mid); return u && u.biz && u.biz.loc; }) ? '<div class="card"><h2>مواقع المحلات على الخريطة</h2><div id="im" class="mp"></div></div>' : ''}
<div class="row" style="margin:4px 0 10px"><h2>الأسعار لدى المحلات</h2>${tag(L.length + ' محل')}</div>
${L.map((x, k) => { const u = U(x.mid), old = Date.now() - x.t > 7 * DAY; return `<div class="card"><div class="row"><div><h2>${esc(dname(u))}</h2><div class="sub">${esc(u.biz.addr)}</div>${mapA(u)}</div>${k === 0 ? tag('الأرخص') : ''}</div>
<div class="pr"><div><span>الحد الأدنى</span><b style="color:var(--gr)">${fmt(x.min)} <small>ل.س</small></b></div><div><span>الحد الأعلى</span><b style="color:var(--red)">${fmt(x.max)} <small>ل.س</small></b></div></div>
<div class="sub" style="margin-top:8px">آخر تحديث ${dt(x.t)} ${old ? tag('قديم', 'a') : ''}</div></div>`; }).join('') || empty('لا أسعار مسجّلة لهذه المادة بعد')}`;
  },
  'c-newreq'() {
    const ids = Object.keys(ST.cart).filter(id => Q.item(id));
    return `${backBtn()}<div class="card"><h2>طلب بضاعة</h2><div class="hint">يُرسل طلبك إلى تجار التجزئة المعتمدين، ويردّون بعروض أسعارهم. تختار العرض الأنسب، ولا يظهر رقم هاتفك للتاجر إلا بعد قبولك عرضه. الطلب يبقى مفتوحاً 48 ساعة.</div>
${ids.map(id => { const i = Q.item(id); return `<div class="li row"><div><b>${esc(i.name)}</b><div class="sub">${esc(i.typ)} · ${esc(i.unit)}</div></div><div class="qty"><button data-act="qm" data-id="${esc(id)}">−</button><b>${ST.cart[id]}</b><button data-act="qp" data-id="${esc(id)}">+</button></div></div>`; }).join('') || '<div class="sub" style="padding:12px 0">القائمة فارغة. أضف مواد من الأسفل أو من دليل الأسعار.</div>'}
<label>إضافة مادة</label><div class="row"><select id="cs" style="flex:1">${itemOpts()}</select><button class="btn sm" data-act="cartsel">${ic('plus', 16)}</button></div>
${fld('ra', 'الحي / المنطقة', `value="${esc(ST.ra != null ? ST.ra : (ME.area || ''))}"`)}<label for="rnt">ملاحظات (اختياري)</label><textarea id="rnt" placeholder="مثال: أحتاجها اليوم، أو أفضل التوصيل">${esc(ST.rn || '')}</textarea>
<button class="btn" data-act="sendreq" style="margin:14px 0 0">${ic('check')} إرسال الطلب</button></div>`;
  },
  'c-reqs'() {
    const L = DB.reqs.filter(r => r.cid === ME.id).sort((a, b) => b.t - a.t);
    return `<div class="row" style="margin-bottom:12px"><h2>طلباتي</h2><button class="btn sm" data-act="go" data-v="c-newreq">${ic('plus', 16)} طلب جديد</button></div>
${L.map(r => { const s = reqState(r), st = RST[s], n = Q.quotesOf(r.id).length; return `<div class="card" data-act="go" data-v="c-req" data-id="${r.id}" style="cursor:pointer"><div class="row"><b>${esc(reqSum(r))}</b>${tag(st[0], st[1])}</div><div class="sub" style="margin-top:6px">${ago(r.t)} · ${n} عرض</div></div>`; }).join('') || empty('لا توجد طلبات', 'اختر مواد من دليل الأسعار أو اضغط «طلب جديد»')}`;
  },
  'c-req'(p) {
    const r = DB.reqs.find(x => x.id === p.id && x.cid === ME.id); if (!r) return empty('الطلب غير موجود');
    const s = reqState(r), st = RST[s], qs = Q.quotesOf(r.id).slice().sort((a, b) => (a.lines.filter(l => !l.avail).length - b.lines.filter(l => !l.avail).length) || (a.total - b.total));
    const showQ = s === 'accepted' ? qs.filter(q => q.id === r.qid) : qs;
    return `${backBtn()}<div class="card"><div class="row"><h2>طلب بضاعة</h2>${tag(st[0], st[1])}</div>
${r.lines.map(l => { const i = Q.item(l.item); return `<div class="kv"><span>${esc(i ? i.name : '؟')}</span><b>× ${l.qty}</b></div>`; }).join('')}
<div class="sub" style="margin-top:8px">${esc(r.area)} · ${ago(r.t)}${r.note ? ' · ' + esc(r.note) : ''}</div>${s === 'open' ? `<div class="acts"><button class="btn sm dng" data-act="cancelreq" data-id="${r.id}">إلغاء الطلب</button></div>` : ''}</div>
<div class="row" style="margin:4px 0 10px"><h2>${s === 'accepted' ? 'العرض المقبول' : 'العروض المستلمة'}</h2>${tag(String(showQ.length))}</div>
${showQ.map((q, k) => { const u = Q.user(q.mid), miss = q.lines.filter(l => !l.avail).length; return `<div class="card"><div class="row"><div><h2>${esc(dname(u))}</h2><div class="sub">${esc(u.biz.addr)}</div></div>${k === 0 && s === 'open' ? tag('الأفضل عرضاً') : ''}</div>
<div class="pr"><div><span>الإجمالي</span><b>${fmt(q.total)} <small>ل.س</small></b></div><div><span>التوصيل</span><b style="font-size:16px">${q.delivery ? 'متوفر' : 'غير متوفر'}</b></div></div>
${q.lines.map(l => { const i = Q.item(l.item), rl = r.lines.find(x => x.item === l.item); return `<div class="kv"><span>${esc(i ? i.name : '؟')} × ${rl ? rl.qty : ''}</span><b>${l.avail ? fmt(l.price) + ' ل.س' : 'غير متوفرة'}</b></div>`; }).join('')}
${miss ? `<div class="banner w" style="margin:10px 0 0">${miss} مادة غير متوفرة عند هذا التاجر</div>` : ''}${q.note ? `<div class="sub" style="margin-top:8px">${esc(q.note)}</div>` : ''}
${s === 'open' ? `<div class="acts"><button class="btn sm" data-act="accept" data-id="${q.id}">${ic('check', 16)} قبول العرض</button></div>` : ''}
${s === 'accepted' ? `<div class="banner g" style="margin:10px 0 0">للتواصل مع التاجر: <b dir="ltr">${esc(u.phone)}</b></div><a class="btn sm ghost" style="text-decoration:none;margin-top:8px" href="tel:${esc(u.phone)}">${ic('phone', 16)} اتصال</a>` : ''}</div>`; }).join('') || empty('لم تصل عروض بعد', 'سيظهر هنا كل عرض يرسله التجار')}`;
  },
  'c-comps'() {
    const L = DB.comps.filter(c => c.cid === ME.id).sort((a, b) => b.t - a.t);
    return `<div class="row" style="margin-bottom:12px"><h2>شكاواي</h2><button class="btn sm" data-act="go" data-v="c-newcomp">${ic('plus', 16)} شكوى جديدة</button></div>
${L.map(c => { const u = Q.user(c.mid), st = CST[c.status]; return `<div class="card"><div class="row"><b>${esc(c.type)}</b>${tag(st[0], st[1])}</div><div class="sub" style="margin:6px 0">${esc(dname(u))} · ${dt(c.t)}</div><div>${esc(c.desc)}</div>${c.photo ? `<img class="ph" src="${c.photo}" alt="">` : ''}
${c.note ? `<div class="banner g" style="margin:10px 0 0"><b>ردّ الرقابة:</b> ${esc(c.note)}</div>` : ''}</div>`; }).join('') || empty('لا توجد شكاوى')}
<a class="btn red" href="tel:119" style="margin-top:6px"><span>للشكاوى العاجلة اتصل بالرقم 119<small>خدمة هاتفية مباشرة</small></span>${ic('phone', 26)}</a>`;
  },
  'c-newcomp'(p) {
    const ms = Q.active('retail');
    return `${backBtn()}<div class="card"><h2>تقديم شكوى</h2>
<label for="cm">المحل المشكو منه</label><select id="cm"><option value="">— اختر —</option>${ms.map(u => `<option value="${u.id}">${esc(dname(u))} - ${esc(u.biz.addr)}</option>`).join('')}</select>
<label for="ct">نوع الشكوى</label><select id="ct">${CTYPES.map(t => `<option>${t}</option>`).join('')}</select>
<label for="ci">المادة (اختياري)</label><select id="ci"><option value="">—</option>${itemOpts(p.id)}</select>
<label for="cd">وصف الشكوى</label><textarea id="cd" placeholder="اكتب ما حدث بوضوح: السعر المطلوب، التاريخ، ..."></textarea>
<label for="cp">صورة (اختياري)</label><input id="cp" type="file" accept="image/*"><div id="cpv"></div>
<button class="btn" data-act="sendcomp" style="margin:14px 0 0">${ic('check')} إرسال الشكوى</button></div>${ms.length ? '' : '<div class="banner w">لا توجد محلات معتمدة بعد لتقديم شكوى بحقها.</div>'}`;
  },

  /* ================= التجار ================= */
  'm-prices'() {
    const mine = Q.mine(ME.id), r = ME.role === 'retail', mineItems = DB.items.filter(i => i.by === ME.id && i.status !== 'active');
    const banner = ME.status === 'active' ? '' : `<div class="banner w">حسابك ${STN[ME.status][0]}.</div>`;
    return `${banner}<div class="card"><h2>${r ? 'تسجيل سعر التجزئة' : 'تسجيل سعر الجملة'}</h2><div class="sub">${esc(dname(ME))} · يلزم التحديث أسبوعياً وإلا يُصنَّف «متأخراً» لدى الرقابة</div>
${Q.items().length ? `<label for="ri">المادة</label><select id="ri">${itemOpts()}</select>
<div class="c2"><div>${fld('pmin', 'الحد الأدنى (ل.س)', 'inputmode="numeric"')}</div><div>${fld('pmax', 'الحد الأعلى (ل.س)', 'inputmode="numeric"')}</div></div>
<button class="btn" data-act="saveprice" style="margin:14px 0 0">${ic('check')} حفظ السعر</button>` : `<div class="hint" style="margin-top:10px">لا توجد مواد معتمدة بعد. يضيف مدير النظام المواد، أو اطلب إضافة مادة.</div>`}
<button class="srch" data-act="go" data-v="m-newitem" style="width:100%;justify-content:center;font:inherit;margin:10px 0 0">مادة غير موجودة؟ اطلب إضافتها</button></div>
${mineItems.length ? `<div class="card"><h2>طلبات المواد الخاصة بي</h2>${mineItems.map(i => `<div class="li row"><div><b>${esc(i.name)}</b><div class="sub">${esc(i.typ)}${i.reason ? ' · ' + esc(i.reason) : ''}</div></div>${tag(i.status === 'pending' ? 'قيد المراجعة' : 'مرفوضة', i.status === 'pending' ? 'a' : 'w')}</div>`).join('')}</div>` : ''}
<div class="row" style="margin:4px 0 10px"><h2>أسعاري المسجّلة</h2>${tag(String(mine.length))}</div>
${mine.map(x => { const i = Q.item(x.item); if (!i || i.status !== 'active') return ''; const old = Date.now() - x.t > 7 * DAY; return `<div class="card ${old ? 'bad' : ''}"><div class="row"><div><h2>${esc(i.name)}</h2><div class="sub">${esc(i.typ)} · ${esc(i.unit)} · آخر تحديث ${dt(x.t)}</div></div>${tag(old ? 'بحاجة تحديث' : 'محدّث', old ? 'w' : '')}</div>
<div class="pr"><div><span>الحد الأدنى</span><b>${fmt(x.min)} <small>ل.س</small></b></div><div><span>الحد الأعلى</span><b>${fmt(x.max)} <small>ل.س</small></b></div></div>
<div class="acts"><button class="btn sm ghost" data-act="editprice" data-id="${esc(i.id)}" data-min="${x.min}" data-max="${x.max}">تحديث السعر</button><button class="btn sm dng" data-act="rmprice" data-id="${esc(i.id)}">حذف المادة</button></div></div>`; }).join('') || empty('لم تسجّل أي سعر بعد')}`;
  },
  'm-newitem': () => `${backBtn()}<div class="card"><h2>طلب إضافة مادة جديدة</h2><div class="hint">تُرسل المادة للرقابة التموينية، وبعد اعتمادها تستطيع تسجيل سعرها.</div>
${fld('nn', 'اسم المادة')}${fld('nc', 'الصنف (سكر، رز، زيوت...)')}${fld('nt', 'النوع')}<label for="nu">الوحدة</label>${unitSel('nu')}${fld('nb', 'الباركود (إن وُجد)', 'inputmode="numeric"')}
<button class="btn" data-act="reqitem" style="margin:14px 0 0">${ic('check')} إرسال الطلب</button></div>`,

  'r-reqs'() {
    const L = DB.reqs.filter(r => reqState(r) === 'open' || DB.quotes.some(q => q.req === r.id && q.mid === ME.id)).sort((a, b) => b.t - a.t);
    return `<h2 style="margin-bottom:12px">طلبات المواطنين</h2>${L.map(r => {
      const mq = DB.quotes.find(q => q.req === r.id && q.mid === ME.id && q.status !== 'withdrawn'), s = reqState(r);
      return `<div class="card" data-act="go" data-v="r-req" data-id="${r.id}" style="cursor:pointer"><div class="row"><b>${esc(reqSum(r))}</b>${mq ? tag(mq.status === 'accepted' ? 'تم قبول عرضك' : mq.status === 'rejected' ? 'لم يُقبل عرضك' : 'أرسلت عرضاً', mq.status === 'rejected' ? 'a' : '') : tag(s === 'open' ? 'بانتظار عرضك' : RST[s][0], s === 'open' ? 'a' : 'w')}</div><div class="sub" style="margin-top:6px">${esc(r.area)} · ${ago(r.t)}</div></div>`;
    }).join('') || empty('لا توجد طلبات حالياً', 'ستظهر هنا طلبات المواطنين المفتوحة لتقديم عروضك')}`;
  },
  'r-req'(p) {
    const r = DB.reqs.find(x => x.id === p.id); if (!r) return empty('الطلب غير موجود');
    const s = reqState(r), mq = DB.quotes.find(q => q.req === r.id && q.mid === ME.id && q.status !== 'withdrawn'), mine = Object.fromEntries(Q.mine(ME.id).map(x => [x.item, x]));
    const ro = s !== 'open';
    return `${backBtn()}<div class="card"><div class="row"><h2>طلب مواطن</h2>${tag(RST[s][0], RST[s][1])}</div><div class="sub">${esc(r.area)} · ${ago(r.t)}${r.note ? ' · ' + esc(r.note) : ''}</div>
${mq && mq.status === 'accepted' ? `<div class="banner g" style="margin-top:12px">تم قبول عرضك. للتواصل مع المواطن: <b dir="ltr">${esc((Q.user(r.cid) || {}).phone || '')}</b> (${esc((Q.user(r.cid) || {}).name || '')})</div>` : ''}</div>
<div class="card"><h2>${ro ? 'عرضك' : (mq ? 'تعديل عرضك' : 'تقديم عرض')}</h2>
${r.lines.map((l, k) => { const i = Q.item(l.item), ql = mq && mq.lines.find(x => x.item === l.item), def = ql ? (ql.avail ? ql.price : '') : (mine[l.item] ? mine[l.item].max : ''), av = ql ? ql.avail : true;
      return `<div class="li" data-line="${esc(l.item)}"><div class="row"><b>${esc(i ? i.name : '؟')} × ${l.qty}</b></div>
<div class="row" style="margin-top:6px"><input class="lp" inputmode="numeric" placeholder="سعر الوحدة (ل.س)" value="${def}" ${ro ? 'disabled' : ''}><label style="margin:0;display:flex;gap:6px;align-items:center;white-space:nowrap"><input class="la" type="checkbox" ${av ? 'checked' : ''} ${ro ? 'disabled' : ''} style="width:auto"> متوفرة</label></div></div>`; }).join('')}
${ro ? '' : `<label style="display:flex;gap:8px;align-items:center"><input id="qd" type="checkbox" style="width:auto" ${mq && mq.delivery ? 'checked' : ''}> يتوفر توصيل</label><label for="qn">ملاحظة (اختياري)</label><input id="qn" value="${esc(mq ? mq.note : '')}">
<button class="btn" data-act="sendquote" data-id="${r.id}" style="margin:14px 0 0">${ic('check')} ${mq ? 'تحديث العرض' : 'إرسال العرض'}</button>`}</div>`;
  },
  'r-whole'() {
    const its = Q.items().filter(i => Q.stat(i.id, 'wholesale'));
    return `<h2 style="margin-bottom:4px">أسعار الجملة والتوريد</h2><div class="sub" style="margin-bottom:12px">الأسعار المسجّلة من الموردين المعتمدين</div>
${its.map(i => { const s = Q.stat(i.id, 'wholesale'); return `<div class="card"><div class="row"><div><h2>${esc(i.name)} <span class="sub">(${esc(i.unit)})</span></h2><div class="sub">${esc(i.cat)} · ${esc(i.typ)}</div></div>${tag(s.n + ' مورد')}</div>
${s.L.slice().sort((a, b) => a.min - b.min).map(x => { const u = Q.user(x.mid); return `<div class="li row"><div><b>${esc(dname(u))}</b><div class="sub" dir="ltr" style="text-align:right">${esc(u.phone)} · ${dt(x.t)}</div></div><b>${fmt(x.min)} – ${fmt(x.max)}</b></div>`; }).join('')}</div>`; }).join('') || empty('لا أسعار جملة بعد', 'ستظهر هنا أسعار الموردين المعتمدين')}`;
  },

  /* ================= الرقابة ================= */
  's-dash'() {
    const lt = Q.late(), cmp = Q.items().map(i => { const s = Q.stat(i.id, 'retail'); if (!s) return null; return { i, s, lo: s.L.reduce((a, x) => x.min < a.min ? x : a), hi: s.L.reduce((a, x) => x.max > a.max ? x : a) }; }).filter(Boolean), pend = DB.users.filter(u => u.status === 'pending').length, oc = DB.comps.filter(c => c.status !== 'closed').length, pi = DB.items.filter(i => i.status === 'pending').length;
    return `<div class="hero"><small>● نقطة المراقبة</small><h2>لوحة مراقبة الأسعار</h2><p>${esc(ME.name)} · ${ROLEN[ME.role]}</p></div>
${(pend || pi) ? `<div class="banner w">${pend ? `<b>${pend}</b> حساب تاجر بانتظار المراجعة ` : ''}${pi ? `<b>${pi}</b> طلب مادة بانتظار الاعتماد` : ''}</div>` : ''}
<div class="kp"><div class="k g"><span>محلات التجزئة</span><b>${Q.active('retail').length}</b></div><div class="k g"><span>شركات الجملة</span><b>${Q.active('wholesale').length}</b></div><div class="k"><span>المواد المعتمدة</span><b>${Q.items().length}</b></div><div class="k a"><span>حسابات قيد المراجعة</span><b>${pend}</b></div><div class="k r"><span>شكاوى مفتوحة</span><b>${oc}</b></div><div class="k a"><span>متأخرون عن التحديث</span><b>${lt.length}</b></div></div>
${chart()}
<div class="card"><h2>مقارنة الأسعار بين المحلات</h2>${cmp.map(x => `<div class="li"><div class="row"><b>${esc(x.i.name)} <span class="sub">(${esc(x.i.unit)})</span></b>${x.s.n > 1 ? tag('فرق ' + Math.round((x.s.max / x.s.min - 1) * 100) + '%', 'a') : tag('محل واحد')}</div><div class="sub">الأرخص: <b>${esc(dname(Q.user(x.lo.mid)))}</b> من ${fmt(x.lo.min)}</div><div class="sub">الأعلى: <b>${esc(dname(Q.user(x.hi.mid)))}</b> حتى ${fmt(x.hi.max)}</div></div>`).join('') || '<div class="sub">لا أسعار مسجّلة بعد</div>'}</div>
<div class="card"><h2>الالتزام بتحديث الأسعار</h2><div class="sub">ملتزمون: ${Q.active().length - lt.length} من ${Q.active().length} · غير الملتزمين (أكثر من 7 أيام):</div>${lt.map(u => `<div class="li row"><div><b>${esc(dname(u))}</b><div class="sub">${u.role === 'retail' ? 'تجزئة' : 'جملة'} · <span dir="ltr">${esc(u.phone)}</span></div></div>${tag('منذ ' + Math.floor((Date.now() - Q.lastUpdate(u)) / DAY) + ' يوم', 'w')}</div>`).join('') || '<div class="sub">الجميع ملتزم</div>'}</div>`;
  },
  's-merch'() {
    const t = ST.mt, L = DB.users.filter(u => (u.role === 'retail' || u.role === 'wholesale') && (t === 'pending' ? u.status === 'pending' : t === 'active' ? u.status === 'active' : (u.status === 'rejected' || u.status === 'suspended'))).sort((a, b) => b.t - a.t);
    return `<h2>حسابات التجار</h2>${seg('mt', [['pending', 'قيد المراجعة'], ['active', 'المعتمدون'], ['other', 'مرفوض / موقوف']], t)}
${L.map(u => `<div class="card"><div class="row"><div><h2>${esc(dname(u))}</h2><div class="sub">${ROLEN[u.role]}</div></div>${tag(STN[u.status][0], STN[u.status][1])}</div>
<div class="kv"><span>المالك</span><b>${esc(u.name)}</b></div><div class="kv"><span>الهاتف</span><b dir="ltr">${esc(u.phone)}</b></div>${u.biz.reg ? `<div class="kv"><span>السجل التجاري</span><b>${esc(u.biz.reg)}</b></div>` : ''}<div class="kv"><span>العنوان</span><b>${esc(u.biz.addr)}</b></div>${mapA(u)}<div class="kv"><span>التسجيل</span><b>${dt(u.t)}</b></div>
${u.reason ? `<div class="sub">السبب: ${esc(u.reason)}</div>` : ''}
<div class="acts">${u.status === 'pending' ? `<button class="btn sm" data-act="approve" data-id="${u.id}">${ic('check', 16)} اعتماد</button><button class="btn sm dng" data-act="reject" data-id="${u.id}">رفض</button>` : ''}${u.status === 'active' ? `<button class="btn sm dng" data-act="suspend" data-id="${u.id}">إيقاف الحساب</button>` : ''}${u.status === 'suspended' ? `<button class="btn sm" data-act="reactivate" data-id="${u.id}">إعادة التفعيل</button>` : ''}</div></div>`).join('') || empty('لا توجد حسابات في هذه القائمة')}`;
  },
  's-items'() {
    const pend = DB.items.filter(i => i.status === 'pending'), act = Q.items(), adm = ME.role === 'admin';
    return `<h2 style="margin-bottom:12px">المواد</h2>
${pend.length ? `<div class="card bad"><h2>طلبات إضافة مواد (${pend.length})</h2>${pend.map(i => `<div class="li"><div class="row"><div><b>${esc(i.name)}</b><div class="sub">${esc(i.cat)} · ${esc(i.typ)} · ${esc(i.unit)}${i.bc ? ' · ' + esc(i.bc) : ''}</div><div class="sub">طلب من: ${esc(dname(Q.user(i.by)))}</div></div></div><div class="acts"><button class="btn sm" data-act="itemok" data-id="${i.id}">اعتماد</button><button class="btn sm dng" data-act="itemno" data-id="${i.id}">رفض</button></div></div>`).join('')}</div>` : ''}
${adm ? `<div class="card"><h2>إضافة مادة</h2>${fld('an', 'اسم المادة')}${fld('ac', 'الصنف')}${fld('at', 'النوع')}<label for="au">الوحدة</label>${unitSel('au')}${fld('ab', 'الباركود (اختياري)', 'inputmode="numeric"')}
<button class="btn" data-act="additem" style="margin:14px 0 0">${ic('plus')} إضافة المادة</button></div>` : ''}
<div class="row" style="margin:4px 0 10px"><h2>المواد المعتمدة</h2>${tag(String(act.length))}</div>
${act.map(i => `<div class="card"><div class="row"><div><h2>${esc(i.name)} <span class="sub">(${esc(i.unit)})</span></h2><div class="sub">${esc(i.cat)} · ${esc(i.typ)}${i.bc ? ' · ' + esc(i.bc) : ''}</div></div>${(() => { const s = Q.stat(i.id, 'retail'); return s ? tag(s.n + ' محل') : tag('بلا أسعار', 'a'); })()}</div></div>`).join('') || empty('لا توجد مواد بعد', adm ? 'أضف أول مادة من النموذج أعلاه' : 'يضيف مدير النظام المواد')}`;
  },
  's-comps'() {
    const t = ST.ct, L = DB.comps.filter(c => t === 'all' || c.status === t).sort((a, b) => b.t - a.t);
    return `<h2>الشكاوى</h2>${seg('ct', [['new', 'جديدة'], ['review', 'قيد المعالجة'], ['closed', 'مغلقة'], ['all', 'الكل']], t)}
${L.map(c => { const u = Q.user(c.mid), z = Q.user(c.cid), i = Q.item(c.item), st = CST[c.status]; return `<div class="card"><div class="row"><b>${esc(c.type)}</b>${tag(st[0], st[1])}</div>
<div class="sub" style="margin:6px 0">ضد: <b>${esc(dname(u))}</b>${i ? ' · ' + esc(i.name) : ''}<br>المشتكي: ${esc(z ? z.name : '—')} · <span dir="ltr">${esc(z ? z.phone : '')}</span> · ${dt(c.t)}</div><div>${esc(c.desc)}</div>${c.photo ? `<img class="ph" src="${c.photo}" alt="">` : ''}
${c.hist.map(h => `<div class="sub" style="margin-top:6px">${dt(h.t)} · ${esc(h.u)}: ${esc(CST[h.status][0])}${h.note ? ' — ' + esc(h.note) : ''}</div>`).join('')}
<div class="acts">${c.status === 'new' ? `<button class="btn sm ghost" data-act="cstat" data-id="${c.id}" data-s="review">بدء المعالجة</button>` : ''}${c.status !== 'closed' ? `<button class="btn sm" data-act="cstat" data-id="${c.id}" data-s="closed">إغلاق مع ملاحظة</button>` : ''}</div></div>`; }).join('') || empty('لا توجد شكاوى في هذه القائمة')}`;
  },
  's-more'() {
    const staff = DB.users.filter(u => u.role === 'inspector' || u.role === 'admin'), adm = ME.role === 'admin';
    return `<h2 style="margin-bottom:12px">الإدارة</h2>
<div class="card"><h2>فريق الرقابة التموينية</h2>${staff.map(u => `<div class="li row"><div><b>${esc(u.name)}</b><div class="sub" dir="ltr" style="text-align:right">${esc(u.phone)}</div></div>${tag(ROLEN[u.role])}</div>`).join('')}</div>
${adm ? `<div class="card"><h2>إضافة مفتش رقابة</h2>${fld('fn', 'الاسم الكامل')}${fld('fp', 'رقم الهاتف المحمول', 'inputmode="tel" dir="ltr" placeholder="09XXXXXXXX"')}${fld('fw', 'كلمة مرور مؤقتة', 'dir="ltr"', 'password')}<button class="btn" data-act="addstaff" style="margin:14px 0 0">${ic('plus')} إضافة المفتش</button></div>` : ''}
<div class="card"><h2>سجل العمليات (آخر 40)</h2>${DB.audit.slice(-40).reverse().map(a => `<div class="li"><b>${esc(a.act)}</b> <span class="sub">${esc(a.det)}</span><div class="sub">${esc(a.n)} · ${dt(a.t)} ${new Date(a.t).toTimeString().slice(0, 5)}</div></div>`).join('') || '<div class="sub">لا عمليات بعد</div>'}</div>
${adm ? `<div class="card"><h2>صيانة</h2><div class="hint">مسح كل بيانات التجار والمواطنين والأسعار والشكاوى والطلبات، مع الإبقاء على حسابات فريق الرقابة. مفيدة بعد العرض التجريبي.</div><div class="acts"><button class="btn sm dng" data-act="resetdata">مسح بيانات التجربة</button></div></div>` : ''}`;
  }
};

/* ---------- الرسم البياني (تطور الأسعار) ---------- */
const PER = { w: ['أسبوع', 7, 1], m: ['شهر', 30, 1], y: ['سنة', 12, 30] };
function chart() {
  const its = Q.items();
  if (!its.length) return empty('لا بيانات للرسم بعد', 'يظهر تطور الأسعار عند تسجيل التجار للأسعار');
  if (+ST.i >= its.length) ST.i = 0;
  const it = its[+ST.i || 0], n = PER[ST.p][1], step = PER[ST.p][2];
  const ser = role => Array.from({ length: n }, (_, k) => Q.stat(it.id, role, Date.now() - (n - 1 - k) * step * DAY));
  const R = ser('retail'), Wh = ser('wholesale');
  const head = `<div class="chips">${its.map((x, k) => `<button class="chip ${k === (+ST.i || 0) ? 'on' : ''}" data-act="tab" data-k="i" data-val="${k}">${esc(x.name)}</button>`).join('')}</div><div class="chips">${Object.keys(PER).map(k => `<button class="chip ${k === ST.p ? 'on' : ''}" data-act="tab" data-k="p" data-val="${k}">${PER[k][0]}</button>`).join('')}</div>`;
  const L = [['أعلى سعر تجزئة', '#ba1a1a', R.map(s => s && s.max)], ['متوسط التجزئة', '#0e2b20', R.map(s => s && s.avg)], ['أدنى سعر تجزئة', '#52b788', R.map(s => s && s.min)], ['متوسط الجملة', '#b08d2e', Wh.map(s => s && s.avg)]];
  const V = L.flatMap(l => l[2]).filter(v => v != null), A = L[1][2].filter(v => v != null);
  if (!V.length) return `<div class="card"><h2>تطور سعر المادة</h2><div class="sub">${esc(it.name)}</div>${head}<div class="empty sub">لا أسعار مسجّلة لهذه المادة بعد</div></div>`;
  const mn = Math.min(...V) * .98, mx = Math.max(...V) * 1.02, X = k => 34 + k * (276 / (n - 1)), Y = v => 115 - (v - mn) / (mx - mn || 1) * 95, c = A.length > 1 ? (A[A.length - 1] - A[0]) / A[0] * 100 : 0;
  return `<div class="card"><div class="row"><div><h2>تطور سعر المادة</h2><div class="sub">${esc(it.name)} · ${esc(it.typ)}</div></div>${tag((c >= 0 ? '+' : '') + c.toFixed(1) + '%', c > 0 ? 'a' : '')}</div>${head}
<svg viewBox="0 0 320 140" width="100%" style="background:#f7faf6;border-radius:12px;direction:ltr">${[0, .5, 1].map(f => { const v = mn + (mx - mn) * f, y = Y(v); return `<line x1="34" x2="310" y1="${y}" y2="${y}" stroke="#e1e6df"/><text x="2" y="${y + 3}" font-size="8" fill="#6b7570">${fmt(v)}</text>`; }).join('')}
<text x="34" y="134" font-size="8" fill="#6b7570">${dt(Date.now() - (n - 1) * step * DAY)}</text><text x="310" y="134" font-size="8" fill="#6b7570" text-anchor="end">${dt(Date.now())}</text>
${L.map(l => { const pts = l[2].map((v, k) => v == null ? null : [X(k), Y(v)]).filter(Boolean); return pts.length === 1 ? `<circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="3" fill="${l[1]}"/>` : `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${l[1]}" stroke-width="2"/>`; }).join('')}</svg>
<div class="chips" style="flex-wrap:wrap">${L.map(l => `<span class="sub"><b style="color:${l[1]}">━</b> ${l[0]}</span>`).join('')}</div></div>`;
}

/* ---------- التنقل والعرض ---------- */
const allowed = v => PUB.includes(v) || (ACCESS[v] && ME && ACCESS[v].includes(ME.role));
function go(v, p, tab) {
  if (tab) STACK.length = 0;
  else if (v !== V || JSON.stringify(p || {}) !== JSON.stringify(VP)) { STACK.push([V, VP]); try { history.pushState(null, ''); } catch (e) { } }
  V = v; VP = p || {}; render();
}
function render() {
  if (!ME && !PUB.includes(V)) V = 'login';
  if (!ME && V === 'login' && API.needSetup()) V = 'setup';
  if (ME && !allowed(V)) V = HOME[ME.role];
  m.innerHTML = VIEWS[V](VP);
  m.scrollTop = 0;
  $('sub').textContent = TITLE[V] || '';
  const auth = PUB.includes(V);
  nav.classList.toggle('hide', auth || !ME);
  $('out').classList.toggle('hide', !ME);
  if (ME && !auth) {
    const cur = PARENT[V] || V, pend = isStaff() ? (DB.users.filter(u => u.status === 'pending').length + DB.items.filter(i => i.status === 'pending').length) : 0, nc = isStaff() ? DB.comps.filter(c => c.status === 'new').length : 0;
    nav.innerHTML = NAVS[ME.role].map(([k, l, i]) => `<button class="${k === cur ? 'on' : ''}" data-act="tabnav" data-v="${k}">${ic(i)}${l}${k === 's-merch' ? badge(pend) : k === 's-comps' ? badge(nc) : ''}</button>`).join('');
  }
  afterRender();
}
function afterRender() {
  if (V === 'register') ACT.rtype({ val: ST.rt });
  if (V === 'c-item') { const s = Q.stat(VP.id, 'retail'); if (s && $('im')) initShops(s.L); }
  if (V !== 'register' && V !== 'c-item' && MAP) { MAP.remove(); MAP = null; }
  if ($('q')) $('q').oninput = e => { ST.q = e.target.value; $('lst').innerHTML = VIEWS.pList(); };
  if ($('lpw')) $('lpw').onkeydown = e => { if (e.key === 'Enter') ACT.login(); };
  if ($('ra') && V === 'c-newreq') $('ra').oninput = e => { ST.ra = e.target.value; };
  if ($('rnt')) $('rnt').oninput = e => { ST.rn = e.target.value; };
  if ($('cp')) $('cp').onchange = async e => { const f = e.target.files[0]; ST.photo = ''; $('cpv').innerHTML = ''; if (!f) return; try { ST.photo = await readPhoto(f); $('cpv').innerHTML = `<img class="ph" src="${ST.photo}" alt="">`; } catch (x) { toast(x.message, 'e'); } };
}
function readPhoto(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, 720 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .6)); }; im.onerror = () => rej(new Error('تعذّر قراءة الصورة')); im.src = fr.result; };
    fr.onerror = () => rej(new Error('تعذّر قراءة الصورة')); fr.readAsDataURL(file);
  });
}
const val = id => ($(id) ? $(id).value : '');
const run = async f => { try { await f(); } catch (e) { toast(e.message || 'حدث خطأ', 'e'); } };
const enter = u => { ST.ra = ST.rn = undefined; ST.cart = {}; go(HOME[u.role], {}, true); };

/* ---------- الإجراءات ---------- */
const ACT = {
  go: d => go(d.v, { id: d.id }),
  back: () => STACK.length ? history.back() : go(ME ? HOME[ME.role] : 'login', {}, true),
  tabnav: d => go(d.v, {}, true),
  tab: d => { ST[d.k] = d.val; render(); },
  rtype: d => {
    ST.rt = d.val;
    document.querySelectorAll('.seg [data-act="rtype"]').forEach(b => b.classList.toggle('on', b.dataset.val === ST.rt));
    $('rc').classList.toggle('hide', ST.rt !== 'citizen'); $('rm').classList.toggle('hide', ST.rt === 'citizen');
    if (V === 'register' && ST.rt !== 'citizen') setTimeout(initPick, 30);
    $('rnote').textContent = ST.rt === 'citizen' ? 'حساب المواطن يُفعَّل مباشرة بعد التسجيل.' : 'حساب التاجر يُراجَع من الرقابة التموينية، ويُفعَّل بعد الموافقة عليه.';
  },
  async setup() {
    if (val('suw') !== val('suw2')) throw new Error('كلمتا المرور غير متطابقتين');
    await API.setupAdmin({ name: val('sun'), phone: val('sup'), pw: val('suw') });
    await API.login(val('sup'), val('suw')); toast('تم إنشاء حساب المدير', 'ok'); enter(ME);
  },
  async login() { const u = await API.login(val('lph'), val('lpw')); enter(u); },
  async register() {
    if (val('rpw') !== val('rpw2')) throw new Error('كلمتا المرور غير متطابقتين');
    const u = await API.register({ type: ST.rt, name: val('rn'), phone: val('rph'), pw: val('rpw'), area: val('ra'), bn: val('rb'), reg: val('rg'), addr: val('rd'), loc: ST.loc });
    ST.loc = null;
    if (u.status === 'pending') { toast('تم إرسال طلبك للرقابة التموينية. سيُفعَّل الحساب بعد الموافقة.', 'ok'); go('login', {}, true); }
    else { await API.login(val('rph'), val('rpw')); toast('تم إنشاء الحساب', 'ok'); enter(ME); }
  },
  logout: () => { API.logout(); ST.cart = {}; go('login', {}, true); },
  async chpw() { await API.changePw(val('o1'), val('o2')); $('o1').value = $('o2').value = ''; toast('تم تغيير كلمة المرور', 'ok'); },
  scan: () => scan(),

  /* مواطن */
  cartadd: d => { ST.cart[d.id] = (ST.cart[d.id] || 0) + 1; toast('أُضيفت للقائمة (' + Object.keys(ST.cart).length + ')', 'ok'); },
  cartsel: () => { const id = val('cs'); if (!id) { toast('لا توجد مواد', 'e'); return; } ST.cart[id] = (ST.cart[id] || 0) + 1; render(); },
  qp: d => { ST.cart[d.id] = Math.min(99, (ST.cart[d.id] || 0) + 1); render(); },
  qm: d => { if ((ST.cart[d.id] || 0) <= 1) delete ST.cart[d.id]; else ST.cart[d.id]--; render(); },
  async sendreq() {
    const lines = Object.keys(ST.cart).filter(id => Q.item(id)).map(id => ({ item: id, qty: ST.cart[id] }));
    await API.createReq({ lines, area: val('ra'), note: val('rnt') });
    ST.cart = {}; ST.ra = ST.rn = undefined; toast('تم إرسال طلبك للتجار', 'ok'); go('c-reqs', {}, true);
  },
  cancelreq: d => ask('إلغاء هذا الطلب؟', () => run(async () => { await API.cancelReq(d.id); toast('تم إلغاء الطلب', 'ok'); render(); })),
  accept: d => ask('قبول هذا العرض؟ سيظهر رقم هاتفك للتاجر ويُغلق الطلب.', () => run(async () => { await API.acceptQuote(d.id); toast('تم قبول العرض', 'ok'); render(); })),
  async sendcomp() {
    await API.fileComp({ mid: val('cm'), type: val('ct'), item: val('ci'), desc: val('cd'), photo: ST.photo });
    ST.photo = ''; toast('تم إرسال الشكوى للرقابة التموينية', 'ok'); go('c-comps', {}, true);
  },

  /* تجار */
  async saveprice() {
    await API.setPrice({ item: val('ri'), min: val('pmin'), max: val('pmax') });
    toast('تم حفظ السعر', 'ok'); render();
  },
  editprice: d => { $('ri').value = d.id; $('pmin').value = d.min; $('pmax').value = d.max; $('ri').scrollIntoView({ behavior: 'smooth', block: 'center' }); $('pmin').focus(); },
  async reqitem() { await API.requestItem({ name: val('nn'), cat: val('nc'), typ: val('nt'), unit: val('nu'), bc: val('nb') }); toast('أُرسل الطلب للرقابة التموينية', 'ok'); go('m-prices', {}, true); },
  async sendquote(d) {
    const lines = [...document.querySelectorAll('[data-line]')].map(el => ({ item: el.dataset.line, price: el.querySelector('.lp').value, avail: el.querySelector('.la').checked }));
    await API.quote({ req: d.id, lines, delivery: $('qd').checked, note: val('qn') }); toast('تم إرسال العرض', 'ok'); render();
  },

  /* رقابة */
  approve: d => ask('اعتماد هذا الحساب؟', () => run(async () => { await API.approve(d.id); toast('تم الاعتماد', 'ok'); render(); })),
  reject: d => ask('سبب الرفض (يظهر للتاجر):', v => run(async () => { await API.reject(d.id, v.trim()); toast('تم الرفض', 'ok'); render(); }), { input: 1, req: 1 }),
  getloc: () => {
    if (!navigator.geolocation) return toast('الجهاز لا يدعم تحديد الموقع', 'e');
    $('rlt').textContent = 'جارٍ تحديد الموقع...';
    navigator.geolocation.getCurrentPosition(p => {
      if (MAP) setPin(L.latLng(p.coords.latitude, p.coords.longitude), true);
      else { ST.loc = { lat: p.coords.latitude, lng: p.coords.longitude }; $('rlt').textContent = 'تم تحديد الموقع ✓'; }
    }, () => { $('rlt').textContent = 'تعذّر التحديد، فعّل الموقع أو اضغط على الخريطة'; }, { enableHighAccuracy: true, timeout: 15000 });
  },
  rmprice: d => ask('حذف هذه المادة من قائمتك؟ يبقى سجل أسعارها السابق للرقابة.', () => run(async () => { await API.removeMine(d.id); toast('تم الحذف', 'ok'); render(); })),
  suspend: d => ask('إيقاف هذا الحساب؟ ستختفي أسعاره من الدليل.', () => run(async () => { await API.setStatus(d.id, 'suspended'); toast('تم الإيقاف', 'ok'); render(); })),
  reactivate: d => run(async () => { await API.setStatus(d.id, 'active'); toast('تمت إعادة التفعيل', 'ok'); render(); }),
  async additem() { await API.addItem({ name: val('an'), cat: val('ac'), typ: val('at'), unit: val('au'), bc: val('ab') }); toast('تمت إضافة المادة', 'ok'); render(); },
  itemok: d => run(async () => { await API.reviewItem(d.id, true); toast('تم اعتماد المادة', 'ok'); render(); }),
  itemno: d => ask('سبب الرفض:', v => run(async () => { await API.reviewItem(d.id, false, v.trim()); toast('تم الرفض', 'ok'); render(); }), { input: 1, req: 1 }),
  cstat: d => d.s === 'closed' ? ask('ملاحظة الإغلاق (تظهر للمواطن):', v => run(async () => { await API.updateComp(d.id, 'closed', v.trim()); toast('تم إغلاق الشكوى', 'ok'); render(); }), { input: 1, req: 1 }) : run(async () => { await API.updateComp(d.id, d.s, ''); render(); }),
  async addstaff() { await API.addStaff({ name: val('fn'), phone: val('fp'), pw: val('fw') }); toast('تمت إضافة المفتش', 'ok'); render(); },
  resetdata: () => ask('أدخل كلمة مرورك لتأكيد مسح كل بيانات التجربة:', v => run(async () => { await API.resetData(v); toast('تم المسح', 'ok'); render(); }), { input: 1, req: 1, ph: 'كلمة المرور' })
};
const dispatch = e => { const t = e.target.closest('[data-act]'); if (!t) return; const f = ACT[t.dataset.act]; if (f) run(() => f(t.dataset, t)); };
m.addEventListener('click', dispatch);
nav.addEventListener('click', dispatch);
window.addEventListener('popstate', () => { const s = STACK.pop(); if (s) { V = s[0]; VP = s[1]; render(); } });

/* ---------- الخرائط (Leaflet + OpenStreetMap) ---------- */
const LAT = [35.5317, 35.7919];
let MAP = null, PIN = null;
function mapBase(id, c, z) {
  if (MAP) { MAP.remove(); MAP = null; }
  const el = $(id); if (!el) return null;
  if (typeof L === 'undefined') { el.innerHTML = '<div class="hint" style="padding:18px;text-align:center;direction:rtl">الخريطة تحتاج اتصالاً بالإنترنت</div>'; return null; }
  MAP = L.map(el).setView(c, z);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(MAP);
  return MAP;
}
function setPin(ll, fly) {
  ST.loc = { lat: ll.lat, lng: ll.lng };
  if (!MAP) return;
  if (PIN) PIN.setLatLng(ll); else { PIN = L.marker(ll, { draggable: true }).addTo(MAP); PIN.on('dragend', () => setPin(PIN.getLatLng())); }
  if (fly) MAP.setView(ll, 16);
  const h = $('rlt'); if (h) h.textContent = 'تم تحديد الموقع ✓';
}
function initPick() {
  PIN = null;
  const mp = mapBase('pm', ST.loc ? [ST.loc.lat, ST.loc.lng] : LAT, ST.loc ? 16 : 12); if (!mp) return;
  mp.on('click', e => setPin(e.latlng));
  if (ST.loc) setPin(L.latLng(ST.loc.lat, ST.loc.lng));
  setTimeout(() => mp.invalidateSize(), 80);
}
function initShops(list) {
  const mp = mapBase('im', LAT, 12); if (!mp) return;
  const pts = [];
  list.forEach(x => {
    const u = Q.user(x.mid); if (!u || !u.biz || !u.biz.loc) return;
    const ll = [u.biz.loc.lat, u.biz.loc.lng]; pts.push(ll);
    L.marker(ll).addTo(mp).bindPopup('<b>' + esc(dname(u)) + '</b><br>' + esc(ROLEN[u.role]) + '<br>' + fmt(x.min) + ' – ' + fmt(x.max) + ' ل.س<br>' + esc(u.biz.addr) + '<br>آخر تحديث ' + dt(x.t));
  });
  if (pts.length) mp.fitBounds(pts, { padding: [30, 30], maxZoom: 16 });
  setTimeout(() => mp.invalidateSize(), 80);
}

/* ---------- الباركود ---------- */
const scan = async () => {
  const ov = $('ov'), v = $('vid'), msg = $('smsg'); ov.classList.remove('hide'); let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); v.srcObject = stream; await v.play(); }
  catch (e) { msg.textContent = 'تعذّر فتح الكاميرا. اسمح بالوصول للكاميرا، أو اكتب رقم الباركود.'; return; }
  window._stop = () => stream.getTracks().forEach(t => t.stop());
  if (!('BarcodeDetector' in window)) { msg.textContent = 'الجهاز لا يقرأ الباركود تلقائياً. اكتب الرقم يدوياً.'; return; }
  const det = new BarcodeDetector(); msg.textContent = 'وجّه الكاميرا نحو الباركود...';
  const tick = async () => { if (ov.classList.contains('hide')) return; try { const r = await det.detect(v); if (r.length) { found(r[0].rawValue); return; } } catch (e) { } setTimeout(tick, 300); };
  tick();
};
function closeScan() { $('ov').classList.add('hide'); if (window._stop) { window._stop(); window._stop = null; } }
function found(c) {
  c = toEn(c).trim(); if (!c) return; closeScan(); ST.q = c; go('c-prices', {}, true);
  if (!DB.items.some(x => x.bc === c)) toast('هذا الباركود غير مسجّل في الدليل', 'e');
}

/* ---------- الإقلاع ---------- */
$('out').innerHTML = ic('user');
$('out').onclick = () => go('acct', {}, true);
$('spi').src = document.querySelector('header img').src;
$('ent').onclick = () => $('sp').classList.add('gone');
$('fi').innerHTML = ic('phone', 18);
(function boot() {
  try {
    const sid = localStorage.getItem(SK), u = sid && DB.users.find(x => x.id === sid && x.status === 'active');
    if (u) { ME = u; V = HOME[u.role]; }
  } catch (e) { }
  render();
})();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
