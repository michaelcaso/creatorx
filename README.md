# CreatorX — Creator Operating System

The full CreatorX product: assessment → Creator Index → command center, content engine
(Hook Engine, What To Film, Studio builders, Digital Product generator with PDF/Word export),
Growth Engine (platform academies + live levers), Ads Engine (calculator + campaign builder),
Business Engine, AI Systems, Page Scan (Instagram audit), Dashboards, Live Training, Community,
and a built-in Creator AI assistant.

## Run locally
```bash
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Deploy to Netlify (see it live)

### Option A — Git (recommended)
1. Push this folder to a new GitHub repo.
2. On netlify.com → **Add new site → Import an existing project** → pick the repo.
3. Netlify auto-detects the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**. You'll get a live URL in ~1 minute.

### Option B — CLI
```bash
npm install
npm run build
npx netlify-cli deploy --prod --dir=dist
```

### Option C — Drag & drop
1. `npm install && npm run build`
2. Drag the generated **`dist`** folder onto the Netlify dashboard drop zone.

The marketing landing page is included at **/landing.html** on your live site.

## Notes
- **Creator AI chat:** in this build, the assistant calls the Anthropic API directly from the
  browser. On a plain Netlify deploy that call won't have a key, so it automatically falls back
  to the built-in in-voice responses — the demo never breaks. To make the AI fully live, add a
  Netlify Function that proxies to the Anthropic API with your key, and point the fetch at it.
- No backend/database yet — manual logging, niche intelligence, and document generation all run
  client-side. Real social data, Meta Ads sync, hosted training, and community require backends.
