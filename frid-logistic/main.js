// TODO: bytt til Mikaels ekte e-post (brukes hvis skjemaet ikke kan sendes via Netlify)
const FALLBACK_EMAIL = "post@fridlogistic.no";

document.getElementById("year").textContent = new Date().getFullYear();

// Lenker fra tjenestekortene velger riktig tjeneste i skjemaet
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const value = link.dataset.service === "distribusjon" ? "Fast distribusjon" : "Budbil / enkeltoppdrag";
    const radio = document.querySelector(`input[name="tjeneste"][value="${value}"]`);
    if (radio) radio.checked = true;
  });
});

const form = document.querySelector("form.form");
if (form) {
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');

  const messages = {
    navn: "Skriv inn navnet ditt.",
    epost: "Skriv inn en gyldig e-postadresse, for eksempel navn@firma.no.",
    telefon: "Skriv inn et telefonnummer vi kan nå deg på.",
  };

  function setError(input, message) {
    const field = input.closest(".field");
    let err = field.querySelector(".err");
    if (message) {
      if (!err) {
        err = document.createElement("span");
        err.className = "err";
        err.id = `${input.id}-err`;
        field.appendChild(err);
      }
      err.textContent = message;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", err.id);
    } else if (err) {
      err.remove();
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  }

  function validate() {
    let first = null;
    Object.keys(messages).forEach((name) => {
      const input = form.elements[name];
      const ok = input.value.trim() !== "" && input.checkValidity();
      setError(input, ok ? "" : messages[name]);
      if (!ok && !first) first = input;
    });
    if (first) first.focus();
    return !first;
  }

  Object.keys(messages).forEach((name) => {
    form.elements[name].addEventListener("input", (e) => {
      if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity() && e.target.value.trim()) {
        setError(e.target, "");
      }
    });
  });

  function mailtoFallback(data) {
    const lines = [
      `Tjeneste: ${data.get("tjeneste")}`,
      `Navn: ${data.get("navn")}`,
      `Firma: ${data.get("firma")}`,
      `E-post: ${data.get("epost")}`,
      `Telefon: ${data.get("telefon")}`,
      `Hentes i: ${data.get("fra")}`,
      `Leveres til: ${data.get("til")}`,
      `Når: ${data.get("dato")}`,
      "",
      `${data.get("gods")}`,
    ];
    const subject = `Forespørsel om pris: ${data.get("tjeneste")}`;
    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";
    if (!validate()) return;

    const data = new FormData(form);
    button.disabled = true;
    button.textContent = "Sender …";

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.classList.add("ok");
      status.textContent = "Forespørselen er sendt. Vi tar kontakt så snart vi kan, normalt innen neste arbeidsdag.";
    } catch {
      status.classList.add("bad");
      status.textContent = `Skjemaet kunne ikke sendes herfra. Vi åpner e-posten din med forespørselen ferdig utfylt – trykk send der, eller ring oss.`;
      mailtoFallback(data);
    } finally {
      button.disabled = false;
      button.textContent = "Send forespørsel";
    }
  });
}
