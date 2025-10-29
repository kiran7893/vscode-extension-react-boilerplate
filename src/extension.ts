import * as vscode from 'vscode';
import { generateWebviewHtml } from './templates/webviewTemplate';

let currentPanel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension is now active!');

	// Register command to open webview
	const disposable = vscode.commands.registerCommand('extension.openWebview', () => {
		if (currentPanel) {
			currentPanel.reveal(vscode.ViewColumn.One);
			return;
		}

		// Create and show a new webview
		currentPanel = vscode.window.createWebviewPanel(
			'extensionWebview',
			'Extension Webview',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.joinPath(context.extensionUri, 'dist')
				]
			}
		);

		// Set webview HTML
		currentPanel.webview.html = generateWebviewHtml(
			currentPanel.webview,
			context.extensionUri
		);

		// Handle messages from webview
		currentPanel.webview.onDidReceiveMessage(
			message => {
				try {
					switch (message.command) {
						case 'alert':
							vscode.window.showInformationMessage(message.text);
							break;
						case 'log':
							console.log('[Webview]', message.text);
							break;
						default:
							console.warn('[Extension] Unknown command:', message.command);
					}
				} catch (error) {
					console.error('[Extension] Error handling message:', error);
					vscode.window.showErrorMessage(`Extension error: ${error instanceof Error ? error.message : String(error)}`);
				}
			},
			null,
			context.subscriptions
		);

		// Clean up when panel is closed
		currentPanel.onDidDispose(
			() => {
				currentPanel = undefined;
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

