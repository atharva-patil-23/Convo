# Design System for Convo

The single source of truth for Convo's visual language. Read this before adding
or changing any UI. If something in the code disagrees with this file, the file
wins.

## What this is

Convo is a real-time chat app. One-on-one messaging, online presence, message
history. Built on MERN + Socket.IO.

The design brief, compressed to one sentence: **Convo should feel instant.**
Every visual decision in this system serves that perception. Things that get in
the way of speed (gradients, decorative motion, visual chrome, fancy
illustrations, three-column feature grids, generic hero blobs) are out.

## Aesthetic

Modern minimal-functional. Type and whitespace carry the work, not decoration.

Reference points: Linear, iMessage, Beeper, Notion. None of these products try
to be visually loud. They try to be invisible until you need them. That is the
mood.

Dark mode is primary and canonical. Light mode is a derivative for users who
ask for it. Do not design light-first.

## Color

CSS custom properties, defined in `client/src/index.css` at the `:root` level.

### Dark (canonical)

```css
:root {
  --bg:            #0F0F11;
  --surface-1:     #1A1A1F;
  --surface-2:     #26262E;
  --border:        #2D2D38;

  --text:          #F5F5F7;
  --text-muted:    #8E8E97;
  --text-faint:    #5C5C66;

  --accent:        #00D26A;
  --bubble-self:   #0066FF;
  --bubble-other:  #1F1F26;
  --danger:        #FF453A;
}
```

### Light (derivative)

```css
[data-theme="light"] {
  --bg:            #FAFAFA;
  --surface-1:     #FFFFFF;
  --surface-2:     #F0F0F2;
  --border:        #E5E5EA;
  --text:          #0F0F11;
  --text-muted:    #5C5C66;
  --text-faint:    #8E8E97;
  --accent:        #00B45A;
  --bubble-self:   #0066FF;
  --bubble-other:  #F0F0F2;
  --danger:        #E5453A;
}
```

### Rules

- `--accent` (green) means *alive*. It signals online presence, send-state,
  active focus rings. Do not use it for general buttons, decorative borders, or
  marketing accents. Overusing the accent kills its meaning.
- `--bubble-self` (blue) is reserved for the user's own message bubbles. It is
  not a general "primary" color. The send button is not blue; it is accent
  green because pressing it triggers an "alive" action.
- No purple, no violet, no pink, no gradient backgrounds. The previous design
  used those as decoration. They are out.
- Borders use `--border` only, 1px, no shadows except on the modal/dialog level.
- All text colors meet WCAG AA against their intended backgrounds. If you add a
  new color, check contrast before merging.

## Typography

One family does everything: **Geist** (variable, weights 400/500/600/700)
plus **Geist Mono** for numeric UI.

```html
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Scale (px)

| Role        | Size | Weight | Tracking |
|-------------|------|--------|----------|
| Hero        | 56   | 700    | -3%      |
| Display     | 32   | 600    | -2%      |
| Heading     | 24   | 600    | -1%      |
| Subheading  | 18   | 600    | -1%      |
| Body        | 15   | 400    | 0        |
| UI label    | 14   | 500    | 0        |
| Caption     | 13   | 400    | 0        |
| Tiny        | 12   | 400    | +1%      |
| Timestamp   | 11   | 400    | +2%      |

Line height: body uses 1.55. Headings use 1.2. UI labels use 1.3.

### Mono is mandatory for

Timestamps. Online counts. Latency / ping displays. Message IDs. Anything
where digits should align column-wise. Use `font-feature-settings: "tnum";` so
columns of numbers don't jitter as values change.

### Never use

Inter, Roboto, Arial, Helvetica, system-ui, Space Grotesk, Poppins, Montserrat
as the primary face. They are the "I gave up" signals. We picked Geist on
purpose.

## Spacing

4px base. Aggressive scale that skips 20 and 40 on purpose to keep hierarchy
decisive.

```text
2  →  2px
4  →  4px
8  →  8px
12 →  12px
16 →  16px
24 →  24px
32 →  32px
48 →  48px
64 →  64px
```

If you reach for 20 or 40, you are probably making a compromise. Either go up
or go down.

## Layout

Three-column app shell at viewport ≥ 900px:

```text
[ sidebar 256px ][ conversation, fluid ][ right pane 320px ]
```

At < 900px the right pane collapses. At < 600px the sidebar collapses to a
push-drawer.

Strict 4px base grid. No editorial layout games inside the app. Marketing
pages (if you ever add them) can break grid; the app itself does not.

Message bubbles cap at 60ch. A 2000-character message wraps but does not blow
the column out. Long words use `overflow-wrap: break-word`.

### Border radius scale

- `sm` 6px: inputs, small buttons
- `md` 8px: cards, surface containers
- `lg` 12px: modals, larger surface
- `bubble` 16px with 4px corner on speaker side: message bubbles
- `full` 9999px: pills, avatars, send button

## Motion

Sub-300ms ceiling. Anything longer feels heavy and breaks the brief.

```css
--ease:    cubic-bezier(0.2, 0, 0, 1);
--micro:   80ms;
--short:   150ms;
--medium:  300ms;
```

- Hovers and focus rings use `--micro`.
- State changes (message arrival, panel toggle, theme switch) use `--short`.
- Route transitions, if any, use `--medium`. Nothing else does.
- No decorative motion. No floating elements. No springy bounces. The easing
  curve is springy but the duration is tight; the result is precise, not
  playful.
- `prefers-reduced-motion` collapses all durations to 0ms.

## Components

### Buttons

- **Primary (accent):** `--accent` background, black text, 12px vertical padding,
  16px horizontal, 8px radius, weight 600. Hover: `filter: brightness(1.08)`.
- **Ghost:** transparent background, `--text-muted` text, 1px `--border`.
  Hover: `--surface-2` background.
- **Disabled:** 40% opacity, `cursor: not-allowed`. Never gray out the text
  color directly; use opacity.

### Inputs

- 11px vertical / 14px horizontal padding.
- Default border `--border`, focused border `--accent`.
- Background `--bg` inside a surface, `--surface-2` inside the page.
- Placeholder text uses `--text-faint`.

### Message bubble

- Self: `--bubble-self`, white text, right-aligned, 16px radius with 4px
  corner bottom-right.
- Other: `--bubble-other`, `--text` color, left-aligned, 16px radius with 4px
  corner bottom-left.
- Max width: 60ch.
- Timestamp sits below the bubble in mono, `--text-faint`.

### Sidebar list row

- 32px avatar, 10px gap, name in 14/500, meta in 11/mono/`--text-faint`.
- Online indicator: 10px green dot on bottom-right of avatar, 2px ring in
  surface color.
- Unread badge: pill in `--accent` with black mono digits, right-aligned.

### Toasts

- Container: `--surface-1` background, 1px border in the relevant color
  (`--danger` for errors, `--accent` for success).
- Title in 13/500 in the accent/danger color.
- Subtitle in 12/400 `--text-muted` with the actionable detail.
- Never use a toast that just says "Error" or "Network Error". Always state
  what failed and what the user can do.

## Implementation notes

- All tokens defined in `client/src/index.css` as CSS custom properties.
- Tailwind config extends these as utility classes (`bg-bg`, `text-text`,
  `border-border`, etc.) so JSX stays clean.
- Theme toggle is a `data-theme` attribute on `<html>`, not a class on body.
  Persist the choice in `localStorage`.
- Geist is loaded via Google Fonts at app entry. If offline-first becomes a
  goal, self-host the woff2 files and drop the CDN.

## Decisions log

| Date       | Decision                                       | Why                                                                   |
|------------|------------------------------------------------|-----------------------------------------------------------------------|
| 2026-05-26 | Initial design system, dark-primary, Geist     | Brief: feel instant. Restrained palette + one type family serves that. |
| 2026-05-26 | Green accent reserved for "alive" only         | Green has a WhatsApp echo. Restricting it to presence/active prevents drift. |
| 2026-05-26 | Drop purple/violet entirely                    | Previous palette read AI-generic. Replacing it is the point.          |
| 2026-05-26 | Skip 20 and 40 in spacing scale                | Forces decisive hierarchy. Compromise spacing is a tell.              |

## When you change this file

Add a row to the decisions log. State the date, what changed, and one sentence
on why. If the change is large enough to affect existing screens, open a
matching PR that updates the code at the same time. The doc and the code stay
in lockstep.
