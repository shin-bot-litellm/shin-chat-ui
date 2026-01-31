# Shin Chat UI

A clean, Vercel-style chat interface for OpenClaw.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- 🎨 **Clean Design** — Minimal, Vercel-inspired dark theme
- ⚡ **Streaming** — Real-time SSE streaming responses
- 📝 **Markdown** — Full markdown support with syntax highlighting
- 📱 **Responsive** — Works great on mobile and desktop
- 🔒 **Secure** — API proxy hides your OpenClaw token from clients
- 🐳 **Docker Ready** — Easy deployment with Docker Compose

## Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/shin-bot-litellm/shin-chat-ui.git
cd shin-chat-ui

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your OpenClaw URL and token

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker Deployment

```bash
# Set environment variables
export OPENCLAW_URL=http://your-openclaw-server:3000
export OPENCLAW_TOKEN=your-token

# Build and run
docker-compose up -d
```

The UI will be available at [http://localhost:3001](http://localhost:3001)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENCLAW_URL` | OpenClaw API endpoint | `http://localhost:3000` |
| `OPENCLAW_TOKEN` | OpenClaw API token | (required) |

## How It Works

The UI calls a local API route (`/api/chat`) which proxies requests to OpenClaw:

```
Browser → /api/chat → OpenClaw /v1/chat/completions
```

This keeps your API token server-side and secure.

### API Format

The proxy forwards requests to OpenClaw's OpenAI-compatible endpoint:

```json
POST /v1/chat/completions
Authorization: Bearer <token>
x-openclaw-agent-id: main

{
  "model": "openclaw",
  "stream": true,
  "user": "webchat-user",
  "messages": [{"role": "user", "content": "Hello!"}]
}
```

## Development

```bash
# Run dev server
npm run dev

# Type check
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT
