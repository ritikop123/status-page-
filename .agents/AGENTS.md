# AI Agent Instructions for Sagarmatha Hosting

## Git Remotes & Deployment

This project has multiple git remotes configured. When you are asked to push code or deploy changes, you MUST pay attention to where you are pushing:

- **Main Web & Status Page (Live Deployment)**: Push to the `sagarmatha` remote (`https://github.com/ritikop123/sagarmatha-site.git`).
  - Command: `git push sagarmatha main`
  - Vercel and the live production site (`www.sagarmatha.site`) are attached to this repository. All updates for the main website and the `/status` page must go here.

- **Origin / Old Repo**: The `origin` remote (`https://github.com/ritikop123/status-page-.git`) may not trigger live deployments. Do NOT push here unless specifically asked to update the backup or alternative repository.

Always confirm that your push command targets `sagarmatha` (e.g. `git push sagarmatha main`) instead of relying on the default `git push`.
