(function () {
  "use strict";
  const D = window.BOXFIT;
  const DAGER = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const sportById = Object.fromEntries(D.sporter.map((s) => [s.id, s]));
  const kr = (n) => n.toLocaleString("nb-NO") + " kr";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const idag = ((new Date().getDay() + 6) % 7) + 1; // 1 = mandag

  /* ---------- Meny ---------- */
  const menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$("#nav a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Neste time (hero) ---------- */
  (function () {
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    let best = null;
    for (let offset = 0; offset < 8 && !best; offset++) {
      const dag = ((idag - 1 + offset) % 7) + 1;
      const slots = D.timeplan.filter((t) => t.dag === dag).sort((a, b) => a.tid.localeCompare(b.tid));
      for (const t of slots) {
        const [h, m] = t.tid.split("–")[0].split(":").map(Number);
        if (offset > 0 || h * 60 + m > mins) { best = { ...t, offset }; break; }
      }
    }
    if (!best) return;
    const s = sportById[best.sport];
    const naar = best.offset === 0 ? "I dag" : best.offset === 1 ? "I morgen" : DAGER[best.dag - 1];
    $("#heroNext").innerHTML =
      `<div class="ikon">${s.ikon}</div><div class="big">${esc(s.navn)}</div>` +
      `<div class="when">${naar} kl. ${esc(best.tid)}</div>`;
  })();

  /* ---------- Sporter ---------- */
  $("#sportGrid").innerHTML = D.sporter.map((s) => `
    <button class="sport" data-sport="${s.id}">
      <span class="ikon" aria-hidden="true">${s.ikon}</span>
      <h3>${esc(s.navn)}</h3>
      <span class="niva">${esc(s.niva)}</span>
      <p>${esc(s.kort)}</p>
      <span class="more">Les mer →</span>
    </button>`).join("");

  const sportDialog = $("#sportDialog");
  $("#sportGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sport]");
    if (!b) return;
    const s = sportById[b.dataset.sport];
    const tider = D.timeplan.filter((t) => t.sport === s.id)
      .map((t) => `<span>${DAGER[t.dag - 1].slice(0, 3)} ${esc(t.tid)}</span>`).join("");
    const harDropin = D.timeplan.some((t) => t.sport === s.id && t.dropin);
    $("#sportDialogBody").innerHTML = `
      <div style="font-size:2.4rem">${s.ikon}</div>
      <h2>${esc(s.navn)}</h2>
      <p>${esc(s.lang)}</p>
      <dl>
        <dt>Nivå</dt><dd>${esc(s.niva)}</dd>
        <dt>Ta med</dt><dd>${esc(s.ta_med)}</dd>
        <dt>Når</dt><dd><div class="times">${tider || "Se timeplan"}</div></dd>
      </dl>
      <div class="actions">
        ${harDropin ? `<button class="btn btn-ghost" data-open-signup data-type="dropin" data-sport="${s.id}">Book drop-in</button>` : ""}
        <button class="btn btn-primary" data-open-signup data-type="${s.id === "ungdom" ? "gruppe" : "medlemskap"}" data-sport="${s.id}">Meld meg på</button>
      </div>`;
    sportDialog.showModal();
  });

  /* ---------- Timeplan ---------- */
  let filter = "alle";
  const filterEl = $("#filter");
  filterEl.innerHTML = [`<button class="chip" data-f="alle" aria-pressed="true">Alle</button>`,
    `<button class="chip" data-f="dropin" aria-pressed="false">Kun drop-in</button>`]
    .concat(D.sporter.map((s) => `<button class="chip" data-f="${s.id}" aria-pressed="false">${esc(s.navn)}</button>`)).join("");
  filterEl.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    filter = b.dataset.f;
    $$(".chip", filterEl).forEach((c) => c.setAttribute("aria-pressed", c === b));
    renderSchedule();
  });

  function renderSchedule() {
    $("#schedule").innerHTML = DAGER.map((navn, i) => {
      const dag = i + 1;
      const slots = D.timeplan
        .filter((t) => t.dag === dag)
        .filter((t) => filter === "alle" || (filter === "dropin" ? t.dropin : t.sport === filter))
        .sort((a, b) => a.tid.localeCompare(b.tid));
      const html = slots.map((t) => {
        const s = sportById[t.sport];
        return `<button class="slot ${t.dropin ? "" : "closed"}" data-slot="${D.timeplan.indexOf(t)}">
          <span class="t">${esc(t.tid)}</span>
          <span class="n">${esc(s.navn)}</span>
          ${t.dropin ? `<span class="tag tag-drop">Drop-in</span>` : `<span class="tag tag-grp">Gruppe</span>`}
        </button>`;
      }).join("");
      return `<div class="day ${dag === idag ? "today" : ""} ${slots.length ? "" : "is-empty"}">
        <h3>${navn}${dag === idag ? " · i dag" : ""}</h3>
        <div class="slots">${html || `<div class="empty">Ingen timer</div>`}</div></div>`;
    }).join("");
  }
  renderSchedule();
  $("#schedule").addEventListener("click", (e) => {
    const b = e.target.closest("[data-slot]"); if (!b) return;
    const t = D.timeplan[+b.dataset.slot];
    openSignup(t.dropin ? "dropin" : "gruppe", { sport: t.sport, slot: +b.dataset.slot });
  });

  /* ---------- Priser ---------- */
  $("#innmeldingsavgift").textContent = D.innmeldingsavgift;
  $("#prisFotnote").textContent = D.prisFotnote;
  $("#priceGrid").innerHTML = D.abonnement.map((a) => `
    <div class="price ${a.anbefalt ? "best" : ""}">
      ${a.anbefalt ? `<span class="badge">Mest populær</span>` : ""}
      <h3>${esc(a.navn)}</h3>
      <div class="amount">${kr(a.pris)} <small>${esc(a.enhet)}</small></div>
      <ul>${a.punkter.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <button class="btn ${a.anbefalt ? "btn-primary" : "btn-ghost"}" data-open-signup data-type="${a.type}" data-plan="${a.id}">${esc(a.knapp)}</button>
    </div>`).join("");

  /* ---------- Kontakt ---------- */
  const K = D.kontakt;
  $("#contactList").innerHTML = `
    <li><span class="ci">📍</span><div><small>Adresse</small><a href="${esc(K.kart)}" target="_blank" rel="noopener">${esc(K.adresse)}</a></div></li>
    <li><span class="ci">📞</span><div><small>Telefon</small><a href="tel:${esc(K.telefon.replace(/\s/g, ""))}">${esc(K.telefon)}</a></div></li>
    <li><span class="ci">✉️</span><div><small>E-post</small><a href="mailto:${esc(K.epost)}">${esc(K.epost)}</a></div></li>
    <li><span class="ci">📱</span><div><small>Følg oss</small><a href="${esc(K.instagram)}" target="_blank" rel="noopener">Instagram</a> · <a href="${esc(K.facebook)}" target="_blank" rel="noopener">Facebook</a></div></li>`;
  $("#footerText").textContent = `© ${new Date().getFullYear()} ${K.navn} · ${K.adresse}`;

  /* ---------- Lukk dialoger ---------- */
  $$("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-close]")) d.close();
    });
  });

  /* ============================================================
   *  PÅMELDING (3 steg)
   * ============================================================ */
  const dlg = $("#signupDialog"), form = $("#signupForm");
  const state = { stage: 1, type: null, plan: null, sport: null, slot: null, dato: null };

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open-signup]"); if (!b) return;
    if (sportDialog.open) sportDialog.close();
    openSignup(b.dataset.type || null, { plan: b.dataset.plan, sport: b.dataset.sport });
  });

  function openSignup(type, pre = {}) {
    form.reset();
    Object.assign(state, { stage: 1, type: type || null, plan: pre.plan || null, sport: pre.sport || (sportById[pre.plan] ? pre.plan : null), slot: pre.slot ?? null, dato: null });
    $$(".error", form).forEach((e) => (e.textContent = ""));
    if (state.type) {
      $(`input[name=type][value=${state.type}]`, form).checked = true;
      go(2);
    } else go(1);
    dlg.showModal();
  }

  function go(n) {
    state.stage = n;
    $$(".stage", form).forEach((s) => (s.hidden = +s.dataset.stage !== n));
    $("#progressBar").style.width = Math.min(n, 3) / 3 * 100 + "%";
    $("#formNav").hidden = n === 4;
    $("#backBtn").style.visibility = n === 1 ? "hidden" : "visible";
    $("#nextBtn").textContent = n === 3 ? "Send påmelding" : "Neste";
    if (n === 2) renderStage2();
    if (n === 3) renderSummary();
    const first = $(`.stage[data-stage="${n}"] input, .stage[data-stage="${n}"] button`, form);
    if (first && n !== 4) setTimeout(() => first.focus({ preventScroll: true }), 30);
  }

  function nextDates(dag, count = 4) {
    const out = [], d = new Date();
    d.setHours(0, 0, 0, 0);
    while (out.length < count) {
      const wd = ((d.getDay() + 6) % 7) + 1;
      if (wd === dag) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }
  const fmtDate = (d) => d.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" });
  const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  function renderStage2() {
    const body = $("#stage2Body"), title = $("#stage2Title");
    if (state.type === "medlemskap") {
      title.textContent = "Velg medlemskap";
      body.onchange = null;
      const plans = D.abonnement.filter((a) => a.type === "medlemskap");
      if (!plans.some((p) => p.id === state.plan)) state.plan = (plans.find((p) => p.anbefalt) || plans[0]).id;
      body.innerHTML = `<div class="choice-grid">${plans.map((p) => radio("plan", p.id, p.navn, p.punkter.join(" · "), `${kr(p.pris)} <small>${esc(p.enhet)}</small>`, p.id === state.plan)).join("")}</div>
        <p class="sub">Hva vil du helst trene? (valgfritt)</p>
        <select name="interesse"><option value="">Vet ikke ennå – vil prøve litt av alt</option>${D.sporter.map((s) => `<option value="${s.id}" ${s.id === state.sport ? "selected" : ""}>${esc(s.navn)}</option>`).join("")}</select>`;
    } else if (state.type === "dropin") {
      title.textContent = "Velg time og dato";
      const drop = D.abonnement.find((a) => a.id === "dropin");
      let slots = D.timeplan.map((t, i) => ({ ...t, i })).filter((t) => t.dropin);
      if (state.slot == null && state.sport) { const f = slots.find((t) => t.sport === state.sport); if (f) state.slot = f.i; }
      body.innerHTML = `<p style="color:var(--muted);margin-top:-8px">Pris: <b style="color:var(--ink)">${kr(drop.pris)}</b> per time · betales ved oppmøte eller med Vipps.</p>
        <div id="dateWrap"></div>
        <p class="sub">Velg time</p>
        <div class="choice-grid">${slots.sort((a, b) => a.dag - b.dag || a.tid.localeCompare(b.tid)).map((t) =>
          radio("slot", t.i, sportById[t.sport].navn, `${DAGER[t.dag - 1]} ${t.tid}`, "", t.i === state.slot)).join("")}</div>`;
      body.onchange = onSlotChange;
      renderDates();
    } else {
      title.textContent = "Velg treningsgruppe";
      body.onchange = null;
      const grupper = D.sporter.map((s) => {
        const tider = D.timeplan.filter((t) => t.sport === s.id).map((t) => `${DAGER[t.dag - 1].slice(0, 3)} ${t.tid}`).join(", ");
        return { s, tider };
      }).filter((g) => g.tider);
      if (!state.sport) state.sport = grupper[0].s.id;
      body.innerHTML = `<div class="choice-grid">${grupper.map((g) => radio("gruppe", g.s.id, g.s.navn, `${g.s.niva} · ${g.tider}`, "", g.s.id === state.sport)).join("")}</div>`;
    }
  }

  function onSlotChange(e) {
    if (e.target.name === "slot") { state.slot = +e.target.value; renderDates(); }
  }
  function renderDates() {
    const wrap = $("#dateWrap"); if (!wrap) return;
    if (state.slot == null) { wrap.innerHTML = ""; return; }
    const t = D.timeplan[state.slot];
    const dates = nextDates(t.dag);
    wrap.innerHTML = `<p class="sub">Dato for ${esc(sportById[t.sport].navn)} (${DAGER[t.dag - 1].toLowerCase()} kl. ${esc(t.tid)})</p><select name="dato">${dates.map((d) => `<option value="${isoDate(d)}">${fmtDate(d)}</option>`).join("")}</select>`;
  }

  function radio(name, value, title, sub, right, checked) {
    return `<label class="choice"><input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""}>
      <span class="${right ? "row" : ""}"><span><b>${esc(title)}</b><br><small>${esc(sub)}</small></span>${right ? `<span class="p">${right}</span>` : ""}</span></label>`;
  }

  function describe() {
    if (state.type === "medlemskap") {
      const p = D.abonnement.find((a) => a.id === state.plan);
      const int = form.interesse && form.interesse.value ? sportById[form.interesse.value].navn : "";
      return { tittel: `Medlemskap: ${p.navn}`, detaljer: `${kr(p.pris)} ${p.enhet}${int ? ` · Interesse: ${int}` : ""}` };
    }
    if (state.type === "dropin") {
      const t = D.timeplan[state.slot];
      const dato = form.dato ? form.dato.selectedOptions[0].textContent : "";
      return { tittel: `Drop-in: ${sportById[t.sport].navn}`, detaljer: `${dato} kl. ${t.tid} · ${kr(D.abonnement.find((a) => a.id === "dropin").pris)}` };
    }
    const s = sportById[state.sport];
    return { tittel: `Treningsgruppe: ${s.navn}`, detaljer: s.niva };
  }

  function renderSummary() {
    const d = describe();
    $("#summary").innerHTML = `<b>${esc(d.tittel)}</b><br>${esc(d.detaljer)}`;
    $("#foresattField").hidden = !(state.type === "gruppe" && state.sport === "ungdom");
  }

  function validate(n) {
    const err = $(`[data-error="${n}"]`, form); err.textContent = "";
    if (n === 1) {
      const v = form.type.value;
      if (!v) return (err.textContent = "Velg ett av alternativene.", false);
      state.type = v; return true;
    }
    if (n === 2) {
      if (state.type === "medlemskap") { state.plan = form.plan.value; if (!state.plan) return (err.textContent = "Velg et medlemskap.", false); }
      if (state.type === "dropin") { if (state.slot == null) return (err.textContent = "Velg en time.", false); state.dato = form.dato.value; }
      if (state.type === "gruppe") { state.sport = form.gruppe.value; if (!state.sport) return (err.textContent = "Velg en gruppe.", false); }
      return true;
    }
    if (n === 3) {
      let ok = true;
      ["navn", "telefon", "epost"].forEach((f) => {
        const el = form[f];
        const bad = !el.value.trim() || (f === "epost" && !/^\S+@\S+\.\S+$/.test(el.value));
        el.setAttribute("aria-invalid", bad); if (bad) ok = false;
      });
      if (!ok) return (err.textContent = "Fyll inn navn, telefon og en gyldig e-post.", false);
      if (!form.samtykke.checked) return (err.textContent = "Du må godta at vi lagrer opplysningene.", false);
      return true;
    }
  }

  $("#nextBtn").addEventListener("click", async () => {
    const n = state.stage;
    if (!validate(n)) return;
    if (n < 3) return go(n + 1);
    await submit();
  });
  $("#backBtn").addEventListener("click", () => go(Math.max(1, state.stage - 1)));
  form.addEventListener("change", (e) => {
    if (e.target.name === "type") state.type = e.target.value;
  });
  form.addEventListener("submit", (e) => e.preventDefault());

  async function submit() {
    const d = describe();
    const data = {
      _subject: `Ny påmelding – ${d.tittel}`,
      pamelding: d.tittel, detaljer: d.detaljer,
      navn: form.navn.value.trim(), telefon: form.telefon.value.trim(), epost: form.epost.value.trim(),
      foresatt: form.foresatt.value.trim(), melding: form.melding.value.trim()
    };
    const btn = $("#nextBtn");
    if (D.skjemaAdresse) {
      btn.disabled = true; btn.textContent = "Sender …";
      try {
        const r = await fetch(D.skjemaAdresse, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error();
        $("#doneText").textContent = `Vi har mottatt påmeldingen din (${d.tittel}). Du hører fra oss på ${data.telefon} eller ${data.epost}.`;
        go(4);
      } catch {
        $('[data-error="3"]').textContent = `Noe gikk galt. Prøv igjen, eller send e-post til ${K.epost}.`;
      } finally { btn.disabled = false; btn.textContent = "Send påmelding"; }
    } else {
      const body = Object.entries(data).filter(([k, v]) => v && k !== "_subject")
        .map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)}: ${v}`).join("\n");
      window.location.href = `mailto:${K.epost}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(body)}`;
      $("#doneText").textContent = "E-posten din er klar – trykk «Send» i e-postprogrammet for å fullføre påmeldingen.";
      go(4);
    }
  }
})();
