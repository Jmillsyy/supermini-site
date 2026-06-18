# SuperMini Challenge — Website

A fast, portable static website for the SuperMini Challenge (SMC). No build step, no database — just HTML/CSS that drops into any host.

## Open it

Double-click **`index.html`** to view the site in your browser. All pages link to each other, so you can click around the whole thing locally.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About / mission / format |
| `the-car.html` | The car (BMW F56 Cooper S) |
| `calendar.html` | 2026 calendar |
| `results.html` | Results & standings |
| `drivers.html` | Driver grid |
| `news.html` | News listing |
| `get-involved.html` | Join + Get a SuperMini |
| `sponsors.html` | Partners + sponsorship pitch |
| `contact.html` | Contact + enquiry form |
| `assets/styles.css` | All styling (shared) |
| `assets/nav.js` | Mobile menu toggle |

## What's placeholder (swap before launch)

Anything in a **yellow banner**, a **grey diagonal-striped box**, or marked **"placeholder / TBC"**:

- **Logo** — currently an "SM" block in the header/footer. Replace with the real logo image.
- **Brand colour** — the racing red. Change it in one place: `assets/styles.css`, the `--accent` value near the top.
- **Photos** — every grey box is a `[ ... ]` image slot. Drop in real photos.
- **Calendar dates** — placeholder rounds in `calendar.html`.
- **Results / standings** — placeholder names and points in `results.html` and `index.html`.
- **Drivers** — placeholder cards in `drivers.html`.
- **Car specs** — placeholder figures in `the-car.html`.
- **Membership / costs** — placeholder copy in `get-involved.html`.
- **Contact form** — visual only; connect it to a form service (e.g. Formspree, Netlify Forms) before launch.
- **Shop** — link the "Shop" nav/footer items to your hosted store.

## Changing the accent colour

In `assets/styles.css`:

```css
--accent:#e8112d;   /* change this hex to your brand colour */
```

Everything (buttons, highlights, the next-race panel) updates automatically.

## Hosting

Because it's static, you can host it free on Netlify, Cloudflare Pages, or GitHub Pages — drag the folder in and point `supermini.au` at it. The merch shop can stay where it is (e.g. on a `shop.supermini.au` subdomain) and link from the nav.

## Next steps

1. Send the logo, brand colours, confirmed 2026 dates, current standings and a handful of photos.
2. I'll swap the real assets in and wire up the contact form + shop link.
3. Choose a host and point the domain.
