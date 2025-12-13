# VS Code Extension + React Boilerplate

A production-ready boilerplate for creating VS Code extensions with React webviews, following SuperDesign's architecture patterns.

## Features

- ✅ TypeScript for type safety
- ✅ React 19 with modern hooks
- ✅ Tailwind CSS for styling (via PostCSS)
- ✅ esbuild for fast bundling
- ✅ Single build file bundling both extension and webview
- ✅ Two-way messaging between extension and webview
- ✅ VS Code theme-aware styling
- ✅ Watch mode for development
- ✅ Production-ready build configuration

## Project Structure

```
vscode-extension-react-boilerplate/
├── src/
│   ├── extension.ts              # Main extension entry point
│   ├── templates/
│   │   └── webviewTemplate.ts    # HTML template generator
│   └── webview/
│       ├── index.tsx             # React entry point
│       ├── App.tsx               # Main React component
│       └── tailwind.css          # Tailwind imports
├── dist/                         # Compiled output
│   ├── extension.js              # Bundled extension
│   └── webview.js                # Bundled webview
├── esbuild.js                    # Single build configuration
└── package.json                  # Extension manifest
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- VS Code 1.90.0 or higher

### Installation

1. Clone or copy this boilerplate
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run compile
   ```

4. Press `F5` in VS Code to launch the Extension Development Host

### Development

Run in watch mode for automatic rebuilds:

```bash
npm run watch
```

Then press `F5` to launch the Extension Development Host.

### Commands

- `npm run compile` - Build extension and webview once
- `npm run watch` - Build and watch for changes
- `npm run package` - Build for production (minified)
- `npm run check-types` - Type check without building
- `npm run lint` - Run ESLint

### Testing

1. Press `F5` to open Extension Development Host
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Open Webview" and select the command
4. The React webview will open in a new panel

## Customization

### Updating Extension Metadata

Edit `package.json`:
- Update `name`, `displayName`, `description`
- Change `publisher` to your publisher name
- Modify `contributes.commands` to add your commands

### Adding Webview Commands

In `src/extension.ts`, add command handlers:

```typescript
vscode.commands.registerCommand('extension.yourCommand', () => {
  // Your command logic
});
```

### Customizing React App

Edit `src/webview/App.tsx` to build your UI. The component receives a `vscode` prop for messaging:

```typescript
vscode.postMessage({ command: 'alert', text: 'Hello!' });
```

### Styling with Tailwind

Use Tailwind classes in your React components. The CSS is processed through PostCSS during build.

To add custom Tailwind configuration, edit `tailwind.config.js`.

## Architecture

This boilerplate follows SuperDesign's architecture:

- **Single build file** (`esbuild.js`) bundling both extension and webview in parallel
- **Single TypeScript config** with DOM libs for webview support
- **HTML template generator** function instead of static HTML files
- **Context injection** pattern for passing data to React app
- **Output to `dist/`** directory with `webview.js` bundle name

## Messaging

### Extension → Webview

In `src/extension.ts`:

```typescript
currentPanel.webview.postMessage({
  command: 'updateData',
  data: { /* your data */ }
});
```

### Webview → Extension

In React component:

```typescript
vscode.postMessage({
  command: 'yourCommand',
  data: { /* your data */ }
});
```

Then handle in `src/extension.ts`:

```typescript
currentPanel.webview.onDidReceiveMessage(message => {
  switch (message.command) {
    case 'yourCommand':
      // Handle message
      break;
  }
});
```

## Building for Production

```bash
npm run package
```

This creates minified, production-ready bundles in the `dist/` directory.

## Publishing & Deployment

📦 **Complete Deployment Guide:** See the DEPLOYMENT.md file in this directory for a comprehensive guide covering:

- Local testing and installation
- Packaging extensions (.vsix files)
- Publishing to VS Code Marketplace
- Version management
- Troubleshooting

### Quick Start (Publishing)

1. **Install vsce:**
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Update package.json:**
   - Set your unique `name`
   - Set your `publisher` ID
   - Update `version`, `description`, etc.

3. **Package for testing:**
   ```bash
   npm run vsce:package
   # Creates a .vsix file you can install locally
   ```

4. **Publish to marketplace:**
   ```bash
   npm run vsce:publish
   ```

For detailed instructions, authentication setup, and best practices, see the DEPLOYMENT.md file included with this extension.

## License

MIT
