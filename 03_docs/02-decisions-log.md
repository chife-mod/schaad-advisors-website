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

## Открытые вопросы (требуют решения позже)

- [ ] Cursor-reactive Hero-эффект — реализуем после утверждения базового варианта.
- [ ] Логотипы Engagements — собрать с сайтов компаний.
- [ ] Юридический footer (Impressum, Datenschutz) — запросить у Verena.
- [ ] Партнёр Samuel Bond — текст и плейсхолдер фото.
- [ ] Финальный hosting (Cyon vs Kinsta) — после согласования с Verena.
