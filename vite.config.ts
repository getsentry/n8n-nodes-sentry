import { defineConfig } from 'vite';
import { resolve } from 'path';
import { builtinModules } from 'module';

export default defineConfig({
	ssr: {
		noExternal: [/^@sentry/, /^@opentelemetry/, /.*/],
	},
	build: {
		ssr: 'nodes/Sentry/sentry-sdk-entry.ts',
		outDir: 'nodes/Sentry',
		emptyOutDir: false,
		minify: false,
		sourcemap: true,
		target: 'node18',
		rollupOptions: {
			input: resolve(__dirname, 'nodes/Sentry/sentry-sdk-entry.ts'),
			output: {
				entryFileNames: 'sentry-sdk.bundle.js',
				format: 'cjs',
			},
			external: (id) => {
				// Keep Node.js built-in modules external
				if (builtinModules.includes(id) || builtinModules.includes(id.replace(/^node:/, ''))) {
					return true;
				}
				// Keep n8n-workflow external
				if (id === 'n8n-workflow') {
					return true;
				}
				// Bundle everything else (including @sentry/node and its dependencies)
				return false;
			},
		},
	},
});

