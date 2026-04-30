/* ════════════════════════════════════════════════════════════════
   Schaad Advisors — Single source of truth for the preview chip.
   ──────────────────────────────────────────────────────────────
   Every preview page loads this BEFORE shared/service-menu.js.
   Edit this list to add/remove/reorder versions in the floating
   chip (bottom-right). The chip auto-detects the active page.

   Build-time strip: this file (and service-menu.js / .css) are
   not shipped to production WordPress. They are dev-preview chrome.
   ──────────────────────────────────────────────────────────── */

window.PREVIEW_PROJECT_NAME    = "Schaad Advisors";
window.PREVIEW_DEFAULT_VERSION = "home";

/* Order = top-to-bottom of the dropdown.
   Active dev work first, foundations (UIKit) before launcher,
   launcher last. */
window.PREVIEW_VERSIONS = [
  { id: "home",      label: "Home page", desc: "Active dev branch · evolving from approved Concept 2",   path: "home/"      },
  { id: "concept-2", label: "Concept 2", desc: "Approved baseline · private banking · centred portrait", path: "concept-2/" },
  { id: "concept-1", label: "Concept 1", desc: "Hybrid hero · random photo-strip + mouse priority",      path: "concept-1/" },
  { id: "wireframe", label: "Wireframe", desc: "Original mockup from client (2026-04-15)",               path: "wireframe/" },
  { id: "sandbox",   label: "Sandbox",   desc: "Experimental fragments · alternate variants",            path: "sandbox/"   },
  { id: "uikit",     label: "UI Kit",    desc: "Tokens & components reference",                          path: "uikit/"     },
  { id: "launcher",  label: "Launcher",  desc: "Index of all preview versions",                          path: ""           }
];
