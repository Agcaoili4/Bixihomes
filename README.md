# Bixi Homes Website

This is the website project for **Bixi Homes**.

It is designed so you can run it locally, update business content easily, and keep the user experience smooth and modern.

## What Is New

Recent improvements now live in this project:

- Dynamic business hours in the header based on today’s day.
- Header business time now uses Alberta time (`America/Edmonton`) for live display.
- Smooth in-page travel when clicking menu/buttons (Home, Services, Gallery, Contact, etc.).
- Improved desktop scrolling fluency.
- Liquid-glass style UI treatment for buttons and selected gallery surfaces.
- Gallery click-to-open modal behavior with improved visual polish.
- Hero section cleanup: floating bubble accents removed for a cleaner business look.
- Contact form now posts to backend API with success/error feedback and cleaner field layout.
- About Bixi section restored and upgraded with a premium, business-first layout.
- Team Services section redesigned to a product-grade style while staying true to brand palette (white + yellow).
- Section reveal behavior stabilized so interactive sections no longer disappear after button clicks.
- Used Claude to make a documents for the flow of Architecture for more precise and understandable.

## Quick Start (No Technical Experience Needed)

1. Install Node.js (version 18 or newer).
2. Open this project folder in your terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local link shown in terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

To preview production build locally:

```bash
npm run preview
```

## Where To Edit Common Business Content

If you only want to update content (not code logic), these are the main files:

- Header contact + business hours logic:
  - `src/components/Navbar.jsx`
- Footer contact details:
  - `src/components/Footer.jsx`
- Hero section text/buttons:
  - `src/components/Hero.jsx`
- About Bixi section (business story + tabs):
  - `src/components/AboutBixi.jsx`
- Services section content:
  - `src/components/Services.jsx`
- Team Services section design/content:
  - `src/components/TeamServices.jsx`
- Gallery titles/descriptions/images:
  - `src/components/Gallery.jsx`
- News section cards:
  - `src/components/News.jsx`

## Updating Business Hours (Header)

Business hours are controlled in:

- `src/components/Navbar.jsx`

Look for `businessSchedule` and edit the times there.

Current format example:

```js
{ day: "Monday", hours: "09:00 AM – 05:00 PM" }
```

Use `Closed` for closed days.

## Project Structure (Simple View)

```text
.
├── src/                 # Main website code
├── public/              # Static assets (if used)
├── backend/             # Backend folder (currently not required for frontend run)
├── index.html
├── package.json
└── vite.config.js
```

## Backend Note

The frontend website runs independently for visual/UI work.

There is a `backend/` folder, but for full contact form submission you should also run the backend API.

Backend quick run:

```bash
cd backend
npm install
npm run dev
```

Default backend URL used by frontend:

- `http://localhost:5050`

You can override it in frontend with:

- `VITE_API_BASE_URL`

## Troubleshooting

- If install fails, retry:
  - `npm install`
- If the local site doesn’t load, restart:
  - stop terminal (`Ctrl + C`) then run `npm run dev` again.
- If port 5173 is busy, Vite will usually offer another port automatically.

## License

Licensed under [LICENSE](./LICENSE).
