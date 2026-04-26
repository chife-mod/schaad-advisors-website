/**
 * Service Menu — preview-only floating navigator.
 * Inject into any preview version with:
 *   <link rel="stylesheet" href="../shared/service-menu.css">
 *   <script defer src="../shared/service-menu.js"></script>
 *
 * Build-time strip: when WP-final build is produced, this file is not included.
 */

(function () {
  "use strict";

  if (window.__schaadServiceMenuInited) return;
  window.__schaadServiceMenuInited = true;

  const VERSIONS = [
    {
      id: "launcher",
      label: "Launcher",
      desc: "Index of all preview versions",
      path: "",
    },
    {
      id: "concept-2",
      label: "Concept 2",
      desc: "Hybrid: random photo-strip + mouse priority",
      path: "concept-2/",
    },
    {
      id: "concept-1",
      label: "Concept 1",
      desc: "Editorial Master + smart entrance",
      path: "concept-1/",
    },
    {
      id: "wireframe",
      label: "Wireframe",
      desc: "Original mockup from client (2026-04-15)",
      path: "wireframe/",
    },
  ];

  // The "default" / latest concept — shown in the pill when the user is
  // on the launcher page (so they can jump straight to the newest preview).
  const DEFAULT_VERSION_ID = "concept-2";

  // Detect base URL by locating this script's <script> tag.
  function detectBase() {
    const scripts = document.querySelectorAll('script[src*="service-menu"]');
    if (!scripts.length) return "/";
    const src = scripts[scripts.length - 1].getAttribute("src");
    const url = new URL(src, window.location.href);
    const idx = url.pathname.lastIndexOf("/shared/");
    return idx >= 0 ? url.pathname.substring(0, idx + 1) : "/";
  }

  function detectActive(base) {
    const path = window.location.pathname;
    // Match longest suffix first (concept-1 before launcher).
    for (const v of VERSIONS) {
      if (!v.path) continue;
      if (path.indexOf(base + v.path) === 0 || path.endsWith("/" + v.path) || path.endsWith("/" + v.path + "index.html")) {
        return v.id;
      }
    }
    // Default: when on the launcher page, surface the latest concept in
    // the pill so the user can jump to it in one click.
    return DEFAULT_VERSION_ID;
  }

  function svgLayers() {
    return (
      '<svg class="service-menu__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="m2 16 10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>"
    );
  }

  function svgCaret() {
    return (
      '<svg class="service-menu__caret" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>"
    );
  }

  function build() {
    const base = detectBase();
    const activeId = detectActive(base);
    const activeVersion = VERSIONS.find((v) => v.id === activeId) || VERSIONS[0];

    const root = document.createElement("div");
    root.className = "service-menu";
    root.setAttribute("data-open", "false");

    // Capsule (always visible).
    const capsule = document.createElement("button");
    capsule.type = "button";
    capsule.className = "service-menu__capsule";
    capsule.setAttribute("aria-expanded", "false");
    capsule.setAttribute("aria-haspopup", "menu");
    capsule.setAttribute("aria-label", "Switch preview version");
    capsule.innerHTML =
      svgLayers() +
      '<span class="service-menu__label"><span class="service-menu__label-prefix">Version:</span>' +
      escapeHtml(activeVersion.label) +
      "</span>" +
      svgCaret();

    // Panel.
    const panel = document.createElement("div");
    panel.className = "service-menu__panel";
    panel.setAttribute("role", "menu");

    const header = document.createElement("div");
    header.className = "service-menu__panel-header";
    header.textContent = "Schaad Advisors — Preview";
    panel.appendChild(header);

    const list = document.createElement("ul");
    list.className = "service-menu__list";
    VERSIONS.forEach((v) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "service-menu__item";
      a.href = base + v.path;
      a.setAttribute("role", "menuitem");
      if (v.id === activeId) a.setAttribute("data-active", "true");
      a.innerHTML =
        '<div class="service-menu__item-title">' + escapeHtml(v.label) + "</div>" +
        '<div class="service-menu__item-desc">' + escapeHtml(v.desc) + "</div>";
      li.appendChild(a);
      list.appendChild(li);
    });
    panel.appendChild(list);

    const footer = document.createElement("div");
    footer.className = "service-menu__footer";
    footer.textContent = "Internal preview · not for distribution";
    panel.appendChild(footer);

    root.appendChild(capsule);
    root.appendChild(panel);
    document.body.appendChild(root);

    // Toggle.
    function setOpen(open) {
      root.setAttribute("data-open", open ? "true" : "false");
      capsule.setAttribute("aria-expanded", open ? "true" : "false");
    }
    capsule.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(root.getAttribute("data-open") !== "true");
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
