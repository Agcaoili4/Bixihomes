# Bixihomes

Production-ready project setup for the Bixi Homes website.

## Tech Stack

- Frontend: Vite + React (project root)
- Backend: Node server in `backend/`
- Styling: Tailwind CSS (frontend)

## Prerequisites

- Node.js `>=18.18.0` (LTS recommended)
- npm `>=9`

Verify versions:

```text
node -v
npm -v
```

## Project Structure

```text
.
├── backend/
│   ├── package.json
│   └── server.js
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Frontend Setup (Vite)

Install frontend dependencies from the project root:

```text
npm install
```

Run development server:

```text
npm run dev
```

Build for production:

```text
npm run build
```

Preview production build:

```text
npm run preview
```

## Backend Setup

Install backend dependencies from the `backend/` folder:

```text
cd backend
npm install
```

Run backend in watch mode:

```text
npm run dev
```

Run backend normally:

```text
npm run start
```

## Tailwind CSS Setup (Frontend)

Run these commands from the project root:

```text
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Update `src/index.css`:

```css
@import "tailwindcss";
```

Then start the frontend:

```text
npm run dev
```

## Environment Variables

Git-ignored environment files:

- `.env`
- `.env.*`

Frontend variables must start with `VITE_`:

```text
VITE_API_BASE_URL=https://api.example.com
```

## Troubleshooting

- If `npm install` fails with network errors, verify internet/proxy settings and retry.
- If port `5173` is busy, Vite usually switches to another available port.
- If dependencies get corrupted, remove `node_modules/` and reinstall.

## License

Licensed under [LICENSE](./LICENSE).
