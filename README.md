# Client API Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note:** This project uses `.npmrc` with `legacy-peer-deps=true` to handle peer dependency conflicts between Docusaurus and redocusaurus.

## API Specification Structure

The OpenAPI spec is split into modular YAML files for maintainability:

```
api/
├── client-openapi.yaml       # Root file - edit this to add paths/schemas
├── client-openapi.json       # Bundled output (auto-generated, do not edit)
├── paths/                    # One file per endpoint
│   ├── appointments.yaml
│   ├── treatments.yaml
│   └── visits.yaml
└── components/
    ├── security.yaml
    ├── responses.yaml        # Shared error responses
    └── schemas/              # Schemas grouped by domain
        ├── appointment.yaml
        ├── patient.yaml
        ├── treatment.yaml
        ├── visit.yaml
        ├── webhook.yaml
        └── common.yaml
```

- **Edit** the YAML files in `api/` when updating the API spec
- **Build** runs `npm run bundle` to merge everything into `client-openapi.json` for Docusaurus
- Run `npm run bundle` alone to regenerate the JSON without a full build

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```bash
npm run deploy
```

This command builds the website and pushes to `gh-pages` branch for GitHub Pages deployment.

## Troubleshooting

If you encounter the error "Hook useColorMode is called outside the ColorModeProvider", see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed instructions.

