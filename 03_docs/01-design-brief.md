# Design Brief — Schaad Advisors Website

**Версия:** 1.0 — финальная (консолидация GPT + Codex + Gemini + диалога с заказчиком)
**Дата:** 2026-04-26
**Документ ведёт:** Олег (PM/designer-coordinator)
**Конечный stakeholder:** Dr. Jakob Schaad
**Промежуточный stakeholder:** Verena Parzer-Epp

---

## 1. Контекст

Сайт для **Dr. Jakob Schaad** — швейцарский экономист-консультант с 30+ годами опыта на пересечении экономики, политики и регулирования.

**Биография в двух словах:** МВФ (Senior Advisor к Executive Director, Washington D.C.) → Швейцарский Национальный Банк (член правления, международные валютные отношения) → советник министра экономики Doris Leuthard (EVD) → SwissBanking (зам. CEO, Private Banking & Markets) → Avenir Suisse (вице-директор, think tank) → партнёр LINDEMANNLAW. Сейчас независимый advisor в Цюрихе.

**Текущие услуги:** Government Relations & Advocacy, Regulatory Strategy (энергетика, финансы, торговля сырьём), Geopolitical Risk Analysis, VR-мандаты (Verwaltungsrat), обучение (CWMA-сертификация), публичные выступления (DE/EN/FR).

**Текущие мандаты:** Verwaltungsratspräsident Alpha MET AG (Basel, торговля сталью/сырьём), Member VR Richfox Capital (Zürich), Teaching & Research Kaderschule Zürich.

## 2. Цель сайта

**Не lead-generation в классическом смысле.** Это **digital business card + authority signal**. Человек приходит после знакомства, упоминания на конференции, из LinkedIn — чтобы убедиться в калибре и написать.

Главное чувство сайта: **«здесь человек, которому можно доверить сложный вопрос».**

## 3. Аудитория

- Возраст: **55–70 лет**.
- Роли: топ-менеджеры, владельцы бизнеса, председатели/члены VR, представители фондов и ассоциаций, аналитики, учёные, представители regulated industries.
- Сферы: политика, финансы, энергетика, сырьевые рынки, международные институты.
- Поведение: читают вдумчиво, на десктопе, спокойно. Не сканируют — читают целиком. Считывают фальшь и шаблонность за секунду.

**Дизайн-импликации:**
- Крупная типографика (body ≥ 18px, line-height 1.65).
- Очевидная навигация (горизонтальное меню, не hamburger на десктопе).
- Высокая контрастность (целевая планка — **WCAG AAA**, не только AA).
- Никакого визуального шума и «маркетинговой» энергии.

## 4. Образ бренда

| Качество | Что это значит на практике |
|---|---|
| **Умный** | Контент имеет глубину, дизайн не пытается выглядеть умнее контента. |
| **Сдержанный** | Минимум цветов, минимум эффектов, ничего лишнего. |
| **Швейцарски точный** | Сетка работает до пикселя. Отступы — система, не вкус. |
| **Премиальный без роскоши** | Премиальность через тишину и пропорции, не через золото и градиенты. |
| **Авторитетный, но не тяжёлый** | Воздух между блоками, лёгкость в движениях. |
| **Современный** | Логотип уже задал направление: отсылка к современности. Серьёзная классика 19 в. — не наш язык. |

**Финальный принцип:** Эйнштейн — «as simple as possible, but not simpler». Один умный микро-эффект где надо, никакого ковра анимаций.

## 5. Позиционирование

**Claim (немецкий, оригинал):**
> Wissen bündeln. Interessen wahren. Brücken bauen.

**Smysловая рамка (English):**
> Expertise at the intersection of economy, politics, regulation and strategic advisory.

**Тексты не переписываем.** Контент в HTML-вайрфрейме — финал. Дизайн строится под этот контент, а не наоборот.

## 6. Технический стек (зафиксирован)

После консультации с Codex:

- **CMS:** WordPress, custom **hybrid classic theme** (PHP-шаблоны + `theme.json` + editor styles).
- **CSS:** vanilla + custom properties + PostCSS (autoprefixer, cssnano, preset-env). НЕ Tailwind, НЕ Sass.
- **JS:** vanilla + GSAP. Self-hosted, не CDN.
- **Сборка:** Vite (минимальный конфиг, генерирует hashed `.css` / `.js` для подключения через `wp_enqueue_*`).
- **Контент-модель:** ACF Pro Blocks через `block.json` + CPT `resources` + taxonomy `resource_category` для Lesezeichen.
- **Multi-language:** только DE на старте. Архитектурно готовим к Polylang/WPML (i18n-ready, `__()`/`_e()`-обёртки, никаких `/de/`-префиксов в шаблонах).
- **Класс-нейминг:** компонентный (`c-hero`, `c-resource-card`, `c-bio-timeline`). Никаких `nth-child`-селекторов.

**Production hosting (фаза 2):** Cyon (Базель) или Kinsta (Frankfurt). Финальный выбор после согласования.

**Preview hosting (фаза 1, сейчас):** GitHub Pages, репозиторий `schaad-advisors-website`, автодеплой через GH Actions.

## 7. Визуальная система

### 7.1 Палитра (зафиксирована из бизнес-карточки)

```css
--blue:        #116490;  /* основной фирменный синий */
--blue-dark:   #0d4f72;  /* для тёмных фонов и hover */
--blue-light:  #9FBACD;  /* акцент, светлый шрифт на тёмном */
--blue-pale:   #e8f2f7;  /* очень светлый фон секций */
--charcoal:    #1e2a35;  /* основной текстовый, не чёрный */
--mid:         #6b7c8d;  /* secondary text */
--light:       #f4f6f8;  /* нейтральный светлый фон */
--white:       #ffffff;
--border:      #d8e5ed;
--gold:        #b5910a;  /* зарезервирован, использовать ОЧЕНЬ редко */
```

Премиальность строится **на пропорциях, типографике и тишине**, а не на расширении палитры.

### 7.2 Типографика — **Inter Variable**, single-family

Identity-консистентность с бизнес-карточкой. Логотип сам по себе характерный — Inter поддерживает его, не конкурирует.

| Уровень | Шрифт | Вес | Размер | Letter-spacing |
|---|---|---|---|---|
| Hero H1 | Inter | 700–800 | clamp(64px, 9vw, 112px) | −0.02em |
| H2 | Inter | 600 | clamp(40px, 5vw, 64px) | −0.015em |
| H3 | Inter | 600 | clamp(28px, 3.2vw, 40px) | −0.01em |
| Body | Inter | 400 | 18–19px | 0 |
| Body lead | Inter | 400 | 22–24px | 0 |
| Caption | Inter | 500 | 13–14px | 0.04em |
| Eyebrow / nav / tags | Inter | 500 | 12–13px | 0.12em UPPERCASE |
| Числа/даты | Inter | — | — | `font-feature-settings: 'tnum', 'cv11'` |

Шрифт self-hosted, WOFF2, variable axis в одном файле. Preload только critical-веса для Hero.

**Что отвергнуто:** Playfair Display (клиент сам отверг в визитке), любой serif в headings (несовместим с современным sans-логотипом), двух-семейный сетап (избыточен).

### 7.3 Сетка

- **12 колонок** на desktop, gap 24px, max-width контейнера 1280px.
- **8 колонок** на tablet (768–1023), gap 20px.
- **4 колонки** на mobile, gap 16px.
- Опорный шаг отступов: **8px-grid** (8 / 16 / 24 / 32 / 48 / 64 / 96 / 128).
- Вертикальный ритм между секциями: **clamp(96px, 12vw, 160px)**.

### 7.4 Графический мотив

Из логотипа берём **тонкие вертикальные линии с пересечениями** — это фирменный знак. Используем:

- 1–2 тонкие вертикали в Hero (1px, цвет `--blue-light` на тёмном или `--blue` на светлом).
- Не по центру — со смещением.
- Могут «пробивать» layout (заходить на фото, на текст).
- Тонкий мотив — повторяется в разделителях секций, в активном пункте меню, в CTA.

### 7.5 Принципы анимации

**Что используем (тонко):**
- Fade-in блоков при scroll (`opacity 0 → 1`, `translateY 20px → 0`, 600ms ease-out).
- Stagger появления букв в Hero H1 (40ms delay, 600ms duration).
- Hover на CTA: лёгкий color shift + микро-сдвиг подчёркивания (200ms).
- Открытие/закрытие аккордеонов: max-height с easing (300ms).
- Drawer Lesezeichen: slide-from-right (320ms cubic-bezier).
- **Уважаем `prefers-reduced-motion`** — все анимации отключаются.

**Что НЕ используем:**
- ❌ Parallax как основной эффект.
- ❌ Сложные canvas-анимации.
- ❌ Page transitions между URL.
- ❌ `mix-blend-mode` на старте (риск контраста на разных мониторах — тестируем потом).
- ❌ Декоративные эффекты «лишь бы было».

## 8. Структура сайта (4 страницы)

| URL | Шаблон | Содержание |
|---|---|---|
| `/` | `front-page.php` | Hero · 6 услуг · CTA-блок · FAQ · LinkedIn-секция · footer |
| `/ueber-mich/` | `page-ueber-mich.php` | Hero-bio · Karriere (аккордеон, 6 позиций) · Multiperspektiven · Engagements · Netzwerk · CTA |
| `/lesezeichen/` | `page-lesezeichen.php` | Intro · фильтры · сетка карточек · drawer для полного конспекта |
| `/kontakt/` | `page-kontakt.php` | Intro · форма · контакты · LinkedIn |

Real multi-page (не one-pager). Каждая страница — отдельный URL, отдельная аналитика, отдельная единица в WP-админке.

## 9. ★ Hero-концепция (фундамент)

**Направление:** Editorial Master с smart entrance — выбрано после консолидации GPT (Structured Intelligence) и Gemini (Editorial B + entrance из C). Все три голоса сошлись.

### 9.1 Композиция

```
┌────────────────────────────────────────────────────────────────┐
│ schaad advisors logo               Startseite · Über · Lese · K │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ▏ ECONOMIC POLICY · FINANCE · ADVISORY                          │
│                                                                  │
│  Dr. Jakob                                                       │
│  Schaad                              [    портрет Якоба     ]   │
│  ──────                              [   занимает 45–50%    ]   │
│                                      [   правой колонки     ]   │
│  Wissen bündeln.                     [                       ]   │
│  Interessen wahren.        ▏ ◀── вертикальная линия              │
│  Brücken bauen.              пробивает фото и заходит            │
│                              на текстовый блок                   │
│                                                                  │
│  30 Jahre Erfahrung in Wirtschaft, Politik und Regulierung,     │
│  davon 15 in Spitzenpositionen wirtschaftspolitischer           │
│  Entscheidungsträger. Promovierter Ökonom mit                   │
│  internationaler Perspektive.                                    │
│                                                                  │
│  [ Gespräch vereinbaren ]    Mehr erfahren →                    │
│                                                                  │
│  ─── ADVOCACY · GOV. RELATIONS · REGULIERUNG · GEOPOLITIK ───   │
└────────────────────────────────────────────────────────────────┘
```

### 9.2 Слои (от заднего к переднему)

1. **Фон:** `--blue` основной, со sub-tle noise/material, не плоский градиент.
2. **Портрет Якоба** (`_DSC1265_a.jpg`, обработанный — cut-out + перевод на фирменный фон): правая половина hero, ~45–50% ширины. Возможна лёгкая desaturation для editorial-feel.
3. **Графическая структура:** одна тонкая вертикаль (1px, `--blue-light` 60% opacity) пробивает фото снизу вверх и заходит на текстовый блок слева.
4. **Контент:**
   - **Eyebrow** (Inter 500, 12–13px, uppercase, tracking 0.12em, цвет `--blue-light`): «ECONOMIC POLICY · FINANCE · ADVISORY».
   - **H1** (Inter 800, clamp 64–112px, tracking −0.02em, цвет `white`): «Dr. Jakob Schaad».
   - **Claim** (Inter 400, italic, clamp 24–32px, цвет `--blue-light`): «Wissen bündeln. Interessen wahren. Brücken bauen.»
   - **Body** (Inter 400, 19px, line-height 1.65, max-width 480px, цвет `white` 88% opacity): параграф про 30 лет.
   - **CTA primary** (Inter 500, 15px, uppercase, tracking 0.06em, soft outline `1px solid white 40%`, padding 16/32, hover: fill `white 8%`): «Gespräch vereinbaren».
   - **CTA secondary** (text link с правой стрелкой, без подчёркивания, hover: lateral shift стрелки 4px): «Mehr erfahren →».
   - **Tags** (Inter 500, 12px, uppercase, tracking 0.12em, разделитель ` · `, цвет `--blue-light` 70%): нижняя кромка hero.

### 9.3 Smart entrance (single GSAP-эффект)

При первой загрузке:

1. T+0ms: фон + портрет fade-in (400ms).
2. T+200ms: вертикальная линия растёт сверху вниз (`scaleY 0 → 1`, transform-origin top, 800ms cubic-bezier).
3. T+400ms: Eyebrow fade-in + slight slide from left (12px, 500ms).
4. T+500ms: Имя «Dr. Jakob Schaad» — буквы появляются по одной (stagger 35ms через GSAP SplitText или самописный split на `<span>`-ах). Каждая буква: `opacity 0 → 1`, `translateY 12px → 0`, 600ms.
5. T+1100ms: Claim fade-in.
6. T+1300ms: Body fade-in.
7. T+1500ms: CTA pair fade-in.
8. T+1700ms: Tags-line slide-up из нижней кромки.

Полный entrance — ~2.2 секунды. Один раз при первом визите. На последующих переходах — мгновенное появление (cookie/sessionStorage). При `prefers-reduced-motion: reduce` — всё мгновенно.

### 9.4 Что НЕ делаем на старте

- `mix-blend-mode: difference` для имени над фото — отложили до second iteration (риск контраста на разных мониторах).
- Cursor-reactive типографика (буквы реагируют на курсор + локальную яркость) — в плане, но не в MVP. Сначала решим базовый Hero — затем эту «вишенку» добавим, если фронтендщик подтвердит, что в WP это не сломается.

## 10. Меню и каркас

### 10.1 Header

- **Sticky smart:** при скролле вниз header скрывается, при лёгком скролле вверх — выезжает (cubic-bezier 280ms). Не назойливый.
- Высота: 80px (desktop) / 64px (mobile).
- Слева: логотип SVG (cliccable, ведёт на `/`).
- Справа: горизонтальное текстовое меню — **никакого hamburger на desktop**.
- Пункты: «Startseite · Über mich · Lesezeichen · Kontakt» (Inter 500, 14px, tracking 0.05em, не uppercase).

### 10.2 Indication current page

**Не подчёркивание** (выглядит как ссылка из 90-х). Вместо этого — **точка снизу под пунктом** (4px circle, цвет `--blue`, отступ 6px от текста). Тонко, дизайнерски, не отвлекает.

### 10.3 Mobile

На ширинах ≤ 767px — hamburger (1 иконка, 24×24px), раскрывает full-screen overlay с большими пунктами (Inter 600, 32px). Закрытие по тапу на пункт или крест в углу.

### 10.4 Footer

Минималистичный: логотип, контакты (адрес, телефон, email), LinkedIn, copyright + Impressum/Datenschutz (отдельные страницы — добавим позже).

## 11. Content Model (для WP-фазы)

### 11.1 Pages

| Page | ACF Blocks |
|---|---|
| Startseite | `Hero`, `Services Grid (6 cards)`, `CTA Box`, `FAQ Accordion`, `LinkedIn Embed` |
| Über mich | `Hero Bio`, `Career Timeline (repeater)`, `Multiperspective`, `Engagements (repeater, 3 cards)`, `Network (repeater, 3 partners)`, `CTA` |
| Lesezeichen | `Intro`, `Filter Bar`, `Resources Grid` (получает из CPT) |
| Kontakt | `Intro`, `Form`, `Contact Info`, `Social` |

### 11.2 CPT `resources` (Lesezeichen)

**Fields:**
- `title` (стандарт WP)
- `author` (text)
- `type` (select: book / article)
- `source_url` (url, опционально)
- `summary_short` (textarea, до 280 символов — для карточки)
- `summary_full` (wysiwyg — для drawer)
- `key_takeaways` (repeater, по 1 строке)
- `cover_image` (image, обязательно)
- `published_year` (number)

**Taxonomy `resource_category`:** «Politik», «Finanzen», «Geopolitik» (расширяемо).

### 11.3 ACF Blocks через `block.json`

PHP-рендеринг шаблонами, не React. Это даёт предсказуемый HTML и быстро интегрируется.

## 12. Lesezeichen UX — drawer

**Slide-from-right** (не center modal):

- Тригер: клик на карточку → drawer выезжает справа, ширина 600px (desktop) / 100% (mobile).
- Слева остаётся видимым список карточек (если экран позволяет) — сохраняется контекст.
- Содержимое drawer: cover_image (крупно), title, author, year, type-tag, summary_full, key_takeaways (списком), source_url (если есть).
- Закрытие: ESC, клик вне drawer, кнопка ✕ в углу.
- На mobile — drawer становится full-screen.
- URL не меняется (это «слой», не переход).

## 13. Accessibility — целевая планка WCAG AAA

- Body text ≥ 18px.
- Контраст ≥ 7:1 для основного текста (AAA).
- Все интерактивные элементы — keyboard-accessible.
- Focus states видимые (2px outline, цвет `--blue` или `--blue-light` на тёмном).
- `aria-expanded` для аккордеонов.
- `aria-current="page"` для текущего пункта меню.
- `aria-label` для CTA-кнопок и иконок.
- Корректные `<label>` для всех полей формы.
- Сообщения об ошибках формы — текстовые (не только цвет).
- Правильный порядок tab.
- `prefers-reduced-motion: reduce` отключает все анимации.

## 14. Performance — целевые метрики

| Метрика | Цель |
|---|---|
| LCP (Largest Contentful Paint) | < 1.5s |
| FID / INP | < 200ms |
| CLS | < 0.05 |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |

**Что делаем:**
- Inter Variable preload, `font-display: swap`.
- Hero portrait — AVIF + WebP fallback, `fetchpriority="high"`, правильные `srcset` + `sizes`.
- Всё ниже фолда — `loading="lazy"`.
- GSAP — defer + initialise после DOMContentLoaded.
- Critical CSS — inline в `<head>`.
- Остальной CSS/JS — лёненный (Vite hashing + cache).
- На WP-фазе: full-page cache, отключение WP emoji-script, никаких Elementor/Revolution.

## 15. Деплой и релиз

### Фаза 1 — Preview (сейчас, до WP-интеграции)

- Репозиторий: `schaad-advisors-website` на GitHub Олега.
- Сборка: Vite → `dist/`.
- Хостинг: GitHub Pages, авто-деплой через GH Actions при push в `main`.
- URL: `https://<username>.github.io/schaad-advisors-website/`.
- Демонстрация Verena/Якобу — с GitHub Pages.

### Фаза 2 — Production (после утверждения дизайна)

- Custom hybrid classic WordPress theme на основе утверждённого дизайна.
- Hosting: Cyon (Базель) или Kinsta (Frankfurt).
- Domain: `schaadadvisors.ch` (уже зарегистрирован).
- Контактная форма: SMTP на `mod.inbox@gmail.com` (Олег) → потом перенастройка на `jakob.schaad@schaadadvisors.ch`.
- Капча: пока не подключаем.
- Multi-language Polylang/WPML — фаза 3, по запросу.

## 16. Сроки и приоритизация

### Понедельник 2026-04-27 — must-ship MVP главной

Критический путь на одну ночь работы (порядок):

1. Scaffold проекта: Vite + структура папок + Inter Variable + базовые CSS-токены.
2. GitHub репо + GH Pages workflow (auto-deploy on push).
3. Хедер с навигацией + footer (глобальный каркас).
4. **Hero** — Concept B + smart entrance (полностью адаптивный, GSAP-stagger H1).
5. Короткая Intro-секция под Hero (задаёт ритм для остальных страниц).
6. Базовая адаптивность: 1440 / 1200 / 1024 / 768 / 390.

### Откладывается на следующие итерации

- Полное наполнение услуг, FAQ, Lesezeichen — статичными UI без логики.
- Cursor-reactive типографика над фото (будем решать после первого ревью).
- Внутренние страницы Über mich, Lesezeichen, Kontakt — после утверждения главной.
- WP-интеграция (ACF Blocks, theme.json) — фаза 2.

## 17. Открытые вопросы / nice-to-haves

- **Логотипы Engagements** (Alpha MET, Richfox Capital, Kaderschule) — собрать для Über mich. Ответственный: Олег + я.
- **Портреты партнёров (Dorian Ranger, Samuel Bond)** — пока плейсхолдеры.
- **Юридический footer** — Impressum, Datenschutz. Запросим у Verena.
- **Финальный LinkedIn URL** — `https://linkedin.com/in/jakob-schaad` (проверить).
- **Cursor-reactive эффект на Hero** — решение во второй итерации, после ревью основного варианта.
- **Multi-language** — DE сейчас, EN/FR — по запросу клиента.

## 18. Критерии успеха

Сайт успешен, если он ощущается как:

- интеллектуальный;
- премиальный без показной роскоши;
- швейцарски точный;
- спокойный;
- быстрый (LCP < 1.5s);
- персональный;
- убедительный для зрелой профессиональной аудитории;
- легко интегрируемый в WordPress без переписывания вёрстки.

**Финальная эмоция:** «здесь человек, которому можно доверить сложный вопрос».

---

## Приложения

- [Полный диалог про выбор стека (Codex)](../../oz/consilium/sessions/2026-04-26-ask-codex-schaad-stack/01-response.md)
- [Критика брифа GPT (Gemini)](../../oz/consilium/sessions/2026-04-26-ask-gemini-schaad-brief-critique/01-response.md)
- [Исходный HTML-вайрфрейм](../01_materials/schaad_mockup_v2.html)
- [Логотип SVG](../02_assets/SchaadAdvisorsMITKORREKTUREN.svg)
- [Операционный CLAUDE.md](../CLAUDE.md)
