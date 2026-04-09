const revealItems = document.querySelectorAll(".reveal");

function initReveal() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

function normalizeRows(rows) {
  const map = {};

  rows.forEach((row) => {
    const section = (row.section || "").trim();
    const key = (row.key || "").trim();
    const value = row.value == null ? "" : String(row.value).trim();

    if (!section || !key) {
      return;
    }

    map[`${section}.${key}`] = value;
  });

  return map;
}

function applyTextContent(dataMap) {
  document.querySelectorAll("[data-field]").forEach((node) => {
    const field = node.dataset.field;
    const value = dataMap[field];

    if (!value) {
      return;
    }

    if (node.dataset.attr === "text") {
      node.textContent = value;
    } else {
      node.textContent = value;
    }
  });
}

function applyLinks(dataMap) {
  document.querySelectorAll("[data-href-field]").forEach((node) => {
    const field = node.dataset.hrefField;
    const value = dataMap[field];

    if (value) {
      node.setAttribute("href", value);
    }
  });
}

function applyImageFields(dataMap) {
  document.querySelectorAll("[data-src-field]").forEach((node) => {
    const src = dataMap[node.dataset.srcField];
    if (src) {
      node.setAttribute("src", src);
    }
  });

  document.querySelectorAll("[data-alt-field]").forEach((node) => {
    const alt = dataMap[node.dataset.altField];
    if (alt) {
      node.setAttribute("alt", alt);
    }
  });
}

function applyMeta(dataMap) {
  if (dataMap["site.meta_title"]) {
    document.title = dataMap["site.meta_title"];
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && dataMap["site.meta_description"]) {
    metaDescription.setAttribute("content", dataMap["site.meta_description"]);
  }

  const email = dataMap["about.email_value"];
  const emailLink = document.querySelector('[data-field="about.email_value"]');
  if (email && emailLink) {
    emailLink.setAttribute("href", dataMap["about.email_link"] || `mailto:${email}`);
  }
}

function applyExcelData(rows) {
  const dataMap = normalizeRows(rows);
  applyTextContent(dataMap);
  applyLinks(dataMap);
  applyImageFields(dataMap);
  applyMeta(dataMap);
}

async function loadExcelContent() {
  if (typeof XLSX === "undefined") {
    return;
  }

  try {
    const response = await fetch("./content.xlsx", { cache: "no-store" });
    if (!response.ok) {
      return;
    }

    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];

    if (!firstSheetName) {
      return;
    }

    const sheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    applyExcelData(rows);
  } catch (error) {
    console.warn("content.xlsx load failed, fallback to embedded content.", error);
  }
}

initReveal();
loadExcelContent();
