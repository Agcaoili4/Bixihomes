# Bixi Homes Website

This is the current website for **Bixi Homes**.

It was built to present the company in a cleaner, more professional way while keeping the experience simple for visitors:

- clear navigation
- stronger branding
- better service presentation
- cleaner gallery browsing
- working contact form flow

This guide is written to be easier for non-technical readers while still giving the team enough information to manage the site.

## Website Sections

The website currently follows this order:

1. `Home`
2. `About`
3. `Services`
4. `Gallery`
5. `Contact`

## What Changed

### Major Changes

- The homepage was reorganized into a more minimal and professional layout.
- The Hero section now focuses more on the Bixi brand, with the logo as the main visual feature.
- The Hero message now uses a looping text animation that alternates between:
  - `Exterior Restoration & Renovation`
  - `Connect With Us Today`
- The About Bixi section was redesigned to feel more polished and easier to read.
- The About Bixi content is now split more clearly into:
  - `Exterior`
  - `Interior`
- The About Bixi card now stays visible when visitors switch tabs, so only the content changes instead of the whole panel disappearing.
- The Services section was refreshed with a stronger header and a cleaner overall structure.
- The Gallery uses curated project photos and opens more items in a modal view when selected.
- The Contact form layout was improved so it feels cleaner and more professional.
- The Navbar was refined so it feels more centered, readable, and business-focused.
- The buttons across the website were updated so their colors and hover states match the current Hero palette.
- Mobile and tablet layouts were reviewed and adjusted so spacing, section flow, and readability stay consistent across smaller screens.

### Minor Changes

- Hero spacing was adjusted so more important content is visible when a visitor first lands on the page.
- About Bixi metric numbers now use the brown brand color.
- Shared button styles were unified across the site, including brand-matched hover behavior.
- The stylesheet was cleaned up again to remove old, duplicated, and unused styling rules.
- Scroll reveal behavior was refined so Hero animations do not clash with scrolling.
- A fallback page is still available for unfinished or invalid routes.
- Typography and spacing were tuned further for desktop, tablet, and mobile readability.
- Responsive refinements were added for phone and tablet breakpoints, especially around:
  - the Hero spacing
  - About Bixi layout
  - Services section structure
  - buttons and general content spacing

## Current Design Direction

The site currently leans toward:

- white backgrounds
- black text for readability
- brown accents for brand warmth
- simpler layouts
- less visual clutter

## Contact Form and Backend

The website includes a working contact form that is designed to connect to the backend service.

Current backend responsibilities:

- receive contact form submissions
- validate form data
- handle admin authentication
- send emails through Resend

Backend reference:

- [BACKEND.md](/Users/test/Documents/GitHub/Bixihomes/backend/BACKEND.md)

## Quick Start

### Start the Frontend

```bash
npm install
npm run dev
```

This usually opens locally at:

- `http://localhost:5173`

### Build the Frontend

```bash
npm run build
```

### Preview the Built Version

```bash
npm run preview
```

### Start the Backend

```bash
cd backend
npm install
npm run dev
```

This usually runs at:

- `http://localhost:5050`

If needed, the frontend can point to a different backend using:

- `VITE_API_BASE_URL`

## Where To Edit Website Content

If you want to update content quickly, these are the main files:

- Hero section:
  - [Hero.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Hero.jsx)
- Navbar and business hours:
  - [Navbar.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Navbar.jsx)
- About Bixi section:
  - [AboutBixi.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/AboutBixi.jsx)
- Services section:
  - [Services.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Services.jsx)
- Gallery:
  - [Gallery.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/Gallery.jsx)
  - [interactive-bento-gallery.jsx](/Users/test/Documents/GitHub/Bixihomes/src/components/ui/interactive-bento-gallery.jsx)
- Contact form:
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
- If the site builds with an error:
  - run `npm run build`
  - check the first error shown in terminal
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
