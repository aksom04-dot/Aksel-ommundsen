(function () {
  "use strict";
  const D = window.BOXFIT;
  const K = D.kontakt;
  const DAGER = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
  const BINDING = { 12: "12 mnd binding", 6: "6 mnd binding", 0: "Uten binding" };
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const G = Object.fromEntries(D.grupper.map((g) => [g.id, g]));
  const M = Object.fromEntries(D.medlemskap.map((m) => [m.id, m]));
  const DROPIN = D.medlemskap.find((m) => m.type === "dropin");
  const SAUNA = D.medlemskap.find((m) => m.type === "tillegg");
  const kr = (n) => n.toLocaleString("nb-NO") + ",-";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const idag = ((new Date().getDay() + 6) % 7) + 1;
  const fra = (m) => (m.priser ? Math.min(...Object.values(m.priser)) : m.pris);
  const dots = (ids) => ids.map((id) => `<i class="dot" style="--c:${G[id].farge}" title="${esc(G[id].navn)}"></i>`).join("");
  // Medlemskapet som passer best for en gruppe (minst mulig pakke som inkluderer gruppen)
  const tn = (t) => t.tittel || G[t.gruppe].navn;
  const planFor = (gid) => D.medlemskap.filter((m) => m.grupper.includes(gid)).sort((a, b) => a.grupper.length - b.grupper.length)[0];

  /* ---------- Meny ---------- */
  const menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", nav.classList.toggle("open")));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }));
  if (D.loggInnUrl) $$("[data-login]").forEach((a) => { a.href = D.loggInnUrl; a.hidden = false; });

  /* ---------- Neste time ---------- */
  (function () {
    const now = new Date(), mins = now.getHours() * 60 + now.getMinutes();
    for (let off = 0; off < 8; off++) {
      const dag = ((idag - 1 + off) % 7) + 1;
      const t = D.timeplan.filter((x) => x.dag === dag).sort((a, b) => a.tid.localeCompare(b.tid))
        .find((x) => { const [h, m] = x.tid.split(":").map(Number); return off > 0 || h * 60 + m > mins; });
      if (t) {
        const g = G[t.gruppe], naar = off === 0 ? "i dag" : off === 1 ? "i morgen" : DAGER[dag - 1].toLowerCase();
        $("#heroNext").innerHTML = `<i class="dot"></i>Neste time: <b>${esc(g.navn)}</b> · ${naar} kl. ${esc(t.tid.split("–")[0])}`;
        return;
      }
    }
  })();

  /* ---------- Om oss ---------- */
  $("#omTekst").innerHTML = D.omOss.map((p) => `<p>${esc(p)}</p>`).join("");
  if ($("#omSitat")) $("#omSitat").textContent = D.omOssSitat || "";
  if ($("#fakta")) $("#fakta").innerHTML = (D.fakta || []).map((f) => `<div><dt>${esc(f.tall)}</dt><dd>${esc(f.tekst)}</dd></div>`).join("");
  if ($("#verdier")) $("#verdier").innerHTML = (D.verdier || []).map((v) => `<div class="value"><h3>${esc(v.tittel)}</h3><p>${esc(v.tekst)}</p></div>`).join("");
  if ($("#galleri")) $("#galleri").innerHTML = (D.galleri || []).map((g) => `<figure><img src="${esc(g.bilde)}" alt="${esc(g.tekst)}" loading="lazy"><figcaption>${esc(g.tekst)}</figcaption></figure>`).join("");

  /* ---------- Gruppetimer ---------- */
  $("#sportGrid").innerHTML = D.grupper.map((g) => `
    <button class="sport" data-sport="${g.id}">
      <span class="sport-img"><img src="${esc(g.bilde)}" alt="" loading="lazy"></span>
      <span class="sport-body">
        <span class="niva">${esc(g.niva)}</span>
        <h3>${esc(g.navn)}</h3>
        <p>${esc(g.kort)}</p>
        <span class="more">Les mer <span aria-hidden="true">→</span></span>
      </span>
    </button>`).join("");

  const sportDialog = $("#sportDialog");
  $("#sportGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sport]"); if (!b) return;
    const g = G[b.dataset.sport], plan = planFor(g.id);
    const tider = D.timeplan.filter((t) => t.gruppe === g.id).map((t) => `<span>${DAGER[t.dag - 1].slice(0, 3)} ${esc(t.tid)}${t.tittel ? ` · ${esc(t.tittel.replace(/^Thaiboksing /, ""))}` : ""}</span>`).join("");
    const harDropin = D.timeplan.some((t) => t.gruppe === g.id && t.dropin);
    $("#sportDialogBody").innerHTML = `
      <img class="dialog-img" src="${esc(g.bilde)}" alt="">
      <span class="pill">${esc(g.niva)}</span>
      <h2>${esc(g.navn)}</h2>
      <p>${esc(g.lang)}</p>
      <dl>
        <dt>Ta med</dt><dd>${esc(g.ta_med)}</dd>
        <dt>Når</dt><dd><div class="times">${tider || "Se timeplan"}</div></dd>
        ${plan ? `<dt>Pris</dt><dd>${esc(plan.navn)}: fra ${kr(fra(plan))} ${plan.priser ? "/mnd" : esc(plan.enhet)}</dd>` : ""}
      </dl>
      <div class="actions">
        ${harDropin ? `<button class="btn btn-ghost" data-open-signup data-type="dropin" data-sport="${g.id}">Book drop-in</button>` : ""}
        ${plan ? `<button class="btn btn-primary" data-open-signup data-type="${plan.type}" data-plan="${plan.id}">Meld meg på</button>` : ""}
      </div>`;
    sportDialog.showModal();
  });

  /* ---------- Timeplan ---------- */
  let filter = "alle";
  const filterEl = $("#filter");
  filterEl.innerHTML = `<button class="chip" data-f="alle" aria-pressed="true">Alle</button><button class="chip" data-f="dropin" aria-pressed="false">Kun drop-in</button>` +
    D.grupper.filter((g) => D.timeplan.some((t) => t.gruppe === g.id)).map((g) => `<button class="chip" data-f="${g.id}" aria-pressed="false" style="--c:${g.farge}"><i class="dot"></i>${esc(g.navn)}</button>`).join("");
  filterEl.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    filter = b.dataset.f;
    $$(".chip", filterEl).forEach((c) => c.setAttribute("aria-pressed", c === b));
    renderSchedule();
  });
  function renderSchedule() {
    $("#schedule").innerHTML = DAGER.map((navn, i) => {
      const dag = i + 1;
      const slots = D.timeplan.filter((t) => t.dag === dag)
        .filter((t) => filter === "alle" || (filter === "dropin" ? t.dropin : t.gruppe === filter))
        .sort((a, b) => a.tid.localeCompare(b.tid));
      const html = slots.map((t) => `<button class="slot" style="--c:${G[t.gruppe].farge}" data-slot="${D.timeplan.indexOf(t)}">
          <span class="t">${esc(t.tid)}</span><span class="n">${esc(tn(t))}</span>
          ${t.dropin ? `<span class="tag tag-drop">Drop-in</span>` : `<span class="tag tag-grp">Påmelding</span>`}</button>`).join("");
      return `<div class="day ${dag === idag ? "today" : ""} ${slots.length || (D.stengt || {})[dag] ? "" : "is-empty"}"><h3>${navn}${dag === idag ? " · i dag" : ""}</h3>
        <div class="slots">${html || `<div class="empty ${(D.stengt || {})[dag] ? "closed" : ""}">${esc((D.stengt || {})[dag] || "Ingen timer")}</div>`}</div></div>`;
    }).join("");
  }
  renderSchedule();
  $("#schedule").addEventListener("click", (e) => {
    const b = e.target.closest("[data-slot]"); if (!b) return;
    const t = D.timeplan[+b.dataset.slot];
    if (t.dropin) openSignup("dropin", { slot: +b.dataset.slot });
    else { const p = planFor(t.gruppe); openSignup(p.type, { plan: p.id }); }
  });

  /* ---------- Priser ---------- */
  $("#priceGrid").innerHTML = D.medlemskap.map((m) => {
    const farger = m.grupper.map((id) => G[id].farge);
    const stripe = farger.length ? `linear-gradient(90deg, ${farger.map((c, i) => `${c} ${i / farger.length * 100}% ${(i + 1) / farger.length * 100}%`).join(", ")})` : "var(--blue)";
    const linjer = m.priser
      ? [12, 6, 0].map((b) => `<li><span>${BINDING[b]}</span><b>${kr(m.priser[b])}</b></li>`).join("")
      : `<li><span>${m.type === "dropin" ? "Én time, ingen binding" : esc(m.merknad || "Per måned")}</span><b>${kr(m.pris)}</b></li>`;
    const knapp = m.type === "dropin" ? "Book drop-in" : m.type === "tillegg" ? "Legg til" : "Meld deg inn";
    return `<div class="price ${m.populaer ? "best" : ""}" style="--stripe:${stripe}">
      ${m.populaer ? `<span class="badge">Mest populær</span>` : ""}
      <div class="price-dots">${dots(m.grupper)}</div>
      <h3>${esc(m.navn)}</h3>
      <div class="amount"><small>fra</small> ${fra(m)}<span>kr ${m.priser ? "/mnd" : esc(m.enhet)}</span></div>
      <ul>${linjer}</ul>
      <button class="btn ${m.populaer ? "btn-primary" : "btn-ghost"}" data-open-signup data-type="${m.type === "tillegg" ? "medlemskap" : m.type}" data-plan="${m.id}">${knapp}</button>
    </div>`;
  }).join("");

  /* ---------- Kontakt ---------- */
  const rad = (ikon, label, html) => `<li><span class="ci">${ikon}</span><div><small>${label}</small>${html}</div></li>`;
  const sosiale = [K.instagram && `<a href="${esc(K.instagram)}" target="_blank" rel="noopener">Instagram</a>`, K.facebook && `<a href="${esc(K.facebook)}" target="_blank" rel="noopener">Facebook</a>`].filter(Boolean).join(" · ");
  $("#contactList").innerHTML =
    rad("📍", "Adresse", `<a href="${esc(K.kart)}" target="_blank" rel="noopener">${esc(K.adresse)}</a>`) +
    (K.telefon ? rad("📞", "Telefon", `<a href="tel:+47${esc(K.telefon.replace(/\s/g, ""))}">${esc(K.telefon)}</a>`) : "") +
    rad("✉️", "E-post", `<a href="mailto:${esc(K.epost)}">${esc(K.epost)}</a>`) +
    (K.apningstider ? rad("🕓", "Åpningstider", `<span class="ct">${esc(K.apningstider)}</span>`) : "") +
    (sosiale ? rad("📱", "Følg oss", sosiale) : "");
  $("#footerText").textContent = `© ${new Date().getFullYear()} ${K.navn} · ${K.adresse}`;

  $$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); }));

  /* ============================================================
   *  PÅMELDING (3 steg)
   * ============================================================ */
  const dlg = $("#signupDialog"), form = $("#signupForm");
  const state = {};

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open-signup]"); if (!b) return;
    if (sportDialog.open) sportDialog.close();
    openSignup(b.dataset.type || null, { plan: b.dataset.plan, sport: b.dataset.sport });
  });

  function openSignup(type, pre = {}) {
    form.reset();
    let plan = pre.plan || null, sauna = false;
    if (plan && M[plan].type === "tillegg") { sauna = true; plan = null; }
    Object.assign(state, { stage: 1, type: type || null, plan, binding: 12, sauna, sport: pre.sport || null, slot: pre.slot ?? null });
    $$(".error", form).forEach((e) => (e.textContent = ""));
    if (state.type) { $(`input[name=type][value=${state.type}]`, form).checked = true; go(2); } else go(1);
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
  }

  const radio = (name, value, title, sub, right, checked, farge) => `<label class="choice" ${farge ? `style="--c:${farge}"` : ""}>
      <input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""}>
      <span class="${right ? "row" : ""}"><span>${farge ? `<i class="dot"></i>` : ""}<b>${esc(title)}</b>${sub ? `<br><small>${sub}</small>` : ""}</span>${right ? `<span class="p">${right}</span>` : ""}</span></label>`;

  function nextDates(dag, count = 4) {
    const out = [], d = new Date(); d.setHours(0, 0, 0, 0);
    while (out.length < count) { if (((d.getDay() + 6) % 7) + 1 === dag) out.push(new Date(d)); d.setDate(d.getDate() + 1); }
    return out;
  }
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  function renderStage2() {
    const body = $("#stage2Body"), title = $("#stage2Title");
    body.onchange = null;
    if (state.type === "dropin") {
      title.textContent = "Velg time og dato";
      const slots = D.timeplan.map((t, i) => ({ ...t, i })).filter((t) => t.dropin).sort((a, b) => a.dag - b.dag || a.tid.localeCompare(b.tid));
      if (state.slot == null && state.sport) { const f = slots.find((t) => t.gruppe === state.sport); if (f) state.slot = f.i; }
      body.innerHTML = `<p class="note">Pris: <b>${kr(DROPIN.pris)}</b> per time – betales ved oppmøte.</p>
        <div id="dateWrap"></div><p class="sub">Velg time</p>
        <div class="choice-grid">${slots.map((t) => radio("slot", t.i, tn(t), `${DAGER[t.dag - 1]} ${esc(t.tid)}`, "", t.i === state.slot, G[t.gruppe].farge)).join("")}</div>`;
      body.onchange = (e) => { if (e.target.name === "slot") { state.slot = +e.target.value; renderDates(); } };
      renderDates();
      return;
    }
    const plans = D.medlemskap.filter((m) => m.type === state.type);
    title.textContent = state.type === "gruppe" ? "Velg gruppe" : "Velg medlemskap";
    if (!plans.some((p) => p.id === state.plan)) state.plan = (plans.find((p) => p.populaer) || plans[0]).id;
    body.innerHTML = `<div class="choice-grid">${plans.map((p) => radio("plan", p.id, p.navn,
        p.grupper.map((id) => esc(G[id].navn)).join(" · "), `fra ${kr(fra(p))}`, p.id === state.plan, G[p.grupper[0]].farge)).join("")}</div>
      <div id="bindingWrap"></div>
      ${state.type === "medlemskap" && SAUNA ? `<label class="check addon"><input type="checkbox" name="sauna" ${state.sauna ? "checked" : ""}> Legg til ${esc(SAUNA.navn.split(" –")[0])} (+${kr(SAUNA.pris)}/mnd, ${esc(SAUNA.merknad)})</label>` : ""}`;
    body.onchange = (e) => {
      if (e.target.name === "plan") { state.plan = e.target.value; renderBinding(); }
      if (e.target.name === "binding") state.binding = +e.target.value;
      if (e.target.name === "sauna") state.sauna = e.target.checked;
    };
    renderBinding();
  }
  function renderBinding() {
    const p = M[state.plan], w = $("#bindingWrap");
    if (!p.priser) { w.innerHTML = ""; return; }
    w.innerHTML = `<p class="sub">Binding</p><div class="seg">${[12, 6, 0].map((b) =>
      `<label><input type="radio" name="binding" value="${b}" ${b === state.binding ? "checked" : ""}><span>${BINDING[b]}<b>${kr(p.priser[b])}/mnd</b></span></label>`).join("")}</div>`;
  }
  function renderDates() {
    const w = $("#dateWrap"); if (!w) return;
    if (state.slot == null) { w.innerHTML = ""; return; }
    const t = D.timeplan[state.slot];
    w.innerHTML = `<p class="sub">Dato for ${esc(tn(t))} (${DAGER[t.dag - 1].toLowerCase()} kl. ${esc(t.tid)})</p>
      <select name="dato">${nextDates(t.dag).map((d) => `<option value="${iso(d)}">${d.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })}</option>`).join("")}</select>`;
  }

  function describe() {
    if (state.type === "dropin") {
      const t = D.timeplan[state.slot];
      return { tittel: `Drop-in: ${tn(t)}`, detaljer: `${form.dato.selectedOptions[0].textContent} kl. ${t.tid} · ${kr(DROPIN.pris)}`, barn: false };
    }
    const p = M[state.plan];
    const pris = p.priser ? `${BINDING[state.binding]} · ${kr(p.priser[state.binding])}/mnd` : `${kr(p.pris)}${p.enhet}`;
    const sauna = state.sauna && state.type === "medlemskap" ? ` + ${SAUNA.navn} (${kr(SAUNA.pris)}/mnd)` : "";
    return { tittel: `${state.type === "gruppe" ? "Gruppe" : "Medlemskap"}: ${p.navn}`, detaljer: pris + sauna, barn: p.grupper.some((id) => G[id].forBarn) };
  }
  function renderSummary() {
    const d = describe();
    $("#summary").innerHTML = `<b>${esc(d.tittel)}</b><br>${esc(d.detaljer)}`;
    $("#foresattField").hidden = !d.barn;
    $("#navnLabel").firstChild.textContent = d.barn ? "Barnets fulle navn" : "Fullt navn";
  }

  function validate(n) {
    const err = $(`[data-error="${n}"]`, form); err.textContent = "";
    if (n === 1) { if (!form.type.value) return (err.textContent = "Velg ett av alternativene.", false); state.type = form.type.value; return true; }
    if (n === 2) {
      if (state.type === "dropin" && state.slot == null) return (err.textContent = "Velg en time.", false);
      return true;
    }
    let ok = true;
    const felt = ["navn", "telefon", "epost"].concat(describe().barn ? ["foresatt"] : []);
    felt.forEach((f) => {
      const el = form[f], bad = !el.value.trim() || (f === "epost" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.setAttribute("aria-invalid", bad); if (bad) ok = false;
    });
    if (!ok) return (err.textContent = "Fyll inn alle feltene (og en gyldig e-post).", false);
    if (!form.samtykke.checked) return (err.textContent = "Du må godta at vi lagrer opplysningene.", false);
    return true;
  }

  $("#nextBtn").addEventListener("click", async () => {
    if (!validate(state.stage)) return;
    if (state.stage < 3) return go(state.stage + 1);
    await submit();
  });
  $("#backBtn").addEventListener("click", () => go(Math.max(1, state.stage - 1)));
  form.addEventListener("change", (e) => { if (e.target.name === "type") { state.type = e.target.value; state.plan = null; } });
  form.addEventListener("submit", (e) => e.preventDefault());

  async function submit() {
    const d = describe();
    const data = { _subject: `Ny påmelding – ${d.tittel}`, pamelding: d.tittel, detaljer: d.detaljer,
      navn: form.navn.value.trim(), foresatt: d.barn ? form.foresatt.value.trim() : "",
      telefon: form.telefon.value.trim(), epost: form.epost.value.trim(), melding: form.melding.value.trim() };
    const btn = $("#nextBtn");
    if (D.skjemaAdresse) {
      btn.disabled = true; btn.textContent = "Sender …";
      try {
        const r = await fetch(D.skjemaAdresse, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error();
        $("#doneText").textContent = `Vi har mottatt påmeldingen (${d.tittel}). Du hører fra oss på ${data.telefon} eller ${data.epost}.`;
        go(4);
      } catch { $('[data-error="3"]').textContent = `Noe gikk galt. Prøv igjen, eller send e-post til ${K.epost}.`; }
      finally { btn.disabled = false; btn.textContent = "Send påmelding"; }
    } else {
      const body = Object.entries(data).filter(([k, v]) => v && k !== "_subject").map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)}: ${v}`).join("\n");
      window.location.href = `mailto:${K.epost}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(body)}`;
      $("#doneText").textContent = "E-posten er klar – trykk «Send» i e-postprogrammet for å fullføre påmeldingen.";
      go(4);
    }
  }
})();
