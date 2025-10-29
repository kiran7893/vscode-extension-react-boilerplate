# Quick Start Guide

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the extension:**
   ```bash
   npm run compile
   ```

3. **Run in VS Code:**
   - Press `F5` to launch Extension Development Host
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Open Webview" and select the command
   - The React webview will open!

## Development Workflow

1. **Start watch mode:**
   ```bash
   npm run watch
   ```
   This will automatically rebuild when you change files.

2. **Press F5** to launch Extension Development Host
3. **Make changes** in `src/` files
4. **Reload the webview** to see changes (or reload the Extension Development Host window)

## Project Structure

- `src/extension.ts` - Extension entry point, register commands here
- `src/templates/webviewTemplate.ts` - HTML template generator
- `src/webview/index.tsx` - React app entry point
- `src/webview/App.tsx` - Your React component (customize this!)
- `esbuild.js` - Build configuration

## Adding New Features

### Add a New Command

1. Add command to `package.json` `contributes.commands`
2. Register in `src/extension.ts`:
   ```typescript
   vscode.commands.registerCommand('extension.yourCommand', () => {
     // Your logic
   });
   ```

### Send Message from Extension to Webview

```typescript
currentPanel.webview.postMessage({
  command: 'updateData',
  data: { /* your data */ }
});
```

Then handle in `App.tsx`:
```typescript
useEffect(() => {
  window.addEventListener('message', (event) => {
    const message = event.data;
    if (message.command === 'updateData') {
      // Handle message
    }
  });
}, []);
```

### Send Message from Webview to Extension

In React component:
```typescript
vscode.postMessage({
  command: 'yourCommand',
  data: { /* your data */ }
});
```

Handle in `src/extension.ts`:
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

This creates minified bundles in `dist/`.

## Troubleshooting

- **Webview not loading**: Make sure you've run `npm run compile` first
- **Changes not appearing**: Reload the Extension Development Host window (Cmd+R / Ctrl+R)
- **TypeScript errors**: Run `npm run check-types` to see detailed errors
- **Build errors**: Check the console output from `npm run watch`

