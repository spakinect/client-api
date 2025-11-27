# Client API Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note:** This project uses `.npmrc` with `legacy-peer-deps=true` to handle peer dependency conflicts between Docusaurus and redocusaurus.

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

