# Decisions Log — Schaad Advisors Website

**Назначение:** хронологический журнал ключевых решений по проекту с обоснованием. Каждое решение зафиксировано один раз, не размывается в чатах. Если решение пересматривается — добавляется новая запись с явным указанием «отменяет / уточняет ADR-XX».

Формат записей вдохновлён ADR (Architecture Decision Record), но упрощён.

---

## ADR-001 — Стек: Custom hybrid classic WordPress theme

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Контекст:** клиент требует WordPress (Verena/Якоб должны редактировать контент в админке). Сайт — премиум-визитка на 4 страницы. Требуется чистый код для быстрой интеграции и контроль над загрузкой/анимациями.

**Решение:**
- Custom hybrid classic theme (PHP-шаблоны + `theme.json` + editor styles).
- ACF Pro Blocks через `block.json` + CPT `resources` для Lesezeichen.
- Vanilla CSS с custom properties + PostCSS (autoprefixer, cssnano, preset-env).
- Vanilla JS + GSAP для анимаций. Self-hosted, не CDN.
- Vite минимальной конфигурации для DX и hashing.

**Альтернативы рассмотрены:**
- Block Theme (FSE) — отвергнут: даёт редактору слишком много свободы, риск сломать композицию премиум-дизайна.
- Headless WordPress + Astro/Next — отвергнут: для 4 страниц это архитектурная роскошь, два деплоя, выше точки отказа.

**Источник:** консультация с Codex — [01-response.md](../../oz/consilium/sessions/2026-04-26-ask-codex-schaad-stack/01-response.md).

---

## ADR-002 — Multi-language: только DE, архитектурно готовим к расширению

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Контекст:** Якоб говорит DE/EN/FR. Текущий контент — только DE. Швейцарские клиенты часто читают по-немецки.

**Решение:** запускаем только на DE. Архитектурно закладываем хуки i18n (`__()`/`_e()` в PHP, `.po`-файлы темы), компонентные классы без языковых префиксов. Расширение до Polylang/WPML — фаза 2 по запросу клиента.

**Альтернативы:** DE+EN сразу — отложено до явного запроса.

---

## ADR-003 — Структура: real multi-page (4 URL), не one-pager

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Контекст:** в HTML-вайрфрейме 4 «страницы» сделаны через JS show/hide одной HTML-страницы. Для production-WP это плохо (SEO, аналитика, шаринг).

**Решение:** 4 настоящих URL: `/`, `/ueber-mich/`, `/lesezeichen/`, `/kontakt/`. Каждая страница — отдельный шаблон в WP, отдельная единица в админке.

**Аргумент:** аудитория 60+ привыкла к multi-page, поисковые системы ранжируют страницы отдельно по своим ключам, контент-модель чище.

---

## ADR-004 — Тексты: используем 1:1 как в вайрфрейме, не переписываем

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Решение:** все тексты, включая Hero claim «Wissen bündeln. Interessen wahren. Brücken bauen.», описание услуг, FAQ, Lesezeichen-резюме — финальны. Дизайн строится под существующий контент.

**Импликация:** проектируем гибкие блоки с запасом по высоте (длинные DE-композиты вроде *Verwaltungsratspräsident*).

---

## ADR-005 — Типографика: Inter Variable, single-family

**Дата:** 2026-04-26
**Статус:** ✅ принято (после нескольких итераций)

**Контекст:** в вайрфрейме был Playfair Display + Inter. В ходе обсуждения:

1. Олег усомнился в Playfair Display: «нафталином попахивает».
2. Gemini подтвердил: Playfair — это «Fashion & Wedding», не подходит аудитории SNB/IMF/центробанков.
3. Gemini предложил Instrument Serif, Crimson Pro, Newsreader, Spectral.
4. Олег уточнил: клиент уже отверг Playfair в бизнес-карточке. Логотип — современный sans-serif с открытыми формами, отсылка к современности, не к классике. Любой serif в headings создаст конфликт.
5. Я предложил sans-only system: Switzer / Cabinet Grotesk + Albert Sans / General Sans + Public Sans.
6. Олег: «у них на сайте и визитке Inter».

**Решение:** **Inter Variable, single-family для всего сайта.**

- Identity-консистентность с уже одобренной бизнес-карточкой сильнее теоретических аргументов.
- Логотип — характерный, поэтому шрифт-носитель должен быть тихим и дисциплинированным. Inter ровно про это.
- Variable font в одном `.woff2`, веса 100–900, italic.
- Для дат/цифр — `font-feature-settings: 'tnum', 'cv11'` (табличные). Эффект «advisory-memo» без отдельного mono.

**Отвергнуто:**
- ❌ Playfair Display — клиент сам отверг в визитке.
- ❌ Любой serif для headings (Instrument Serif, Crimson Pro, Newsreader, Spectral, Playfair) — конфликт с современным sans-логотипом.
- ❌ Switzer / Cabinet Grotesk / General Sans — характерные, но ломают identity-консистентность с визиткой.
- ❌ Двух-семейный сетап — избыточен, логотип уже несёт характер.
- ❌ Mono-шрифт (IBM Plex Mono / JetBrains Mono) — не нужен; tabular numbers Inter покрывают эффект.

---

## ADR-006 — Hero-направление: Editorial Master + smart entrance

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Контекст:** Hero — фундамент проекта. Все три голоса (GPT, Gemini, диалог с Олегом) сошлись на одном направлении: editorial-композиция (как обложка серьёзного аналитического издания вроде Foreign Affairs или NZZ) + один характерный entrance-эффект.

**Решение:**
- Композиция: левая колонка — текст (eyebrow, H1 имя, claim italic, body, CTA-pair, tags-line снизу). Правая колонка — портрет Якоба (45–50% ширины, на фирменном фоне).
- Тонкая вертикальная линия из логотипа пробивает фото и заходит на текстовый блок.
- Фон: основной синий `#116490` с subtle noise (не плоский градиент).
- Smart entrance (один раз при первом визите, GSAP):
  1. Фон + портрет fade-in.
  2. Вертикальная линия растёт сверху вниз.
  3. Eyebrow → имя по буквам (stagger) → claim → body → CTA → tags.
- При `prefers-reduced-motion: reduce` — мгновенно.

**Отложено в next iteration (не MVP):**
- Cursor-reactive типографика (буквы реагируют на курсор + локальную яркость фото).
- `mix-blend-mode: difference` для имени над фото (риск контраста на разных мониторах).

**Источники:** GPT hero concept «Structured Intelligence»; Gemini Concept B (Editorial Master) + entrance из C; см. [01-response.md](../../oz/consilium/sessions/2026-04-26-ask-gemini-schaad-brief-critique/01-response.md).

---

## ADR-007 — Меню: горизонтальное текстовое + dot-indicator

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Контекст:** аудитория 60+, скрытое меню (hamburger) на десктопе для них — ошибка. Они хотят видеть структуру сайта сразу.

**Решение:**
- Desktop (≥ 768px): горизонтальное текстовое меню в шапке. Inter 500, 14px, не uppercase, tracking 0.05em.
- Mobile: hamburger → full-screen overlay, крупные пункты (Inter 600, 32px).
- Indication current page: **точка под пунктом** (4px circle, цвет `--blue`), не подчёркивание.
- Sticky smart: header скрывается при скролле вниз, выезжает при лёгком скролле вверх (cubic-bezier 280ms).

---

## ADR-008 — Lesezeichen: drawer slide-from-right (не center modal)

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Контекст:** Lesezeichen — страница книжно-журнального конспекта. Карточка с обложкой + краткое резюме. Если полное резюме не влезает в карточку, нужен «слой» с расширением.

**Решение:** drawer slide-from-right.

- Ширина 600px на desktop, full-screen на mobile.
- Список карточек остаётся видимым слева — сохраняется контекст.
- URL не меняется (это «слой», не переход).
- Закрытие: ESC, клик вне drawer, кнопка ✕.

**Аргумент:** center modal перекрывает всё и создаёт ощущение «прерывания»; drawer — это «рабочий» интерфейс (как Notion, Slack), естественный для аналитической аудитории.

---

## ADR-009 — Деплой: GitHub Pages для preview, WordPress для prod

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Решение:**

**Фаза 1 (сейчас):** статический preview на GitHub Pages.
- Репозиторий: `schaad-advisors-website` (GitHub аккаунт `chife-mod`).
- Структура: launcher на `/`, версии в подпапках (`/wireframe/`, `/concept-1/`, …).
- Pages serves `main` branch root.
- Демонстрация Verena/Якобу — с GitHub Pages.

**Фаза 2 (после утверждения дизайна):** WordPress на `schaadadvisors.ch`.
- Hosting: Cyon (Базель) или Kinsta (Frankfurt).
- Контактная форма: SMTP на `mod.inbox@gmail.com`, потом перенастройка на `jakob.schaad@schaadadvisors.ch`.

---

## ADR-010 — Service Menu (preview navigation): floating widget bottom-right

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Контекст:** для презентации клиенту нужно переключаться между Wireframe (оригинал клиента), Concept 1, Concept 2 и т.д. Топ-полоса портила бы viewport-расчёты hero.

**Решение:**
- Floating widget в `position: fixed; bottom: 24px; right: 24px`.
- В покое — небольшая капсула с иконкой layers + текущая версия, opacity 0.65.
- Hover/click — раскрывается список всех версий, opacity 1.
- Z-index очень высокий (`9999`), всегда поверх контента.
- На production-build для WP — отключается через build flag.
- Реализация: один общий `shared/service-menu.js` + `shared/service-menu.css`, инжектится в каждую preview-версию через `<script defer>`.

**Альтернативы отвергнуты:**
- Полоса сверху — портит layout, влияет на hero.
- Полноценный launcher на `/` без виджета — хуже UX (нужно возвращаться).

---

## ADR-011 — Контактная форма: пока на email, без капчи

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Решение:**
- Получатель формы — email Олега (`mod.inbox@gmail.com`) на этапе разработки.
- Финальная перенастройка на `jakob.schaad@schaadadvisors.ch` после запуска прода.
- Капча: пока не подключаем. Если начнётся спам — добавим hCaptcha (privacy-friendly, GDPR/Swiss DPA).

---

## ADR-012 — Фото: финальные, дополнительной съёмки не будет

**Дата:** 2026-04-26
**Статус:** ✅ принято

**Решение:**
- Используем существующие студийные портреты Якоба: `_DSC1123_b.jpg` (head & shoulders) и `_DSC1265_a.jpg` (полроста).
- Возможна творческая компоновка: cut-out на фирменный синий, на фрагмент административного здания.
- Партнёры: Verena ✓, для двух остальных (Dorian Ranger, Samuel Bond) — плейсхолдер.
- Логотипы Engagements (Alpha MET, Richfox Capital, Kaderschule) — собрать вместе с Олегом.
- Lesezeichen — карточки с обложками книг/статей (не текстовые).

---

## ADR-013 — Дизайн-система: tokens.css как Figma-mirror палитра + семантические алиасы

**Дата:** 2026-04-30
**Статус:** ✅ принято

**Контекст:** на проекте появились параллельные surface'ы (home / sandbox / uikit / concept-1 / concept-2). Каждый имел свои hex'ы — рассинхронизация неминуема. Verena утвердила цветовую палитру с именованными токенами в Figma (node 18:413).

**Решение:**
- `shared/tokens.css` — единственный источник правды. Содержит **именованную палитру 1:1 с Figma**: `--color-abyss / --color-atlas-dk / --color-atlas / --color-charcoal / --color-pewter / --color-alpine / --color-border / --color-sky-pale / --color-paper / --color-white`.
- Поверх — **семантические алиасы**: `--color-accent → atlas`, `--color-ink → charcoal`, `--color-mute → pewter`, `--color-divider → border`, `--color-paper`, `--color-bg-deep` (#072634, concept-specific для hero).
- Components используют **только семантические алиасы**, не именованные токены — это даёт ребрендинг через одну строку: `--color-accent` переключаешь, всё перекрашивается.
- `shared/components.css` — атомарные компоненты на токенах (.btn, .chip, .eyebrow, .ring-mark, .section-index, .tnum, .hairline). Без хардкода.

---

## ADR-014 — Sandbox + UIKit архитектура для вариантов и design-system

**Дата:** 2026-04-30
**Статус:** ✅ принято

**Контекст:** в процессе дизайна возникает 2-3 альтернативных варианта одной секции. Раньше они жили на одной странице и мешали выбору. Также нужна visual-reference палитры/компонентов.

**Решение:**
- `/home/` — **canonical** живая страница, единственная композиция, утверждённая клиентом.
- `/sandbox/` — **playground** для экспериментальных вариантов. Каждый блок обёрнут в `.sandbox-block` с индексом (B/01, B/02 ...) и dev-only описанием. Стили в `sandbox/styles.css` независимо от home.
- `/uikit/` — **visual-reference** дизайн-токенов и компонентов. Левый sidebar-фильтр (Colors / Typography / Spacing / Effects / Components / States / Motion). Default filter = «All».
- **Правило вариантов**: A и B (если живут параллельно) **изолированы**. Комментарий про A не применяется к B и наоборот.

**Связанные файлы:**
- `shared/preview-config.js` — единый список версий для chip-навигатора (`window.PREVIEW_VERSIONS`).
- `shared/service-menu.js` + `service-menu.css` — generic chip + 12-col grid-toggle. Project-agnostic. Источник: oz/Project Dashboard template.

---

## ADR-015 — bg-studio: генеративный dark-backdrop вместо растровых фото

**Дата:** 2026-04-30
**Статус:** ✅ принято

**Контекст:** на hero и CTA одинаковая концепция «тёмный navy с зерном». Раньше использовались разные растры (`06.webp` на hero, `04 copy.webp` на CTA), при `cover`-фитинге каждый файл масштабировался по своим габаритам — **зерно получалось разное**. Это разрушало brand-консистентность.

**Решение:** ввести утилитарный класс **`.bg-studio`** — генеративный dark-backdrop:

1. **Halo** через `radial-gradient(ellipse 70% 60% at 50% 35%, rgba(17,100,144,0.22), transparent 65%)` поверх `var(--color-bg-deep)`.
2. **Film grain** через `::before` с inline-SVG `<feTurbulence type='fractalNoise' baseFrequency='0.85'>` + `<feComponentTransfer slope=3 intercept=-1>` (контраст pumped к чёрно-белым) + `mix-blend-mode: overlay; opacity: 0.85`.

**Преимущества:**
- **Идентичное зерно** на любых размерах секции — turbulence генерится pixel-perfect, не растягивается.
- **~300 байт** inline-SVG вместо 600KB+ webp.
- Halo на overlay-blend сохраняет среднюю яркость bg.
- Изменение в `.bg-studio` обновляет ВСЕ surface'ы.

**Где применяется:** `.hero` + `.cta` на home (`class="hero bg-studio"` / `class="cta bg-studio"`).

---

## ADR-016 — Hero service rings: overflow в Leistungen + plus colour-switch

**Дата:** 2026-04-30
**Статус:** ✅ принято

**Контекст:** ring-strip живёт внизу hero. Обычно секции «упираются друг в друга», hero overflow:hidden обрезает кольца на стыке. Олег предложил пустить кольца **через границу** — наезжать на белый Leistungen ниже, создавая **page-level visual rhyme**.

**Решение:**
- `.hero { overflow: visible; z-index: 5; }` — кольца спускаются на ~86px ниже низа hero и **перекрывают первую часть Leistungen**.
- Stroke колец — `var(--color-atlas)` — синий читается и на dark hero, и на белом Leistungen.
- **Plus-glyph** (`+` в gap кольца) переключается между белым и atlas-blue **по позиции относительно границы** через rAF-цикл: каждый кадр считаем `plus.midY` vs `hero.bottom`, тоггл класса `.on-light`. Cheap (~60fps), синхронно с spin-анимацией.
- Default plus = white (читается на dark navy), `.on-light` = atlas-blue (читается на белом).

**Альтернативы:**
- Чисто-CSS через `mix-blend-mode: difference/exclusion` — отвергнуто, не даёт ровно «white-on-dark, blue-on-white».
- SVG `<mask>` с градиентом по viewport-y — сложно из-за вращения колец.

---

## ADR-017 — Section rhythm: padding 120/120 на всех контентных секциях

**Дата:** 2026-04-30
**Статус:** ✅ принято

**Контекст:** до унификации секции имели разные top/bottom padding'и (Leistungen 120/160, CTA 160/160, FAQ 160/160). Страница ощущалась как «коллекция блоков», не как ритм-документ.

**Решение:** все три контентные секции (`Leistungen`, `CTA`, `FAQ`) — **`padding: clamp(72px, 10vw, 120px) 0`**. 120/120 на десктопе, плавный спуск к 72/72 на мобильном.

**Эффект:** страница звучит как **единый ритмичный документ**. Müller-Brockmann: повторяемость = инструмент.

**Hero** не имеет padding — фиксированная высота `max(800px, 100vh)`.

---

## ADR-018 — Leistungen: numbered-circle вариант canonical, atlas-blue refresh

**Дата:** 2026-04-30
**Статус:** ✅ принято · клиент утвердил

**Контекст:** прорабатывали 2 варианта секции «6 Leistungsbereiche»:
- **Variant A** — Swiss editorial с crop-mark уголками на каждой карточке (1px L's в углах, gap 0 → T-junctions на стыках, mono `01-06` в верхнем-левом углу).
- **Variant B** — numbered circles над заголовком (48px, charcoal disc с белой цифрой).

**Решение:** клиент выбрал **Variant B** для canonical home. Variant A перенесён в `/sandbox/` (block B/01) как reference.

**Refresh:** заливка кружков — `var(--color-atlas)` (вместо изначального charcoal). Прямая рифма с hero ring stroke (тот же brand-blue).

---

## ADR-019 — CTA: Editorial Spread canonical · Ringed Manifesto в sandbox

**Дата:** 2026-04-30
**Статус:** ✅ принято

**Контекст:** прорабатывали 3 варианта CTA — V1 Editorial Spread (3-col tags-margins вокруг центра), V2 Tonhalle Index (massive headline + numbered editorial index), V3 Ringed Manifesto (8 atlas-rings tile across bottom + asymmetric headline).

**Решение:**
- **Canonical = V1 Editorial Spread** (на home). Симметричные хайрлайн-pill теги слева/справа, центр с eyebrow + H2 + body + primary button. На bg-studio.
- **V3 Ringed Manifesto** перенесён в `/sandbox/` (block B/02) — alt-вариант на 1440-frame.
- **V2 Tonhalle Index** — отвергнут (выглядел SaaS-ы, не швейцарски-тихо).

---

## ADR-020 — FAQ: native `<details>` + sticky title + paper bg + white plate active

**Дата:** 2026-04-30
**Статус:** ✅ принято

**Контекст:** нужен accordion FAQ. Подходы — JS-managed, native `<details>`, CSS-only через `:checked` + radio-input.

**Решение:** native `<details>/<summary>`:
- **Accessibility OOTB** — браузер сам управляет ARIA, клавиатура, screen-reader.
- **Zero JS** — accordion работает без скриптов.
- **Layout:** 2-col editorial — title слева (`position: sticky; top: 80px`), accordion справа (`5fr / 7fr`).
- **Bg:** `var(--color-paper)` (#F4F6F8) — break после dark CTA.
- **Active state:** `.faq__item[open] { background: var(--color-white); }` — открытая карточка поднимается на белую плашку против paper. Question + chevron в `var(--color-atlas)`.

**Контент:** 7 Q/A из вайрфрейма, дословно.

---

## Открытые вопросы (требуют решения позже)

- [ ] Cursor-reactive Hero-эффект — реализуем после утверждения базового варианта.
- [ ] Логотипы Engagements — собрать с сайтов компаний.
- [ ] Юридический footer (Impressum, Datenschutz) — запросить у Verena.
- [ ] Партнёр Samuel Bond — текст и плейсхолдер фото.
- [ ] Финальный hosting (Cyon vs Kinsta) — после согласования с Verena.
