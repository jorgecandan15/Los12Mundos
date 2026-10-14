/* =========================================================
   LOS 12 MUNDOS · interacción
   ========================================================= */
(() => {
  "use strict";

  const CONFIG = window.L12M_CONFIG;
  const CATS = window.L12M_CATEGORIES;
  const PRODUCTS = window.L12M_PRODUCTS;
  const catById = Object.fromEntries(CATS.map((c) => [c.id, c]));
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: CONFIG.currency });
  const money = (n) => fmt.format(n);
  const img = (id) => `assets/img/productos/${id}.webp`;
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Curso escolar: septiembre → julio
  const SCHOOL_MONTHS = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
  const MONTHS = {
    1: { name: "Enero", short: "Ene", emoji: "☃️" },
    2: { name: "Febrero", short: "Feb", emoji: "🎭" },
    3: { name: "Marzo", short: "Mar", emoji: "🌸" },
    4: { name: "Abril", short: "Abr", emoji: "💃" },
    5: { name: "Mayo", short: "May", emoji: "🌹" },
    6: { name: "Junio", short: "Jun", emoji: "☀️" },
    7: { name: "Julio", short: "Jul", emoji: "🏖️" },
    8: { name: "Agosto", short: "Ago", emoji: "🌊" },
    9: { name: "Septiembre", short: "Sep", emoji: "🎒" },
    10: { name: "Octubre", short: "Oct", emoji: "🎃" },
    11: { name: "Noviembre", short: "Nov", emoji: "🍂" },
    12: { name: "Diciembre", short: "Dic", emoji: "🎄" },
  };
  const courseIndex = (p) => (p.months.length ? Math.min(...p.months.map((m) => SCHOOL_MONTHS.indexOf(m))) : 99);
  const fitsMonth = (p, m) => !p.months.length || p.months.includes(m);

  /* ---------------- storage seguro ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } },
  };

  /* ---------------- loader ---------------- */
  function runLoader() {
    const loader = $("#loader");
    const bar = $("#loaderBar");
    const critical = $$("img").filter((i) => !i.loading || i.loading === "eager").slice(0, 8);
    let done = 0;
    const total = critical.length || 1;
    const step = () => { done++; bar.style.width = `${Math.min(100, (done / total) * 100)}%`; };
    const waits = critical.map((i) => (i.complete ? (step(), Promise.resolve()) : new Promise((r) => { i.addEventListener("load", () => { step(); r(); }, { once: true }); i.addEventListener("error", () => { step(); r(); }, { once: true }); })));
    const minTime = new Promise((r) => setTimeout(r, reduceMotion ? 0 : 1100));
    const maxTime = new Promise((r) => setTimeout(r, 4000));
    Promise.race([Promise.all([...waits, minTime, document.fonts ? document.fonts.ready : null]), maxTime]).then(() => {
      bar.style.width = "100%";
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.classList.remove("is-loading");
        initReveal();
        countUp();
      }, 250);
    });
  }

  /* ---------------- reveal on scroll ---------------- */
  function initReveal() {
    const els = $$(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const siblings = $$(".reveal", en.target.parentElement);
        const delay = Math.max(0, siblings.indexOf(en.target)) * 80;
        en.target.style.transitionDelay = `${Math.min(delay, 400)}ms`;
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));
  }

  function countUp() {
    $$("[data-count]").forEach((el) => {
      const target = +el.dataset.count;
      if (reduceMotion) return;
      const t0 = performance.now();
      const dur = 1200;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------------- header / nav ---------------- */
  function initHeader() {
    const header = $("#header");
    const toTop = $("#toTop");
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 20);
      toTop.classList.toggle("is-show", y > 900);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

    const burger = $("#burger");
    const nav = $("#nav");
    const setMenu = (open) => {
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      nav.classList.toggle("is-open", open);
    };
    burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

    // enlace activo según la sección visible
    const links = $$(".nav a[href^='#']");
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach((s) => io.observe(s));
    }
  }

  /* ---------------- marquee ---------------- */
  function initMarquee() {
    const items = PRODUCTS.map((p) => `<span class="marquee__item">${catById[p.category].emoji} ${esc(p.name.replace(/^Caja /, ""))}</span>`).join("");
    $("#marquee").innerHTML = items + items;
  }

  /* ---------------- catálogo ---------------- */
  const state = { cat: "all", month: 0, q: "", sort: "curso" };

  function initFilters() {
    const chips = $("#categoryChips");
    const all = [{ id: "all", label: "Todas", emoji: "🌍", color: "#3a2e5c" }, ...CATS];
    chips.innerHTML = all.map((c) => {
      const n = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length;
      return `<button class="chip" style="--c:${c.color}" data-cat="${c.id}" aria-pressed="${c.id === "all"}">${c.emoji} ${esc(c.label)} <span class="chip__n">${n}</span></button>`;
    }).join("");
    chips.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", c === b));
      renderGrid();
    });

    const ms = $("#monthSelect");
    ms.innerHTML = `<option value="0">📅 Todo el curso</option>` + SCHOOL_MONTHS.map((m) => `<option value="${m}">${MONTHS[m].emoji} ${MONTHS[m].name}</option>`).join("");
    ms.addEventListener("change", () => { state.month = +ms.value; renderGrid(); syncMonthTabs(state.month); });

    let t;
    $("#search").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim(); renderGrid(); }, 160); });
    $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
    $("#resetFilters").addEventListener("click", resetFilters);
  }

  function resetFilters() {
    Object.assign(state, { cat: "all", month: 0, q: "", sort: state.sort });
    $("#search").value = "";
    $("#monthSelect").value = "0";
    $$("#categoryChips .chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.cat === "all"));
    renderGrid();
  }

  function filtered() {
    const q = norm(state.q);
    let list = PRODUCTS.filter((p) =>
      (state.cat === "all" || p.category === state.cat) &&
      (!state.month || fitsMonth(p, state.month)) &&
      (!q || norm(`${p.name} ${p.short} ${p.description} ${p.contents.join(" ")} ${catById[p.category].label}`).includes(q))
    );
    const sorters = {
      curso: (a, b) => courseIndex(a) - courseIndex(b),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name, "es"),
    };
    return list.sort(sorters[state.sort]);
  }

  const monthTags = (p) => (p.months.length ? p.months.map((m) => `<span class="tag">${MONTHS[m].short}</span>`).join("") : `<span class="tag">Todo el curso</span>`);

  function cardHTML(p, i) {
    const c = catById[p.category];
    const badge = p.badge ? `<span class="badge ${/novedad/i.test(p.badge) ? "badge--novedad" : ""}">${esc(p.badge)}</span>` : "";
    return `
      <article class="card-p" style="--c:${c.color};--i:${i}" data-id="${p.id}">
        ${badge}
        <button class="card-p__media skeleton" data-open="${p.id}" aria-label="Ver contenido de ${esc(p.name)}">
          <img src="${img(p.id)}" alt="${esc(p.name)}" loading="lazy" decoding="async" width="547" height="456" />
          <span class="card-p__quick">Ver qué incluye 👀</span>
        </button>
        <div class="card-p__body">
          <span class="card-p__cat">${c.emoji} <span class="lbl-long">${esc(c.label)}</span><span class="lbl-short">${esc(c.short || c.label)}</span></span>
          <h3 class="card-p__title">${esc(p.name)}</h3>
          <p class="card-p__desc">${esc(p.short)}</p>
          <div class="card-p__months">${monthTags(p)}</div>
          <div class="card-p__foot">
            <span class="price">${money(p.price)}</span>
            <button class="add-btn" data-add="${p.id}"><span aria-hidden="true">＋</span> Añadir</button>
          </div>
        </div>
      </article>`;
  }

  function hydrateImages(ctx) {
    $$("img", ctx).forEach((im) => {
      const done = () => { im.classList.add("is-loaded"); im.parentElement.classList.remove("skeleton"); };
      if (im.complete && im.naturalWidth) done();
      else { im.addEventListener("load", done, { once: true }); im.addEventListener("error", done, { once: true }); }
    });
  }

  function renderGrid() {
    const list = filtered();
    const grid = $("#grid");
    grid.innerHTML = list.map(cardHTML).join("");
    hydrateImages(grid);
    $("#empty").hidden = list.length > 0;
    const monthTxt = state.month ? ` para ${MONTHS[state.month].name.toLowerCase()}` : "";
    $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "caja" : "cajas"}${monthTxt}`;
  }

  /* ---------------- calendario ---------------- */
  function currentSchoolMonth() {
    const m = new Date().getMonth() + 1;
    return m === 8 ? 9 : m;
  }

  function initCalendar() {
    const wrap = $("#months");
    wrap.innerHTML = SCHOOL_MONTHS.map((m) => {
      const n = PRODUCTS.filter((p) => p.months.includes(m)).length;
      return `<button class="month" role="tab" data-month="${m}" aria-selected="false" aria-controls="monthPreview">
        <span class="month__emoji" aria-hidden="true">${MONTHS[m].emoji}</span>
        <span class="month__name">${MONTHS[m].short}</span>
        <span class="month__count">${n} ${n === 1 ? "caja" : "cajas"}</span>
      </button>`;
    }).join("");
    wrap.addEventListener("click", (e) => {
      const b = e.target.closest(".month");
      if (b) selectMonth(+b.dataset.month, true);
    });
    selectMonth(currentSchoolMonth(), false);
  }

  function syncMonthTabs(m) {
    $$("#months .month").forEach((b) => b.setAttribute("aria-selected", +b.dataset.month === m));
  }

  function selectMonth(m, userAction) {
    syncMonthTabs(m);
    const btn = $(`#months .month[data-month="${m}"]`);
    if (userAction && btn) btn.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
    const specific = PRODUCTS.filter((p) => p.months.includes(m)).sort((a, b) => a.months.length - b.months.length);
    const isNow = m === currentSchoolMonth();
    $("#monthPreview").innerHTML = `
      <div class="month-preview__intro">
        <span class="eyebrow">${isNow ? "Este mes" : "Mes del curso"}</span>
        <h3>${MONTHS[m].emoji} ${MONTHS[m].name}</h3>
        <p>${specific.length} ${specific.length === 1 ? "caja especial" : "cajas especiales"} + ${PRODUCTS.filter((p) => !p.months.length).length} proyectos para cualquier momento.</p>
        <button class="btn btn--primary btn--sm" data-month-catalog="${m}">Ver en el catálogo →</button>
      </div>
      <div class="month-preview__list">
        ${specific.map((p, i) => `
          <button class="mini" data-open="${p.id}" style="animation-delay:${i * 60}ms">
            <img src="${img(p.id)}" alt="" loading="lazy" width="547" height="456" />
            <strong>${esc(p.name.replace(/^Caja /, ""))}</strong>
            <span>${money(p.price)}</span>
          </button>`).join("")}
      </div>`;
  }

  /* ---------------- modal ---------------- */
  let modalId = null;
  let lastFocus = null;
  let modalQty = 1;

  function openModal(id) {
    const p = byId[id];
    if (!p) return;
    const wasOpen = !$("#modal").hidden;
    modalId = id;
    modalQty = 1;
    const c = catById[p.category];
    const list = filtered().length ? filtered() : PRODUCTS;
    const idx = list.findIndex((x) => x.id === id);
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    $("#modalBody").innerHTML = `
      <div class="modal__media" style="--c:${c.color}">
        <img src="${img(p.id)}" alt="${esc(p.name)}" width="547" height="456" />
      </div>
      <div class="modal__info">
        <span class="card-p__cat" style="--c:${c.color}">${c.emoji} ${esc(c.label)}</span>
        <h2 id="modalTitle">${esc(p.name)}</h2>
        <p>${esc(p.description)}</p>
        <div class="card-p__months">${monthTags(p)}</div>
        <h4>¿Qué incluye?</h4>
        <ul class="contents">${p.contents.map((x, i) => `<li style="animation-delay:${80 + i * 40}ms">${esc(x)}</li>`).join("")}</ul>
        <div class="modal__buy">
          <span class="price">${money(p.price)}<small>/caja</small></span>
          <div class="qty" aria-label="Cantidad">
            <button type="button" data-mqty="-1" aria-label="Quitar una">−</button>
            <output id="mQty">1</output>
            <button type="button" data-mqty="1" aria-label="Añadir una">+</button>
          </div>
          <button class="add-btn" style="--c:${c.color}" data-add="${p.id}" data-from-modal>Añadir al pedido</button>
        </div>
        ${list.length > 1 ? `<div class="modal__nav">
          <button type="button" data-open="${prev.id}">← ${esc(prev.name.replace(/^Caja /, ""))}</button>
          <button type="button" data-open="${next.id}">${esc(next.name.replace(/^Caja /, ""))} →</button>
        </div>` : ""}
      </div>`;
    const modal = $("#modal");
    if (!wasOpen) {
      lastFocus = document.activeElement;
      modal.hidden = false;
      modal.classList.remove("is-closing");
      document.body.classList.add("lock");
    } else {
      $(".modal__panel").scrollTop = 0;
    }
    $(".modal__close").focus({ preventScroll: true });
  }

  function closeModal() {
    const modal = $("#modal");
    if (modal.hidden) return;
    modal.classList.add("is-closing");
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove("is-closing");
      if (!$("#drawer").classList.contains("is-open")) document.body.classList.remove("lock");
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 230);
    modalId = null;
  }

  function trapFocus(e, root) {
    if (e.key !== "Tab") return;
    const f = $$("button, a[href], input, select, textarea", root).filter((el) => !el.disabled && el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------- pedido (carrito) ---------------- */
  let cart = store.get("l12m-cart", {});
  // limpiar productos que ya no existen
  cart = Object.fromEntries(Object.entries(cart).filter(([id, q]) => byId[id] && q > 0));

  const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
  function totals() {
    const subtotal = Object.entries(cart).reduce((s, [id, q]) => s + byId[id].price * q, 0);
    const { minBoxes, percent } = CONFIG.bulkDiscount || {};
    const discount = percent && cartCount() >= minBoxes ? Math.round(subtotal * percent) / 100 : 0;
    return { subtotal, discount, total: subtotal - discount };
  }

  function addToCart(id, qty = 1, sourceEl) {
    cart[id] = (cart[id] || 0) + qty;
    saveCart();
    renderCart();
    flyToCart(sourceEl);
    const btn = $("#cartBtn");
    btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
    toast(`${qty > 1 ? qty + " × " : ""}${byId[id].name} añadida 🎉`, "Ver pedido", openDrawer);
  }
  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = q;
    saveCart();
    renderCart();
  }
  const saveCart = () => store.set("l12m-cart", cart);

  function renderCart() {
    const n = cartCount();
    const countEl = $("#cartCount");
    countEl.textContent = n;
    countEl.classList.toggle("has-items", n > 0);
    $("#cartBtn").setAttribute("aria-label", `Abrir mi pedido (${n} ${n === 1 ? "caja" : "cajas"})`);

    const entries = Object.entries(cart);
    $("#cartItems").innerHTML = entries.map(([id, q]) => {
      const p = byId[id];
      return `<div class="cart-item">
        <img src="${img(id)}" alt="" />
        <div>
          <h5>${esc(p.name)}</h5>
          <span class="unit">${money(p.price)} / caja</span>
        </div>
        <div class="cart-item__right">
          <strong>${money(p.price * q)}</strong>
          <div class="qty">
            <button type="button" data-qty="${id}" data-d="-1" aria-label="Quitar una ${esc(p.name)}">−</button>
            <span>${q}</span>
            <button type="button" data-qty="${id}" data-d="1" aria-label="Añadir una ${esc(p.name)}">+</button>
          </div>
          <button type="button" class="remove" data-remove="${id}">Eliminar</button>
        </div>
      </div>`;
    }).join("");
    $("#cartEmpty").hidden = entries.length > 0;
    $("#cartFoot").hidden = entries.length === 0;

    const t = totals();
    $("#subtotal").textContent = money(t.subtotal);
    $("#total").textContent = money(t.total);
    $("#discountRow").hidden = !t.discount;
    $("#discount").textContent = `−${money(t.discount)}`;
    $("#discountLabel").textContent = `Descuento ${CONFIG.bulkDiscount.percent}%`;

    const free = CONFIG.freeShippingFrom;
    const { minBoxes, percent } = CONFIG.bulkDiscount;
    const msgs = [];
    if (percent && n < minBoxes) msgs.push(`Añade ${minBoxes - n} ${minBoxes - n === 1 ? "caja" : "cajas"} más y ahorra un <strong>${percent}%</strong> 🎁`);
    if (free) {
      const left = free - t.total;
      msgs.push(left > 0 ? `Te faltan <strong>${money(left)}</strong> para el envío gratis 🚚` : `¡Tienes <strong>envío gratis</strong>! 🎉`);
      $("#shipBar").style.width = `${Math.min(100, (t.total / free) * 100)}%`;
    }
    $("#shipText").innerHTML = msgs.join("<br />");
    $("#shipProgress").hidden = !msgs.length;
    $("#shipBar").parentElement.hidden = !free;
  }

  function openDrawer() {
    closeModal();
    const d = $("#drawer");
    d.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    lastFocus = document.activeElement;
    setTimeout(() => $(".drawer__head .icon-btn").focus({ preventScroll: true }), 50);
  }
  function closeDrawer() {
    const d = $("#drawer");
    if (!d.classList.contains("is-open")) return;
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
    if ($("#modal").hidden) document.body.classList.remove("lock");
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function flyToCart(sourceEl) {
    if (reduceMotion || !sourceEl) return;
    const card = sourceEl.closest(".card-p, .modal__panel");
    const im = card && $("img", card);
    const target = $("#cartBtn").getBoundingClientRect();
    if (!im) return;
    const r = im.getBoundingClientRect();
    const fly = document.createElement("img");
    fly.src = im.src;
    fly.className = "fly";
    fly.style.left = `${r.left + r.width / 2 - 35}px`;
    fly.style.top = `${r.top + r.height / 2 - 30}px`;
    document.body.appendChild(fly);
    requestAnimationFrame(() => {
      const dx = target.left + target.width / 2 - (r.left + r.width / 2);
      const dy = target.top + target.height / 2 - (r.top + r.height / 2);
      fly.style.transform = `translate(${dx}px, ${dy}px) scale(0.2) rotate(20deg)`;
      fly.style.opacity = "0.3";
    });
    setTimeout(() => fly.remove(), 850);
  }

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg, actionLabel, action) {
    const el = $("#toast");
    el.innerHTML = `<span>${esc(msg)}</span>${actionLabel ? `<button type="button">${esc(actionLabel)}</button>` : ""}`;
    if (actionLabel) $("button", el).addEventListener("click", () => { el.classList.remove("is-show"); action(); });
    el.classList.add("is-show");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("is-show"), 3200);
  }

  /* ---------------- formularios ---------------- */
  function validate(form) {
    let ok = true;
    $$("[required]", form).forEach((el) => {
      const valid = el.value.trim() && (el.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      el.classList.toggle("is-invalid", !valid);
      el.setAttribute("aria-invalid", !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    });
    if (!ok) toast("Revisa los campos marcados, por favor ✏️");
    return ok;
  }

  function send(channel, subject, body) {
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    } else {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  function initForms() {
    const orderForm = $("#orderForm");
    let channel = "whatsapp";
    $$("button[data-channel]", orderForm).forEach((b) => b.addEventListener("click", () => { channel = b.dataset.channel; }));
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!cartCount()) return;
      if (!validate(orderForm)) return;
      const f = Object.fromEntries(new FormData(orderForm));
      const t = totals();
      const lines = Object.entries(cart).map(([id, q]) => `• ${q} × ${byId[id].name} (${money(byId[id].price)}) = ${money(byId[id].price * q)}`);
      const body = [
        "¡Hola, Los 12 Mundos! 👋 Me gustaría hacer este pedido:",
        "",
        ...lines,
        "",
        `Subtotal: ${money(t.subtotal)}`,
        t.discount ? `Descuento ${CONFIG.bulkDiscount.percent}%: −${money(t.discount)}` : null,
        `Total: ${money(t.total)}`,
        "",
        `Escuela: ${f.escuela}`,
        `Contacto: ${f.nombre}`,
        f.telefono ? `Teléfono: ${f.telefono}` : null,
        `Email: ${f.email}`,
        f.poblacion ? `Población: ${f.poblacion}` : null,
      ].filter((x) => x !== null).join("\n");
      store.set("l12m-contact", { escuela: f.escuela, nombre: f.nombre, telefono: f.telefono, email: f.email, poblacion: f.poblacion });
      send(channel, `Pedido · ${f.escuela}`, body);
      toast("¡Gracias! Abriendo tu pedido para enviarlo 💌");
    });

    const customForm = $("#customForm");
    customForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(customForm)) return;
      const f = Object.fromEntries(new FormData(customForm));
      const body = [
        "¡Hola, Los 12 Mundos! Me gustaría una caja personalizada ✨",
        "",
        `Escuela: ${f.escuela}`,
        `Contacto: ${f.nombre}`,
        `Email: ${f.email}`,
        f.ninos ? `Nº de niños: ${f.ninos}` : null,
        "",
        `Idea: ${f.idea}`,
      ].filter((x) => x !== null).join("\n");
      send("email", `Caja personalizada · ${f.escuela}`, body);
      toast("¡Genial! Abriendo tu email para enviarnos la idea 💌");
    });

    // recordar datos de contacto
    const saved = store.get("l12m-contact", null);
    if (saved) [orderForm, customForm].forEach((form) => Object.entries(saved).forEach(([k, v]) => { const el = form.elements[k]; if (el && v && !el.value) el.value = v; }));
    $$("input, textarea", document).forEach((el) => el.addEventListener("input", () => el.classList.remove("is-invalid")));
  }

  /* ---------------- contacto / footer ---------------- */
  function initContact() {
    const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("¡Hola, Los 12 Mundos! Me gustaría información sobre vuestras cajas 😊")}`;
    $("#contactWhatsapp").href = wa;
    $("#contactEmail").href = `mailto:${CONFIG.email}`;
    $("#footerEmail").href = `mailto:${CONFIG.email}`;
    $("#footerEmail").textContent = CONFIG.email;
    $("#footerPhone").href = wa;
    $("#footerPhone").textContent = `WhatsApp ${CONFIG.phoneLabel}`;
    $("#footerInsta").href = CONFIG.instagram;
    $("#footerCats").innerHTML = CATS.map((c) => `<a href="#catalogo" data-footer-cat="${c.id}">${c.emoji} ${esc(c.label)}</a>`).join("");
    $("#year").textContent = new Date().getFullYear();
    const { minBoxes, percent } = CONFIG.bulkDiscount;
    if (percent) {
      $("#bulkNote").textContent = ` · ${percent}% de descuento a partir de ${minBoxes} cajas.`;
      $("#faqDiscount").textContent = `Sí. A partir de ${minBoxes} cajas en el mismo pedido se aplica automáticamente un ${percent}% de descuento. Si quieres planificar el curso entero, pídenos un presupuesto especial.`;
    }
  }

  /* ---------------- delegación global ---------------- */
  function initEvents() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      const open = t.closest("[data-open]");
      if (open) { openModal(open.dataset.open); return; }
      const add = t.closest("[data-add]");
      if (add) {
        const qty = add.hasAttribute("data-from-modal") ? modalQty : 1;
        addToCart(add.dataset.add, qty, add);
        if (!add.hasAttribute("data-from-modal")) {
          add.classList.add("is-added");
          add.innerHTML = "✓ Añadida";
          setTimeout(() => { add.classList.remove("is-added"); add.innerHTML = '<span aria-hidden="true">＋</span> Añadir'; }, 1400);
        }
        return;
      }
      const mq = t.closest("[data-mqty]");
      if (mq) { modalQty = Math.max(1, Math.min(99, modalQty + +mq.dataset.mqty)); $("#mQty").textContent = modalQty; return; }
      const q = t.closest("[data-qty]");
      if (q) { setQty(q.dataset.qty, (cart[q.dataset.qty] || 0) + +q.dataset.d); return; }
      const rm = t.closest("[data-remove]");
      if (rm) { setQty(rm.dataset.remove, 0); return; }
      if (t.closest("[data-close]")) { closeModal(); return; }
      if (t.closest("[data-close-drawer]")) { closeDrawer(); return; }
      const mc = t.closest("[data-month-catalog]");
      if (mc) {
        const m = +mc.dataset.monthCatalog;
        state.month = m;
        $("#monthSelect").value = String(m);
        renderGrid();
        $("#catalogo").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }
      const fc = t.closest("[data-footer-cat]");
      if (fc) { const chip = $(`#categoryChips .chip[data-cat="${fc.dataset.footerCat}"]`); if (chip) chip.click(); }
    });
    $("#cartBtn").addEventListener("click", openDrawer);
    document.addEventListener("keydown", (e) => {
      if (!$("#modal").hidden) {
        if (e.key === "Escape") closeModal();
        else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          const nav = $$(".modal__nav button");
          if (nav.length === 2 && !e.target.closest("input, textarea")) nav[e.key === "ArrowRight" ? 1 : 0].click();
        } else trapFocus(e, $(".modal__panel"));
      } else if ($("#drawer").classList.contains("is-open")) {
        if (e.key === "Escape") closeDrawer();
        else trapFocus(e, $(".drawer__panel"));
      }
    });
  }

  /* ---------------- init ---------------- */
  initHeader();
  initMarquee();
  initFilters();
  renderGrid();
  initCalendar();
  initEvents();
  initForms();
  initContact();
  renderCart();
  runLoader();
})();
