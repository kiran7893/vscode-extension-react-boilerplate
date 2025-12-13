# How to Install and Run Your Extension Locally

## Step-by-Step Installation

### Step 1: Install the .vsix File

1. **Open VS Code**
2. **Go to Extensions view:**
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - OR click the Extensions icon in the sidebar (looks like 4 squares)
3. **Install from VSIX:**
   - Click the `...` (three dots) menu at the top right of Extensions view
   - Select **"Install from VSIX..."**
   - Navigate to your project folder
   - Select `vscode-extension-react-boilerplate-0.0.1.vsix`
   - Click "Install"
4. **Reload VS Code:**
   - VS Code will prompt you to reload
   - OR press `Ctrl+R` / `Cmd+R` to reload window
   - OR restart VS Code

### Step 2: Verify Installation

1. **Check Extensions view:**
   - Go back to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search for "VS Code React Extension Boilerplate"
   - You should see it in "Installed" extensions
   - Status should show "Enabled" ✓

### Step 3: Run the Extension Command

1. **Open Command Palette:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. **Type the command:**
   - Type: `Open Webview`
   - OR type: `Extension: Open Webview`
3. **Select the command:**
   - You should see: `Extension: Open Webview`
   - Press Enter
4. **Webview should open:**
   - A new panel/tab should open showing your React app
   - You should see the styled UI with buttons

## Troubleshooting

### Extension Not Appearing in Extensions View

**Check if installed:**
```bash
code --list-extensions | grep -i "react\|boilerplate"
```

**If not found, reinstall:**
1. Uninstall if exists:
   ```bash
   code --uninstall-extension <publisher-id>.vscode-extension-react-boilerplate
   ```
2. Install again from VSIX file

### Command Not Found in Command Palette

**Possible causes:**

1. **Extension not activated:**
   - Check Output Panel:
     - `View → Output`
     - Select "VS Code React Extension Boilerplate" from dropdown
     - Look for "Extension is now active!" message

2. **VS Code didn't reload:**
   - Manually reload: `Ctrl+R` / `Cmd+R`
   - Or restart VS Code

3. **Extension has errors:**
   - Check Developer Console:
     - `Help → Toggle Developer Tools`
     - Look for errors in Console tab

### Webview Opens But Is Blank

**Check for errors:**
1. Open Developer Tools (`Help → Toggle Developer Tools`)
2. Check Console tab for errors
3. Check Network tab - verify `webview.js` and `webview.css` load (should be 200 OK)

**Verify files exist:**
```bash
ls -la dist/
# Should see:
# - extension.js
# - webview.js
# - webview.css
```

**Rebuild if needed:**
```bash
npm run package
```

### Command Palette Doesn't Show the Command

**Try these:**
1. Type the exact command ID: `extension.openWebview`
2. Check extension is enabled in Extensions view
3. Reload VS Code window
4. Check package.json has the command registered:
   ```json
   "contributes": {
     "commands": [{
       "command": "extension.openWebview",
       "title": "Open Webview"
     }]
   }
   ```

## Quick Verification Checklist

- [ ] .vsix file created successfully
- [ ] VSIX installed via Extensions → Install from VSIX
- [ ] VS Code reloaded after installation
- [ ] Extension visible in Extensions view (Enabled)
- [ ] Command available in Command Palette (`Ctrl+Shift+P` → "Open Webview")
- [ ] Webview opens when command is executed

## Alternative: Use Extension Development Host (F5)

If you want to test without installing:

1. **Open the extension folder in VS Code**
2. **Press F5**
3. **A new "Extension Development Host" window opens**
4. **In that window, press `Ctrl+Shift+P` → "Open Webview"**
5. **Test your extension**

This method is for **development** - changes auto-reload.

## Still Having Issues?

1. **Check VS Code version:** Should be 1.90.0 or higher
2. **Check extension output:**
   - `View → Output`
   - Select your extension from dropdown
3. **Check developer console:**
   - `Help → Toggle Developer Tools`
   - Look for errors
4. **Reinstall extension:**
   ```bash
   # Uninstall
   code --uninstall-extension <publisher-id>.vscode-extension-react-boilerplate
   
   # Rebuild and repackage
   npm run vsce:package
   
   # Install again from VSIX
   ```

