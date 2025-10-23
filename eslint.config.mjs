import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		ignores: [
			'nodes/Sentry/sentry-sdk.bundle.js',
			'nodes/Sentry/sentry-sdk.bundle.js.map',
			'vite.config.ts',
		],
	},
];
