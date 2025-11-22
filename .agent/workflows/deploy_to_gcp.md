---
description: Deploy the TEAS app to Firebase Hosting (GCP)
---

# Deploy to GCP (Scalable & Future-Proof)

For a scalable application that needs **Authentication** and **Payments** (Stripe), the best option is **Cloud Run**.
- **Why?** It supports the full Next.js feature set (SSR, API Routes for webhooks, Middleware for auth).
- **Cost:** Generous free tier (2M requests/month). Scales to zero when not in use.
- **Scalability:** Handles massive traffic spikes automatically.

## Option 1: Cloud Run (Recommended for Future Growth)

### 1. Create a Dockerfile
Create a file named `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Update next.config.ts
Enable standalone output for Docker:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

### 3. Build and Deploy
```bash
# 1. Set your Project ID
export PROJECT_ID=your-google-cloud-project-id

# 2. Build the container image
gcloud builds submit --tag gcr.io/$PROJECT_ID/teas-app

# 3. Deploy to Cloud Run
gcloud run deploy teas-app \
  --image gcr.io/$PROJECT_ID/teas-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Option 2: Firebase Hosting (Static Only)
*Use this ONLY if you don't need server-side logic yet.*

## Alternative: App Engine (Standard Environment)
App Engine is a good middle ground. It has a **Free Tier** (28 instance hours/day for F1 instances).

1.  **Create `app.yaml`**
    Create a file named `app.yaml` in your root directory:
    ```yaml
    runtime: nodejs18
    instance_class: F1
    automatic_scaling:
      max_instances: 1
    ```

2.  **Update `package.json`**
    Ensure you have a start script: `"start": "next start"`.
    *Note: You do NOT need `output: 'export'` for App Engine; it supports SSR.*

3.  **Deploy**
    ```bash
    gcloud app deploy
    ```

