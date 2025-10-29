const esbuild = require("esbuild");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const fs = require("fs");
const path = require("path");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const ctx = await esbuild.context({
		entryPoints: [
			'src/extension.ts'
		],
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		outfile: 'dist/extension.js',
		external: ['vscode'],
		logLevel: 'silent',
		plugins: [
			esbuildProblemMatcherPlugin,
		]
	});

	// PostCSS plugin for processing Tailwind CSS
	const postcssPlugin = {
		name: 'postcss',
		setup(build) {
			let cssContents = new Map();
			
			build.onLoad({ filter: /\.css$/ }, async (args) => {
				const css = await fs.promises.readFile(args.path, 'utf8');
				const plugins = [tailwindcss, autoprefixer];
				
				// Add CSS minification in production
				if (production) {
					try {
						const cssnano = require('cssnano');
						plugins.push(cssnano({ preset: 'default' }));
					} catch (e) {
						// cssnano not installed, continue without minification
						console.warn('cssnano not found - CSS will not be minified. Install with: npm install -D cssnano');
					}
				}
				
				const result = await postcss(plugins).process(css, {
					from: args.path,
				});
				// Store processed CSS by file path
				cssContents.set(args.path, result.css);
				return {
					contents: result.css,
					loader: 'text',
				};
			});
			
			// After build, write CSS to file
			build.onEnd(async () => {
				// Get the last processed CSS (should be tailwind.css)
				const cssArray = Array.from(cssContents.values());
				if (cssArray.length > 0) {
					// Ensure dist directory exists
					if (!fs.existsSync('dist')) {
						await fs.promises.mkdir('dist', { recursive: true });
					}
					// Write the last processed CSS (usually tailwind.css)
					await fs.promises.writeFile('dist/webview.css', cssArray[cssArray.length - 1], 'utf8');
				}
			});
		},
	};

	// Webview build context
	const webviewCtx = await esbuild.context({
		entryPoints: ['src/webview/index.tsx'],
		bundle: true,
		format: 'esm',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'browser',
		outfile: 'dist/webview.js',
		logLevel: 'silent',
		plugins: [
			esbuildProblemMatcherPlugin,
			postcssPlugin
		],
		loader: {
			'.css': 'text',
			'.png': 'file',
			'.jpg': 'file',
			'.svg': 'file',
		},
		define: {
			'process.env.NODE_ENV': production ? '"production"' : '"development"',
		},
		jsx: 'automatic', // This enables JSX support
	});

	if (watch) {
		await Promise.all([
			ctx.watch(),
			webviewCtx.watch()
		]);
		console.log('Watching for changes...');
	} else {
		await Promise.all([
			ctx.rebuild(),
			webviewCtx.rebuild()
		]);
		
		await ctx.dispose();
		await webviewCtx.dispose();
		
		console.log('Build complete!');
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});

