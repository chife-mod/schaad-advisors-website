# Schaad Advisors Website — План

Forward-looking стратегия проекта: технические стандарты для production, дальнейшая работа после approve дизайна, WordPress integration на зафиксированном стеке, базовый SEO. Текущий статус и ежедневные решения — в `CLAUDE.md`.

## Technical requirements (production target)

Стандарт качества для production-релиза. Прототип сейчас живёт в **dev-mode** (Vite dev-server + локальная разработка). Перед выпуском в продакшен (или при WP-конверсии) всё подгоняется под эти требования.

### Валидность

- **HTML5 валиден** — проходит W3C HTML Validator (https://validator.w3.org) без ошибок и warnings. Семантика: `<header>`, `<main>`, `<section>`, `<nav>`, `<article>` где осмысленно. Корректные `lang="de"`, `alt`, `aria-*` атрибуты.
- **CSS валиден** — проходит W3C CSS Validator (https://jigsaw.w3.org/css-validator/). Vendor-prefix через autoprefixer (PostCSS).
- **JS валиден** — без runtime errors, strict mode, ESLint clean (опционально, если поднимем линт на этапе сборки).

### Структура файлов (production)

**Никакого inline `<style>` / `<script>` в HTML.** Vite собирает финальный bundle:

- `index.html` — только разметка, минимальный head с подключением ресурсов.
- `dist/styles-[hash].css` — все стили вынесены, никаких inline-стилей кроме `style=""` для динамических CSS-переменных.
- `dist/app-[hash].js` — вся логика: GSAP-анимации, scroll-handlers, интерактивы.

Vanilla CSS + custom properties (НЕ Tailwind, НЕ Sass — зафиксировано). PostCSS делает autoprefixer / cssnano / preset-env. Vanilla JS + локальный GSAP (НЕ CDN).

### Cross-browser support

Поддерживаем **последние 2 major-версии**:

- Chrome / Edge (Chromium)
- Safari (macOS + iOS) — особое внимание, аудитория 50–70 лет, многие на Mac/iPad.
- Firefox

**Не поддерживаем:** IE 11, старые Opera Mini, Samsung Internet < 18.

Перед production-релизом проходим по чеклисту в каждом из 4 браузеров: hero-секция, GSAP-анимации, hover/focus состояния, формы, Lesezeichen-каталог.

### Lighthouse — все четыре метрики в зелёной зоне (≥90)

| Метрика | Mobile | Desktop |
|---|---|---|
| Performance | ≥90 | ≥95 |
| Accessibility | ≥95 | ≥95 |
| Best Practices | ≥95 | ≥95 |
| SEO | ≥95 | ≥95 |

**Performance budget:**
- LCP (largest contentful paint) < 2.5s на 4G mobile
- CLS (cumulative layout shift) < 0.1
- INP (interaction to next paint) < 200ms
- First paint hero текста < 1.5s

Inter Variable — единственный шрифт; subsetting на используемые weights, self-hosted (НЕ Google Fonts CDN, для приватности и скорости).

### Accessibility (WCAG 2.1 AA)

Аудитория 50–70 лет, аналитический склад — **a11y критична**, не nice-to-have:

- **Контраст** — AA минимум (4.5:1 normal, 3:1 large). Текущая палитра: `--charcoal #1e2a35` на белом — 13.6:1 ✓. Проверять каждую новую цветовую пару (особенно `--blue-light` и `--gold` на белом — могут не проходить).
- **Размер шрифта** — body минимум 16px. На больших экранах рассмотреть 17–18px (легче читать возрастной аудитории).
- **Keyboard navigation** — `:focus-visible` стили на всех интерактивных элементах. Заметные, не дефолтная синяя рамка.
- **Семантика** — `<button>` для действий, `<a>` для навигации, не наоборот.
- **Reduced motion** — `prefers-reduced-motion: reduce` гасит GSAP-анимации (важно при тяжёлой motion-загрузке).
- **Screen-reader** — `aria-hidden` на чисто декоративных, `aria-label` на icon-only кнопках. Lesezeichen-карточки имеют корректную семантику (`<article>`, `<h3>` заголовки).
- **Language** — `<html lang="de">`, при добавлении других языков — корректные `hreflang`.

### Production checklist (перед релизом)

- [ ] Vite production build (`vite build`) — no warnings.
- [ ] HTML / CSS / JS вынесены в отдельные файлы (Vite это делает автоматически).
- [ ] W3C HTML Validator — clean.
- [ ] W3C CSS Validator — clean (с учётом vendor-prefix через autoprefixer).
- [ ] Lighthouse mobile + desktop — все 4 метрики в зелёной зоне.
- [ ] Smoke-test в Chrome / Safari (Mac + iOS) / Firefox / Edge — каждая секция, hover/focus.
- [ ] Reduced-motion проверен (Settings → Accessibility → Reduce Motion).
- [ ] Keyboard-only navigation проходит весь happy-path.
- [ ] DE-копирайт finally-checked (нет typo, корректные Umlaut'ы, формальное «Sie»).
- [ ] Sitemap.xml, robots.txt на месте.
- [ ] OG-tags + Twitter Card теги per-page.
- [ ] JSON-LD schema.org разметка (`Person` для Якоба, `ProfessionalService` для услуг).
- [ ] WebP / lazy-loading / preconnect где надо.
- [ ] 404 страница на месте.
- [ ] Контактная форма работает (отправляет на корректный email).

## После client-approve direction (next iteration scope)

Когда Verena/Якоб апрувят выбранный концепт:

1. Финализировать выбранный концепт целиком — все секции в production-quality (не proof-of-vibe).
2. Lesezeichen-каталог — проработать дизайн карточек, фильтров по taxonomy (`resource_category`), пагинацию.
3. Контактная секция / контактная форма — финальный дизайн.
4. Footer, юридические страницы (Impressum, Datenschutz — обязательны по швейцарскому/EU праву).
5. Mobile QA на реальных устройствах (iPhone, iPad, Android).
6. Performance pass — Lighthouse audit, оптимизация LCP/CLS/INP.
7. Только после этого — WP-конверсия (Phase 2).

## WordPress integration (Phase 2)

**Цель:** после approve и доверстки прототипа целиком — перенести в WordPress, чтобы Verena/Якоб могли сами добавлять Lesezeichen и редактировать ключевой контент.

### Зафиксированный стек (см. CLAUDE.md)

- **CMS:** WordPress (классическая PHP-тема + `theme.json` + editor styles)
- **Контент-модель:** ACF Pro Blocks (`block.json`) для повторяемых секций; CPT `resources` + taxonomy `resource_category` для Lesezeichen
- **CSS:** vanilla + custom properties + PostCSS (autoprefixer, cssnano, preset-env)
- **JS:** vanilla + GSAP (локально, не CDN)
- **Сборка:** Vite (минимальный конфиг)
- **Multi-language:** только DE на старте, архитектурно готовим к Polylang/WPML (i18n-ready, тексты в `.po`-файлах темы)

### Структура темы

```
wp-content/themes/schaad-advisors/
├── style.css              ← мета-теги темы
├── theme.json             ← block-editor settings (палитра, типошкала, spacing)
├── functions.php          ← регистрация scripts/styles, ACF Blocks, CPT resources, taxonomy
├── header.php             ← топбар + nav
├── footer.php             ← Impressum/Datenschutz/Kontakt
├── front-page.php         ← главная
├── single-resources.php   ← одна Lesezeichen-карточка
├── archive-resources.php  ← каталог Lesezeichen
├── page.php               ← фолбэк страницы
├── 404.php
├── languages/             ← .po/.mo файлы для DE (и будущие)
├── blocks/                ← ACF Block templates (block.json + render.php per блок)
│   ├── hero/
│   ├── services/
│   ├── about/
│   ├── lesezeichen-grid/
│   └── contact/
├── src/                   ← исходники для Vite
│   ├── styles/            ← vanilla CSS + custom properties
│   ├── scripts/           ← vanilla JS + GSAP
│   └── images/
└── dist/                  ← Vite output, подключается через functions.php
```

### ACF Blocks vs Gutenberg native

**ACF Pro Blocks** (за них уже заплачено / используется) — для повторяемых редактируемых секций:

- `schaad/hero` — поля eyebrow/H1/subhead/CTA-text/CTA-link
- `schaad/services-grid` — массив услуг (title/description/icon)
- `schaad/about-jakob` — bio-блок с фото
- `schaad/lesezeichen-grid` — выводит CPT `resources`, фильтр по `resource_category`
- `schaad/contact` — поля для контактной секции

ACF Blocks render server-side через PHP-функцию (`render.php` в каждом блоке), используют наш vanilla CSS / GSAP — никакой React-кодогенерации в админке.

**Native Gutenberg** — для прозы (Impressum, Datenschutz, чисто текстовые страницы): paragraph, heading, list. Без ACF.

### Custom Post Type для Lesezeichen

```php
register_post_type('resources', [
  'public' => true,
  'has_archive' => true,
  'rewrite' => ['slug' => 'lesezeichen'],
  'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
  'show_in_rest' => true,
]);
register_taxonomy('resource_category', 'resources', [
  'hierarchical' => true,
  'rewrite' => ['slug' => 'lesezeichen-kategorie'],
  'show_in_rest' => true,
]);
```

Verena добавляет Lesezeichen через стандартный WP-редактор (title + featured image + excerpt + категория). Frontend выводит через `WP_Query` в `archive-resources.php` или через `schaad/lesezeichen-grid` block.

### Multi-language (i18n-ready)

Сразу делаем правильно даже на one-language старте:

- Все строки в темплейтах через `__()` / `_e()` / `esc_html__()`.
- `.po`-файл `schaad-advisors-de.po` в `languages/`.
- При добавлении EN/FR через Polylang или WPML — нет переписывания, только дополнительные `.po`.
- URL-структура без хардкоженого `/de/` префикса. Polylang/WPML сами решают при активации.

### Хостинг

- **Phase 1 (сейчас):** GitHub Pages preview — `https://<username>.github.io/schaad-advisors-website/`
- **Phase 2 (production):** **Cyon** (Базель, Швейцария) или **Kinsta** (Frankfurt, EU). Финальный выбор — после согласования с Verena. Оба managed-WP, ~$10–30/мес. Швейцарский Cyon предпочтительнее для швейцарской аудитории (data residency, latency).
- **Production-домен:** `schaadadvisors.ch` (уже зарегистрирован).

### Контактная форма

- **Phase 1:** mailto: или простой `<form>` с PHP-mailer на email `mod.inbox@gmail.com` (Олег).
- **Phase 2:** WP-плагин **Contact Form 7** или **Fluent Forms Free** (бесплатные) → отправка на `jakob.schaad@schaadadvisors.ch`. **БЕЗ капчи** на старте (зафиксировано в CLAUDE.md). Если будет спам — добавим honeypot или Cloudflare Turnstile.

### Эстимейты (one person, базовый WP/ACF опыт)

| Этап | Дни |
|---|---|
| Тема скаффолд + theme.json + базовые ACF Blocks (3–4 блока) | 4–5 |
| CPT resources + taxonomy + archive/single templates | 2–3 |
| i18n-готовность (`.po`-файл, `__()` в темплейтах) | 1 |
| Контактная форма + email-настройка | 1 |
| Cross-browser + Lighthouse pass | 2 |
| **Итого Phase 2** | **~10–12 рабочих дней** |

## SEO baseline

Аудитория — топ-менеджеры, ищут через Google по «Government Relations Switzerland», «Regulatory Strategy Advisor», «VR-Mandat Risikoanalyse». SEO критично для discovery.

### Без обязательных платных подписок

Два варианта (выбрать один):

**A. RankMath Free**
- Бесплатный, без подписки.
- Sitemap, OG-tags, breadcrumbs, schema.org разметка автоматически.
- DE-локализация хорошая.

**B. Yoast Free**
- Стандартный выбор в DE-WordPress-комьюнити, многие ожидают именно его.
- Бесплатная версия чуть скуднее RankMath, но привычнее для немецкоязычного редактора.

**Рекомендация:** **Yoast Free** — Verena/немецкоязычные коллеги вероятно знакомы с интерфейсом, меньше барьер.

### Хардкод-минимум в теме (независимо от плагина)

- `<title>` и `<meta name="description">` per-page (через `wp_head` + `wp_title` фильтр).
- Open Graph + Twitter Card теги.
- `<link rel="canonical">`.
- `robots.txt` (стандартный WP даёт).
- `sitemap.xml` — стандартный WP с 5.5+ генерит автоматически (плюс плагин расширит).
- **JSON-LD schema.org** в `functions.php`:
  - `Person` для Jakob Schaad (name, jobTitle, alumniOf, knowsAbout)
  - `ProfessionalService` для услуг
  - `Article` для каждого Lesezeichen
  - `BreadcrumbList` для навигации

### Performance hygiene

- Inter Variable subsetting (только используемые weights, self-hosted).
- WebP для всех фото (Якоб, обложки Lesezeichen).
- `loading="lazy"` на не-hero `<img>`.
- Vite минификация CSS/JS.
- Critical CSS inline, остальное async.
- HTTP/2 hosting (Cyon/Kinsta оба поддерживают).
- Cache-headers через `.htaccess` или WP-Rocket Free.

## Открытые вопросы

- **Хостинг:** Cyon (CH) vs Kinsta (DE) — финал после Phase 1 approve. Cyon ближе для CH-аудитории, Kinsta technically лучше.
- **Полилог EN/FR:** на старте только DE, но архитектура готова. Когда добавлять — решит Verena (вероятно после launch DE-версии и сбора первого фидбека).
- **Аналитика:** GA4 vs Plausible (privacy-friendly, ~$9/мес) vs нет аналитики совсем. Якоб — швейцарский экономист, могут быть privacy-предпочтения.
- **Контактная форма SPAM:** если потребуется защита — Cloudflare Turnstile (бесплатный) или honeypot. Капча из CLAUDE.md явно не нужна.
