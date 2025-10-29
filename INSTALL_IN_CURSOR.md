# Installing Your Extension in Cursor

Cursor is VS Code-based and supports VS Code extensions. Here's how to install your extension in Cursor.

## Method 1: Install from Command Line (Easiest)

This is the fastest way:

```bash
cursor --install-extension vscode-extension-react-boilerplate-0.0.1.vsix
```



From your project directory:
```bash
cd /Users/
cursor --install-extension ./vscode-extension-react-boilerplate-0.0.1.vsix
```

## Method 2: Install via Cursor UI

Since the `...` menu might not be visible in Cursor's Extensions view:

**Option A: Right-click method**
1. Open Extensions view: `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X`
2. Right-click (or `Ctrl+Click` / `Cmd+Click`) anywhere in the Extensions sidebar
3. Look for "Install from VSIX..." option

**Option B: Command Palette**
1. Press `Cmd+Shift+P` / `Ctrl+Shift+P`
2. Type: **"Extensions: Install from VSIX..."**
3. Select it and choose your `.vsix` file

**Option C: Drag and Drop**
1. Open Extensions view: `Cmd+Shift+X` / `Ctrl+Shift+X`
2. Open Finder/File Explorer
3. Drag and drop your `.vsix` file into the Extensions view area

## Method 3: Development Mode (No Installation Needed) - RECOMMENDED

This is the easiest for testing:

1. **Open your extension folder in Cursor:**
   ```bash
   cd /Users/indhicdev/Indhic-dev/sample-extension/vscode-extension-react-boilerplate
   cursor .
   ```

2. **Press `F5`** (or click Run → Start Debugging)
3. **A new "Extension Development Host" window opens** (this is Cursor)
4. **In that window:**
   - Press `Cmd+Shift+P` / `Ctrl+Shift+P`
   - Type: **"Open Webview"**
   - The webview opens!

**Why this is better:**
- No installation needed
- Auto-reloads when you make changes
- Perfect for development

## Method 4: Using Terminal (Alternative)

If `cursor --install-extension` doesn't work, try:

```bash
# Navigate to project
cd /Users

# Install extension
cursor --install-extension vscode-extension-react-boilerplate-0.0.1.vsix
```

## Troubleshooting

### Extension Not Appearing in Cursor (but works in VS Code)

**Step 1: Verify Installation**
```bash
# Check if extension is installed in Cursor
cursor --list-extensions --show-versions | grep kiran

# Should show:
# kiran.vscode-extension-react-boilerplate@0.0.1
```

**Step 2: Install via Command Line (Best Option)**
```bash
cd /Users/

# Make sure .vsix file exists
ls -lh *.vsix

# Install
cursor --install-extension ./vscode-extension-react-boilerplate-0.0.1.vsix
```

**Step 3: Check Extension Activation**
In Cursor:
1. `View → Output`
2. Select "VS Code React Extension Boilerplate" from dropdown
3. Should see: "Extension is now active!"
4. If you see errors, note them down

**Step 4: Clear and Reinstall**
```bash
# Uninstall from Cursor
cursor --uninstall-extension kiran.vscode-extension-react-boilerplate

# Rebuild and repackage
npm run vsce:package

# Install again
cursor --install-extension ./vscode-extension-react-boilerplate-0.0.1.vsix
```

**Step 5: Use Development Mode (F5)**
If installed extension doesn't work:
1. Open extension folder in Cursor
2. Press `F5` (opens Extension Development Host)
3. Command should work in the dev host window

### Command Not Found

1. **Reload Cursor:** `Ctrl+R` / `Cmd+R`
2. **Check Extension Output:**
   - `View → Output`
   - Select "VS Code React Extension Boilerplate" from dropdown
   - Should see: "Extension is now active!"

3. **Check Developer Console:**
   - `Help → Toggle Developer Tools`
   - Look for errors in Console tab

### Webview Doesn't Open

1. **Check Developer Tools:**
   - `Help → Toggle Developer Tools`
   - Console tab - look for errors
   - Network tab - verify `webview.js` and `webview.css` load

2. **Rebuild if needed:**
   ```bash
   npm run package
   npm run vsce:package
   ```

## Verify Installation

Run in terminal:
```bash
cursor --list-extensions --show-versions | grep "vscode-extension-react-boilerplate"
```

Should show:
```
kiran.vscode-extension-react-boilerplate@0.0.1
```

## Quick Start Commands

```bash
# Package extension
npm run vsce:package

# Install in Cursor via command line (EASIEST)
cursor --install-extension ./vscode-extension-react-boilerplate-0.0.1.vsix

# Or use F5 method (NO INSTALLATION NEEDED)
# Just open folder in Cursor and press F5
```

## Notes

- **Command line install is easiest** - no UI menus needed
- **F5 method is best for development** - no installation, auto-reloads
- Cursor is fully VS Code compatible
- `.vsix` files work in both VS Code and Cursor
- The marketplace error is about OTHER extensions, not yours

## Recommended Workflow

**For Development:**
- Use **F5 method** (no installation needed)

**For Testing Installed Version:**
- Use **command line install:**
  ```bash
  cursor --install-extension ./vscode-extension-react-boilerplate-0.0.1.vsix
  ```
