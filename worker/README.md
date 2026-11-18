# JobsJi chat relay (Gemini)

A tiny Cloudflare Worker that lets the site's chat bot use Google Gemini
**without exposing the API key**. Free on both sides (Cloudflare Workers free
plan + Gemini free tier). If Gemini is unavailable or the free limit is hit,
the bot automatically falls back to its built-in answers.

## One-time setup

```bash
cd worker
npx wrangler login                       # or set CLOUDFLARE_API_TOKEN
npx wrangler secret put GEMINI_API_KEY   # paste the key from https://aistudio.google.com/apikey
npx wrangler deploy                      # prints https://jobsji-chat.<you>.workers.dev
```

Then tell the site where the relay lives — add a GitHub repo **variable**
(Settings → Secrets and variables → Actions → Variables):

```
PUBLIC_CHAT_API = https://jobsji-chat.<you>.workers.dev
```

and re-run the "Deploy to GitHub Pages" workflow.

## Rotating the key

```bash
npx wrangler secret put GEMINI_API_KEY
```

No site redeploy needed.
