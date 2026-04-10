# Bixi Homes Website

This is the current website build for **Bixi Homes**.

The site is designed to feel clean, professional, and easy to navigate while keeping the company brand front and center.

## Website Flow

The website currently follows this order:

1. `Home`
2. `About`
3. `Services`
4. `Gallery`
5. `Contact`

## Current Website Direction

The current design direction focuses on:

- white backgrounds
- black text for readability
- gold accents for warmth and brand presence
- simpler layouts
- reduced visual clutter
- better spacing across desktop, tablet, and phone

## Major Updates

- The homepage was reorganized into a cleaner and more minimal structure.
- The homepage has now a dedicated background while logo still sits as the main brand.
- The Hero spacing and logo placement were retuned so the opening section feels more intentional across screen sizes.
- The About Bixi section was redesigned to be easier to read and more visually polished.
- The About Bixi section was further refined with more open spacing, stronger hierarchy, and a less compact authority-focused layout.
- The About Bixi section now uses a more minimal, updated presentation with a cleaner panel treatment and a dedicated visual separation before `The Bixi Team`.
- The Services section now uses a compact toggle-driven layout for `Exterior` and `Interior` scopes.
- The Services `Get a quote` flow is connected back to Contact, including service and message prefills from the selected card.
- The Gallery now has a carousel UI adopted theme.
- The Gallery now uses curated project photos and supports expanded viewing.
- The GalleryPage component has been added for additional UX enhancer.
- The Contact section was refined so the form feels cleaner and more professional.
- The Navbar was refined to feel more balanced, more readable, and stay sticky during scrolling.
- The mobile navigation now uses a visible mobile link row and hours bar instead of a hamburger menu.
- Buttons across the website were updated so the main actions feel more consistent with the Hero palette.

## Minor Updates

- Hero spacing was adjusted multiple times to improve the opening screen composition.
- About Bixi metric numbers now use the gold brand accent.
- Shared button styles and hover states were unified.
- Global CSS was cleaned to remove duplicated and unused rules.
- Reveal animations were refined so Hero animations do not clash with page scrolling.
- The logo component was updated to use the current `Logo.png` asset in the live interface.
- The Contact section keeps the video visible in the current layout.
- The Contact form service dropdown is synced to the current accepted frontend service list.
- The About Bixi and team transition now uses a clearer divider treatment for stronger section separation.
- Tablet and mobile spacing were refined for:
  - Hero layout
  - About Bixi layout
  - Services layout
  - mobile navbar and business hours row
  - general button and content spacing
- Mobile section pills and the Services toggle are now centered for a cleaner and more balanced phone layout.
- A fallback page remains available for unfinished or invalid routes.

## Contact Form and Backend

The website includes a working contact form connected to the backend.

The backend is responsible for:

- receiving contact form submissions
- validating form data
- handling admin authentication
- sending email through Resend
- accepting the current service list used by the frontend quote flow

Current frontend/backend note:

- Service quote actions now send visitors to `#contact` with matching `service` and `message` values, and the Contact form reads those values before submission.

Backend reference:

- [BACKEND.md](/Users/test/Documents/GitHub/Bixihomes/backend/BACKEND.md)

## Quick Start

### Start the Frontend

```bash
npm install
npm run dev
```

The frontend usually runs at:

- `http://localhost:5173`

### Build the Frontend

```bash
npm run build
```

### Preview the Frontend Build

```bash
npm run preview
```

### Start the Backend

```bash
cd backend
npm install
npm run dev
```

The backend usually runs at:

- `http://localhost:5050`

If needed, the frontend can point to a different backend using:

- `VITE_API_BASE_URL`

## Main Files To Edit

If you want to update the website content quickly, these are the main files:

- Hero:
  - [Hero.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Hero.jsx)
- Navbar and business hours:
  - [Navbar.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Navbar.jsx)
- About Bixi:
  - [AboutBixi.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/AboutBixi.jsx)
- Services:
  - [Services.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Services.jsx)
- Gallery:
  - [Gallery.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Gallery.jsx)
  - [interactive-bento-gallery.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/ui/interactive-bento-gallery.jsx)
- Contact:
  - [ContactForm.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/ContactForm.jsx)
- Footer:
  - [Footer.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Footer.jsx)
- Global styles:
  - [index.css](/Users/test/Documents/GitHub/Bixihomes/src/index.css)
- Hero text animation:
  - [text-effect.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/ui/text-effect.jsx)

## Project Structure

```text
.
├── src/
│   ├── assets/
│   ├── components/
│   ├── components/ui/
│   ├── lib/
│   └── index.css
├── backend/
├── docs/
├── package.json
└── vite.config.js
```

## Troubleshooting

- If the frontend does not start:
  - run `npm install`
  - then run `npm run dev`
- If the site build fails:
  - run `npm run build`
  - check the first error shown in the terminal
- If the contact form does not work:
  - make sure the backend is running
  - make sure the frontend is pointing to the correct backend URL
  - make sure backend CORS includes the frontend domain
- If email does not send:
  - make sure Resend credentials are set correctly
  - make sure the sender email or domain is verified

## Before Pushing Changes

Use this quick checklist:

1. Run `npm run build`
2. Check that no secrets or `.env` values were added into the codebase
3. If backend changes were made, test the contact form flow
4. Confirm the current design still works on desktop and mobile

## License

Licensed under [LICENSE](/Users/test/Documents/GitHub/Bixihomes/LICENSE).
