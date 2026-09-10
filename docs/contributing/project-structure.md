---
sidebar_position: 4
---

# Project Structure

## Repositories

Processing functions are based on the [server template](https://github.com/upskiller-xyz/server_template) and named as `server_` followed by concise functionality description.

Each processing function runs in its own container. This provides modularity, allows updates or removal without affecting other services, and enables faster debugging.

Users interact with the "facade server," the main container that routes requests to appropriate processing containers in the correct order.

The usual language is Python, though the architecture is flexible.

### Developing a New Server

Start a new repository using the template. The template includes the carcass structure, deployment files, and a README draft. It contains coding principles in [CLAUDE.md](https://github.com/upskiller-xyz/server_template/blob/main/CLAUDE.md) for development with coding assistants.

Legacy repositories are private and prefixed with `legacy_`.

### Frontend Repositories

Frontend repositories don't have a template yet. The naming convention uses the website name (e.g., `lux.upskiller.xyz` or `docs.upskiller.xyz`). The usual language is TypeScript.
