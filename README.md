# Bixi Homes Website

Modern marketing website for **Bixi Homes**, built with React + Vite, with a separate Express backend for contact submissions and admin auth.

This README focuses on what changed, where to edit content, and how to run both frontend and backend quickly.

## Recent Updates

### Major Changes

- Navigation and header behavior upgraded:
  - Live business hours now update in **Alberta time** (`America/Edmonton`).
  - In-page anchor travel is smooth and consistent.
  - Sticky navigation spacing and readability improved.
- Hero section upgraded:
  - New business-focused headline and cleaner visual hierarchy.
  - Animated metrics now run with a random-fast-to-final count sequence.
  - Floating bubble effect removed for a cleaner, professional look.
- About Bixi redesigned:
  - Segment switching is now **Exterior / Interior** (industrial removed).
  - Updated business narrative to 20+ years of exterior restoration focus.
  - Added clearer positioning for the interior expansion (home builds, renovations, basement development).
- Team Services redesigned:
  - Service cards now match the current business scope:
    - Roofing & Siding
    - Fascia & Gutters
    - Fence & Decking
    - Interior renovation and basement development support
- Gallery improved:
  - Portfolio cards are visually consistent and click-to-open modal behavior is stabilized.
  - Drag behavior on media is controlled to avoid accidental UX issues.
- News experience reworked:
  - Replaced basic “Read More” interaction with interactive cards + modal detail reading.
  - Added “More Upcoming Projects” switching inside the modal.
- Contact form improved end-to-end:
  - Better spacing, field sizing, and clearer layout.
  - First/Last name split.
  - Form submit integrates to backend API with success/error feedback.
- Service catalog refreshed:
  - Flat Roofing, Sloped Roofing, Siding, Fascia, Gutters, Window Replacement, Fencing, Decking.
  - Contact form service options now match this service list.

### Minor Changes

- Palette harmonization pass applied across components.
- Typography contrast improved for readability (black/white hierarchy outside hero).
- Navbar and footer treatment simplified for clearer business presentation.
- Button states and interactive surfaces polished to match the current UI direction.
- Small spacing and alignment fixes across desktop + mobile.
- Figma-hosted raster icons replaced by inline SVG icons for better palette control and consistency.
- Project-count display updated to `100` where project metrics are shown.

## Backend Architecture Status

No drastic backend architecture changes were detected in the current codebase.  
The backend remains:

- Express 5 API
- Zod validation
- JWT admin auth
- Resend email delivery for contact submissions

Architecture documentation is still valid here:  
- `backend/BACKEND.md`

## Quick Start

### Frontend

```bash
npm install
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

Build production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

### Backend (for live contact form)

```bash
cd backend
npm install
npm run dev
```

Default backend local URL used by frontend:

- `http://localhost:5050`

Frontend API base override:

- `VITE_API_BASE_URL`

## Where To Edit Content Quickly

- Header + business schedule logic:
  - `src/components/Navbar.jsx`
- Hero copy and CTA:
  - `src/components/Hero.jsx`
- About Bixi segmented content:
  - `src/components/AboutBixi.jsx`
- Services content:
  - `src/components/Services.jsx`
- Team services content/cards:
  - `src/components/TeamServices.jsx`
- Gallery portfolio items:
  - `src/components/Gallery.jsx`
  - `src/components/ui/interactive-bento-gallery.jsx`
- News cards and modal details:
  - `src/components/News.jsx`
- Contact form fields and submit flow:
  - `src/components/ContactForm.jsx`
- Footer business details:
  - `src/components/Footer.jsx`

## Updating Header Business Hours

Edit schedule values in:

- `src/components/Navbar.jsx`

Look for `businessSchedule`.

## Project Structure

```text
.
├── src/                 # Frontend app (React + Vite)
├── backend/             # API server (Express)
├── docs/                # Additional documentation
├── index.html
├── package.json
└── vite.config.js
```

## Troubleshooting

- If dependencies fail:
  - `npm install` again
- If frontend does not load:
  - Stop process (`Ctrl + C`) and run `npm run dev` again
- If contact form fails:
  - Confirm backend is running on the expected port
  - Confirm frontend `VITE_API_BASE_URL` matches backend URL
  - Confirm backend CORS allowlist includes your frontend origin

## Security Audit Checklist (Pre-Push)

Use this quick checklist before pushing:

- Run frontend build:
  - `npm run build`
- Run backend tests:
  - `cd backend && npm test`
- Verify no secrets are committed:
  - Confirm `.env` and `.env.*` are ignored by git
  - Scan code/docs for accidental tokens/keys
- Verify no unsafe runtime patterns were introduced:
  - No `eval`, no `dangerouslySetInnerHTML`, and no shell execution paths from user input
- Run dependency audit when internet is available:
  - `npm audit --omit=dev`
  - `cd backend && npm audit --omit=dev`

## License

Licensed under [LICENSE](./LICENSE).
