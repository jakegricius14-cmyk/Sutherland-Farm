/* Sutherland Farm — small helpers. No libraries needed. */

/* ------------------------------------------------------------------
   WAITLIST SETTINGS
   Signups are sent to a Google Form, which saves every answer into a
   Google Sheet automatically.
   To connect it: paste the form's "formResponse" address below and the
   entry numbers for each question (see README.md for the 2-minute steps).
   Until it is connected, the form still checks answers and shows the
   thank-you message, but nothing is saved.
------------------------------------------------------------------- */
const WAITLIST = {
  action: "", // e.g. "https://docs.google.com/forms/d/e/XXXX/formResponse"
  fields: {
    name: "",      // e.g. "entry.123456789"
    contact: "",   // phone or email
    town: "",
    notes: ""      // what they would like
  }
};

(function () {
  /* Mobile menu */
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.querySelector("b").textContent = open ? "Close" : "Menu";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.querySelector("b").textContent = "Menu";
      })
    );
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* Waitlist forms */
  document.querySelectorAll("form.waitlist-form").forEach((form) => {
    const card = form.closest(".form-card");
    const err = card.querySelector(".form-error");
    const ok = card.querySelector(".form-success");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const name = (d.get("name") || "").trim();
      const contact = (d.get("contact") || "").trim();
      const digits = contact.replace(/\D/g, "");
      const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

      const problems = [];
      if (!name) problems.push("your name");
      if (!looksEmail && digits.length < 10) problems.push("a full phone number or email");
      if (problems.length) {
        err.textContent = "Please add " + problems.join(" and ") + ".";
        err.classList.add("show");
        err.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      err.classList.remove("show");

      const submit = form.querySelector("button[type=submit]");
      submit.disabled = true;
      submit.textContent = "Adding you…";

      if (WAITLIST.action) {
        const body = new URLSearchParams();
        const f = WAITLIST.fields;
        const add = (key, val) => { if (key && val) body.append(key, val); };
        add(f.name, name);
        add(f.contact, contact);
        add(f.town, d.get("town"));
        add(f.notes, (d.get("notes") || "").trim());
        try {
          await fetch(WAITLIST.action, { method: "POST", mode: "no-cors", body });
        } catch (x) {
          submit.disabled = false;
          submit.textContent = "Join the 2027 waitlist";
          err.textContent = "Something went wrong sending that. Please try again, or call or text 403-899-8484.";
          err.classList.add("show");
          return;
        }
      }

      form.hidden = true;
      ok.querySelector("[data-first]").textContent = name.split(" ")[0];
      ok.classList.add("show");
      ok.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
})();
