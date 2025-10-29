import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './tailwind.css';

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	
	// Get context from window (injected by extension)
	const context = (window as any).__WEBVIEW_CONTEXT__;
	
	if (!context) {
		console.error('No webview context provided');
		root.render(<div>Error: No context provided</div>);
	} else {
		root.render(<App vscode={context.vscode} />);
	}
}

