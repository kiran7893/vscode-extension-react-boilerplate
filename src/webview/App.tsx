import React, { useState, useEffect } from 'react';

interface VSCode {
	postMessage(message: { command: string; text?: string }): void;
}

interface AppProps {
	vscode: VSCode;
}

const App: React.FC<AppProps> = ({ vscode }) => {
	const [message, setMessage] = useState('Hello from React!');
	const [count, setCount] = useState(0);

	useEffect(() => {
		// Send a log message to extension
		try {
			vscode.postMessage({
				command: 'log',
				text: 'React app initialized'
			});
		} catch (error) {
			console.error('[Webview] Error sending message:', error);
		}
	}, [vscode]);

	const handleButtonClick = () => {
		setCount(count + 1);
		vscode.postMessage({
			command: 'alert',
			text: `Button clicked ${count + 1} times!`
		});
	};

	return (
		<div className="min-h-screen p-12 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-5xl mx-auto">
				<h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">
					VS Code Extension Boilerplate
				</h1>
				
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
					<p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
						{message}
					</p>
					
					<div className="flex items-center gap-6 mb-6">
						<button
							onClick={handleButtonClick}
							className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg"
						>
							Click Me ({count})
						</button>
						
						<button
							onClick={() => setMessage(message === 'Hello from React!' ? 'Message updated!' : 'Hello from React!')}
							className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg"
						>
							Update Message
						</button>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
					<h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
						Features
					</h2>
					<ul className="list-disc list-inside space-y-3 text-lg text-gray-700 dark:text-gray-300">
						<li>TypeScript for type safety</li>
						<li>React 19 with modern hooks</li>
						<li>Tailwind CSS for styling</li>
						<li>esbuild for fast bundling</li>
						<li>Two-way messaging between extension and webview</li>
						<li>VS Code theme-aware styling</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;

