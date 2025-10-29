# Complete Deployment Guide for VS Code Extension

This guide covers everything you need to deploy your VS Code extension, from local testing to publishing on the VS Code Marketplace.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Before You Deploy](#before-you-deploy)
3. [Installation Methods](#installation-methods)
   - [Local Testing (.vsix file)](#1-local-testing-vsix-file)
   - [Local Installation (Development)](#2-local-installation-development)
   - [Public Marketplace](#3-public-marketplace)
4. [Step-by-Step Deployment](#step-by-step-deployment)
5. [Publishing to VS Code Marketplace](#publishing-to-vs-code-marketplace)
6. [Updating Your Extension](#updating-your-extension)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### 1. Install VS Code Extension Manager (vsce)

```bash
npm install -g @vscode/vsce
```

Verify installation:
```bash
vsce --version
```

### 2. Publisher Account

You need a **publisher ID** to publish extensions. You can create one during the publishing process, or prepare it in advance.

---

## Before You Deploy

### 1. Update package.json

**Required fields:**

```json
{
  "name": "your-unique-extension-id",      // Unique ID (lowercase, no spaces)
  "displayName": "Your Extension Name",     // Display name shown in marketplace
  "description": "Your extension description",
  "version": "0.0.1",                      // Semantic versioning
  "publisher": "your-publisher-id",         // Your publisher ID
  "engines": {
    "vscode": "^1.90.0"                     // Minimum VS Code version
  },
  "categories": ["Other"],                  // Valid categories: Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other
  "keywords": ["react", "webview", "ui"],   // Search keywords
  "icon": "icon.png",                       // 128x128 PNG icon (optional but recommended)
  "repository": {                           // Repository info (optional but recommended)
    "type": "git",
    "url": "https://github.com/yourusername/your-repo"
  },
  "homepage": "https://github.com/yourusername/your-repo",
  "bugs": {
    "url": "https://github.com/yourusername/your-repo/issues"
  },
  "license": "MIT"                          // License type
}
```

**Important:** 
- `name` must be unique across all VS Code extensions
- `publisher` must match your marketplace publisher ID
- `version` follows semantic versioning (major.minor.patch)

### 2. Prepare Extension Assets

**Recommended files:**

```
your-extension/
├── icon.png          # 128x128 PNG icon
├── LICENSE           # License file
├── CHANGELOG.md      # Release notes
└── README.md         # Extension documentation
```

**Create CHANGELOG.md:**

```markdown
# Change Log

## [0.0.1] - YYYY-MM-DD

### Added
- Initial release
- React webview support
- Tailwind CSS styling
```

### 3. Build Production Version

```bash
npm run package
```

This will:
- Run type checking
- Run linting
- Build with production optimizations
- Generate minified bundles

Verify the build:
```bash
ls -lh dist/
```

You should see:
- `extension.js` (minified, ~2-3KB)
- `webview.js` (minified, ~200KB)
- `webview.css` (minified, ~8KB)
- **No** `.map` files (source maps disabled in production)

---

## Installation Methods

### 1. Local Testing (.vsix file)

**Package your extension:**

```bash
# Package without publishing
vsce package

# This creates a .vsix file (e.g., your-extension-0.0.1.vsix)
```

**Install from .vsix file:**

1. Open VS Code
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Click the `...` menu (top right)
4. Select "Install from VSIX..."
5. Choose your `.vsix` file
6. The extension will be installed locally

**Test the extension:**

1. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Type your command (e.g., "Open Webview")
3. Verify it works correctly

**Uninstall:**

```bash
code --uninstall-extension your-publisher-id.your-extension-id
```

### 2. Local Installation (Development)

**Direct installation during development:**

1. Open the extension folder in VS Code
2. Press `F5` to open Extension Development Host
3. Test your extension in the new window
4. Changes will hot-reload (with watch mode)

**Using watch mode:**

```bash
# Terminal 1: Watch mode
npm run watch

# Terminal 2: Launch debugger
# Press F5 in VS Code
```

### 3. Public Marketplace

See [Publishing to VS Code Marketplace](#publishing-to-vs-code-marketplace) section below.

---

## Step-by-Step Deployment

### Step 1: Configure package.json

Edit `package.json`:

```json
{
  "name": "my-awesome-extension",
  "displayName": "My Awesome Extension",
  "description": "A cool VS Code extension with React",
  "version": "0.0.1",
  "publisher": "my-publisher-id",
  // ... rest of config
}
```

### Step 2: Create Publisher (if needed)

**Option A: Create during publish (recommended)**

When you run `vsce publish`, you'll be prompted to create a publisher if it doesn't exist.

**Option B: Create in advance**

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft/GitHub account
3. Create a new publisher
4. Use that publisher ID in `package.json`

### Step 3: Add License

Create a `LICENSE` file (MIT example):

```text
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted...
```

Or choose from: https://choosealicense.com/

### Step 4: Build and Test Locally

```bash
# Build for production
npm run package

# Create VSIX package
vsce package

# Install and test
# (Follow steps in "Local Testing" section above)
```

### Step 5: Verify .vsix Contents

```bash
# List contents (optional - requires unzip)
unzip -l your-extension-0.0.1.vsix
```

Should include:
- `extension/package.json`
- `extension/dist/extension.js`
- `extension/dist/webview.js`
- `extension/dist/webview.css`
- `extension/README.md`
- `extension/LICENSE`
- `extension/CHANGELOG.md`

**Should NOT include:**
- `src/` directory
- `node_modules/` (except if required at runtime)
- `.map` files
- Development config files

---

## Publishing to VS Code Marketplace

### Method 1: Using Personal Access Token (PAT) - Recommended

**Step 1: Generate Personal Access Token**

1. Go to: https://dev.azure.com
2. Sign in with your Microsoft/GitHub account
3. Click your profile → **Security**
4. Under **Personal Access Tokens**, click **+ New Token**
5. Configure:
   - **Name:** VS Code Extension Publishing
   - **Organization:** All accessible organizations
   - **Expiration:** Choose duration (or custom)
   - **Scopes:** Select **Custom defined**
   - **Marketplace:** Select **Manage** (full access)
6. Click **Create**
7. **COPY THE TOKEN** (you won't see it again!)

**Step 2: Login with Token**

```bash
vsce login your-publisher-id
# When prompted, paste your Personal Access Token
```

**Step 3: Publish**

```bash
vsce publish
```

**Step 4: Verify**

1. Go to: https://marketplace.visualstudio.com/vscode
2. Search for your extension
3. It may take a few minutes to appear

### Method 2: Using vsce publish with Token Directly

```bash
vsce publish -p YOUR_PERSONAL_ACCESS_TOKEN
```

### Method 3: Manual Upload

1. Generate `.vsix` file: `vsce package`
2. Go to: https://marketplace.visualstudio.com/manage
3. Click your publisher
4. Click **+ New Extension** → **Visual Studio Code**
5. Upload your `.vsix` file

---

## Publishing Options

### Publish Specific Version

```bash
vsce publish 1.2.3
```

### Publish Minor/Patch/Major Update

Update version in `package.json`:

```json
{
  "version": "0.0.2"  // Increment as needed
}
```

Then publish:
```bash
vsce publish
```

**Versioning best practices:**
- **Patch (0.0.1 → 0.0.2):** Bug fixes
- **Minor (0.0.1 → 0.1.0):** New features, backwards compatible
- **Major (0.0.1 → 1.0.0):** Breaking changes

---

## Updating Your Extension

### Step 1: Make Changes

Make your code changes, test locally.

### Step 2: Update Version

Edit `package.json`:

```json
{
  "version": "0.0.2"  // Increment version
}
```

### Step 3: Update CHANGELOG.md

```markdown
# Change Log

## [0.0.2] - 2024-01-15

### Fixed
- Fixed webview loading issue
- Improved error handling

## [0.0.1] - 2024-01-01

### Added
- Initial release
```

### Step 4: Build and Publish

```bash
npm run package
vsce publish
```

**Auto versioning (optional):**

```bash
# Patch version (0.0.1 → 0.0.2)
vsce publish patch

# Minor version (0.0.1 → 0.1.0)
vsce publish minor

# Major version (0.0.1 → 1.0.0)
vsce publish major
```

---

## Troubleshooting

### Error: "Extension not found"

**Solution:** Ensure `main` field in `package.json` points to the correct file:
```json
{
  "main": "./dist/extension.js"
}
```

### Error: "Missing publisher"

**Solution:** 
1. Create publisher at https://marketplace.visualstudio.com/manage
2. Update `publisher` field in `package.json`
3. Run `vsce login your-publisher-id`

### Error: "Extension name already exists"

**Solution:** Change the `name` field in `package.json` to something unique.

### Error: "File not found" during packaging

**Solution:** 
- Check `.vscodeignore` includes the correct paths
- Ensure all required files are in `dist/`
- Verify `package.json` paths are correct

### Error: Extension installs but doesn't work

**Possible causes:**
1. Missing files in `.vsix`
2. Incorrect `main` entry point
3. Runtime errors (check Developer Tools: `Help → Toggle Developer Tools`)

**Debug:**
1. Install extension locally
2. Open Developer Tools (`Help → Toggle Developer Tools`)
3. Check Console for errors

### Build fails in production

**Check:**
```bash
# Verify build works
npm run package

# Check for TypeScript errors
npm run check-types

# Check for linting errors
npm run lint
```

### CSS not loading in webview

**Verify:**
1. `dist/webview.css` exists
2. Webview template includes CSS link
3. CSP allows style-src for webview resources

---

## Quick Reference Commands

```bash
# Development
npm install              # Install dependencies
npm run watch            # Watch mode
npm run compile          # Build once (dev)

# Production
npm run package          # Build for production
vsce package             # Create .vsix file
vsce publish             # Publish to marketplace

# Testing
code --install-extension path/to/extension.vsix
code --uninstall-extension publisher.extension-id

# Utilities
vsce ls                  # List published extensions
vsce show publisher.extension-id  # Show extension info
```

---

## Security Best Practices

1. **Never commit tokens:** Store PAT in environment variables or use `vsce login`
2. **Review .vscodeignore:** Ensure sensitive files aren't included
3. **Test .vsix locally:** Always test before publishing
4. **Version carefully:** Don't skip versions
5. **Update dependencies:** Keep dependencies up to date

---

## Additional Resources

- [VS Code Extension API Documentation](https://code.visualstudio.com/api)
- [Marketplace Documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce CLI Tool](https://github.com/microsoft/vscode-vsce)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

---

## Checklist Before Publishing

- [ ] Updated `package.json` with correct name, publisher, version
- [ ] Added icon.png (128x128)
- [ ] Created LICENSE file
- [ ] Created CHANGELOG.md with at least one entry
- [ ] Built production version (`npm run package`)
- [ ] Tested .vsix file locally
- [ ] Verified all required files are included
- [ ] Verified sensitive files are excluded (.vscodeignore)
- [ ] Extension works in Extension Development Host
- [ ] README.md is complete and accurate
- [ ] Version number follows semantic versioning

---

**Ready to publish?** Run:

```bash
npm run package && vsce publish
```

Good luck! 🚀

