# Schaad Advisors — Website

Сайт **Dr. Jakob Schaad** (Schaad Advisors). Швейцарский экономист-консультант: Government Relations, Regulatory Strategy, Geopolitical Risk.

Этот репозиторий — **рабочий каркас превью-версий** для согласования дизайна с клиентом, перед интеграцией в WordPress.

## Production target

`schaadadvisors.ch` (фаза 2 — после утверждения дизайна).

## Live preview (GitHub Pages)

- Launcher: <https://chife-mod.github.io/schaad-advisors-website/>
- Wireframe: <https://chife-mod.github.io/schaad-advisors-website/wireframe/>
- Concept 1: <https://chife-mod.github.io/schaad-advisors-website/concept-1/>

Внизу справа на каждой странице — плавающее **Service Menu** для быстрого переключения между версиями.

## Структура

```
.
├── index.html           # launcher — сводка всех preview-версий
├── wireframe/           # оригинальный HTML-вайрфрейм от клиента (1:1)
├── concept-1/           # наш концепт #1 главной страницы
├── shared/              # общий код для всех preview (service-menu)
│   ├── service-menu.css
│   └── service-menu.js
├── assets/              # шрифты, картинки, иконки
│   ├── fonts/
│   └── images/
├── 01_materials/        # входные материалы от клиента (вайрфрейм, фото)
├── 02_assets/           # фирменный логотип
├── 03_docs/             # документация проекта
│   ├── 01-design-brief.md      # финальный дизайн-бриф
│   ├── 02-decisions-log.md     # ADR-журнал решений
│   └── gpt-design-brief-schaad-advisors.md
└── CLAUDE.md            # операционная память для Claude (контекст проекта)
```

## Документация

- **[Design Brief](03_docs/01-design-brief.md)** — целевая визуальная и техническая система.
- **[Decisions Log](03_docs/02-decisions-log.md)** — журнал ключевых решений (ADR-формат).
- **[CLAUDE.md](CLAUDE.md)** — контекст для Claude/AI-ассистента.

## Стек (фаза 2 — WordPress)

- Custom hybrid classic WordPress theme (PHP + `theme.json`)
- ACF Pro Blocks через `block.json`
- CPT `resources` + taxonomy `resource_category` для Lesezeichen
- Vanilla CSS с custom properties + PostCSS
- Vanilla JS + GSAP
- Vite (минимальная сборка)
- Hosting: Cyon (Базель) / Kinsta (Frankfurt)

Подробности — в [01-design-brief.md](03_docs/01-design-brief.md).

## Текущая фаза (apr 2026)

- [x] Сбор материалов и брифование
- [x] Стек, типографика, hero-направление зафиксированы
- [x] Preview-каркас (launcher + service-menu) на GitHub Pages
- [ ] **Concept 1: Hero + каркас (нав, footer)** ← MVP к понедельнику 27.04
- [ ] Полное наполнение главной (услуги, FAQ, CTA)
- [ ] Internal pages (Über mich, Lesezeichen, Kontakt)
- [ ] WordPress-интеграция (фаза 2)

## Локальный запуск

Никакой сборки сейчас не нужно — это статика. Просто:

```bash
# любой статический сервер
python3 -m http.server 8000
# или
npx serve .
```

Открыть <http://localhost:8000/>.

## Контакты

- **Project lead / designer:** Олег ([@chife-mod](https://github.com/chife-mod))
- **Client (intermediary):** Verena Parzer-Epp
- **End client:** Dr. Jakob Schaad
