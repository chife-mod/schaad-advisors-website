# Schaad Advisors Website — проектный контекст

## О проекте

Сайт для **Dr. Jakob Schaad** — швейцарский экономист-консультант (МВФ, SNB, советник министра экономики, SwissBanking, Avenir Suisse). Сейчас independent advisor в Цюрихе.

**Услуги:** Government Relations & Advocacy, Regulatory Strategy, Geopolitical Risk Analysis, VR-мандаты, Ausbildung (CWMA), Vorträge.

**Аудитория:** топ-менеджеры и советы директоров международных компаний (энергетика, финансы, торговля сырьём), 50–70 лет, аналитический склад.

**Цель сайта:** digital business card + authority signal. Не lead-gen в классическом смысле.

## Заказчик / клиентская цепочка

- **Прямой клиент Олега:** Verena Parzer-Epp (PR/коммуникации) — её контакт.
- **Конечный клиент:** Dr. Jakob Schaad — за дизайн «голосует» он. Verena модерирует.
- Verena уже работает с нами, получила бизнес-карточку (от которой она в восторге).

## Стек (зафиксирован)

**Custom hybrid classic WordPress theme + ACF Pro Blocks (block.json) + CPT для Lesezeichen + vanilla CSS с custom properties + PostCSS + Vite + vanilla JS + GSAP.**

- **CMS:** WordPress (классическая PHP-тема + theme.json + editor styles).
- **CSS:** vanilla + custom properties, PostCSS (autoprefixer, cssnano, preset-env). НЕ Tailwind, НЕ Sass.
- **JS:** vanilla + GSAP (бандлится локально, не CDN).
- **Сборка:** Vite (минимальный конфиг).
- **Контент-модель:** ACF Blocks для повторяемых секций; CPT `resources` + taxonomy `resource_category` для Lesezeichen.
- **Multi-language:** только DE на старте, архитектурно готовим к Polylang/WPML (i18n-ready, никаких хардкоженых `/de/`-префиксов, тексты в `.po`-файлах темы).
- **Класс-нейминг:** компонентный (`c-hero`, `c-resource-card`). Никаких `.section:nth-child(3)`.

Полный диалог про выбор стека: [/Users/oleg/My Drive/Dev/Project/oz/consilium/sessions/2026-04-26-ask-codex-schaad-stack/01-response.md](../../oz/consilium/sessions/2026-04-26-ask-codex-schaad-stack/01-response.md).

## Деплой и публикация

**Фаза 1 (сейчас):** статический прототип → **GitHub Pages** для показа Verena/Якобу.

- Репозиторий: `schaad-advisors-website` (kebab-case, под именем проекта).
- Хостинг превью: GitHub Pages (gh-pages branch или Pages from main/docs).
- Команда: пуш кода → автоматический деплой через GH Actions (workflow в `.github/workflows/deploy.yml`).
- Домен превью: `https://<username>.github.io/schaad-advisors-website/`.

**Фаза 2 (после утверждения дизайна):** WordPress-интеграция.

- Production-домен: `schaadadvisors.ch` (уже зарегистрирован).
- Hosting: ориентир — Cyon (Базель) или Kinsta (Frankfurt). Финальный выбор после согласования с Verena.
- Контактная форма: пока на email `mod.inbox@gmail.com` (Олег), потом перенастроим на `jakob.schaad@schaadadvisors.ch`.
- Капча: пока не нужна.

## Дизайн-параметры

**Палитра** (из бизнес-карточки и существующего вайрфрейма):
- `--blue: #116490` (основной)
- `--blue-dark: #0d4f72`
- `--blue-light: #9FBACD`
- `--blue-pale: #e8f2f7`
- `--charcoal: #1e2a35` (текст)
- `--gold: #b5910a` (акцент, использовать редко)

**Типографика (финал — Inter Variable, single-family):**

Логика: бизнес-карточка использует **Inter** и клиент её утвердил. Identity-консистентность сильнее теоретических аргументов. Логотип «Schaad Advisors» сам по себе характерный — поэтому шрифт сайта должен его **поддерживать**, а не конкурировать. Inter ровно про это: дисциплинированный, тихий, нейтральный.

**Стек:**
- **Inter Variable** (единственный шрифт). Self-hosted WOFF2, variable-font, 100–900 весов в одном файле.
- **Hero H1:** Inter 700–800, clamp(64px, 9vw, 112px), letter-spacing −0.02em.
- **H2/H3:** Inter 600.
- **Body:** Inter 400, line-height 1.65.
- **Eyebrow / nav / tags:** Inter 500, uppercase, letter-spacing 0.12em.
- **Цифры/даты:** `font-feature-settings: 'tnum', 'cv11'` — табличные пропорциональные. «Advisory-memo» feel без отдельного mono.
- Preload только variable-axis-файла, `font-display: swap`.

**ОТКАЗАЛИСЬ:**
- ❌ Playfair Display — клиент отверг в визитке («нафталином попахивает»).
- ❌ Любой serif в headings — несовместим с современным sans-логотипом.
- ❌ Двух-семейный сетап (heading + body) — избыточен; логотип уже несёт характер, шрифт-носитель должен быть тихим.
- ❌ Mono-шрифт — не нужен; tabular numbers Inter покрывают эффект «документа».

**Тон:** «Smart Swiss» — простой, точный, премиальный, тихий. Эйнштейн: «as simple as possible, but not simpler». Чуть-чуть выходим за грань простоты — один умный микро-эффект, не ковёр анимаций.

**Анимации:** GSAP, дисциплинированно. Reveal-on-scroll, magnetic-кнопки, тонкая типографика. Уважать `prefers-reduced-motion`.

**Идея для hero:** текст над портретом Якоба, реагирующий на курсор + локальную яркость фото (буквы чуть растут/уменьшаются, с возможным `mix-blend-mode: difference` или `exclusion`). Это «smart» эффект, на котором держится визуальная подпись сайта.

## Структура (4 страницы)

1. `/` (Startseite) — hero + 6 услуг + CTA-блок + FAQ + LinkedIn-секция (заглушка).
2. `/ueber-mich/` — биография, карьера (6 позиций, аккордеон), Multiperspektiven, Engagements, Netzwerk, CTA.
3. `/lesezeichen/` — фильтруемая сетка карточек (книги/статьи). Drawer/popup для полного конспекта если не влезает в карточку.
4. `/kontakt/` — форма + контакты + локация.

## Контент

- **Текст:** FINAL. Не меняем (только для адаптации длин под дизайн).
- **Язык:** только DE сейчас.
- **Фото Якоба:** `01_materials/_DSC1123_b.jpg` (head & shoulders) и `_DSC1265_a.jpg` (полроста, руки скрещены). Возможна творческая компоновка (cut-out на фирменный фон / здание).
- **Фото партнёров:** Verena ✓, для двух остальных (Dorian Ranger, Samuel Bond) — плейсхолдер.
- **Логотипы Engagements** (Alpha MET, Richfox, Kaderschule) — собрать вместе с Олегом.
- **Lesezeichen:** карточки **с обложками** книг/статей. Полный конспект — в drawer/popup.

## Сроки

- **Понедельник 2026-04-27:** показать главную страницу. Воскресенье 26-е — день разработки.
- Финальный запуск WP — после утверждения дизайна (точные сроки определяются позже).

## Папочная структура

- `01_materials/` — входные материалы от заказчика (HTML-вайрфрейм, фото).
- `02_assets/` — фирменный логотип SVG.
- `03_docs/` — наши документы (бриф, дизайн-токены, content model).
- (после старта разработки) `src/`, `dist/`, `.github/workflows/`, `index.html` etc.

## Принципы работы

- **Олег пишет на русском, отвечаем на русском.**
- **Объявляем использование скиллов/инструментов** (правило из глобального CLAUDE.md): `🧠 Использую скилл …`, `🔧 Использую …`.
- **Премиум через простоту.** Никаких маркетинговых эффектов «лишь бы было». Каждое решение — обоснованно.
- **Content modeling = часть дизайна.** Каждый блок проектируем сразу с учётом ACF-полей, лимитов, fallback.
