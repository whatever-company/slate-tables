import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	oxc: {
		jsx: {
			runtime: 'classic',
			pragma: 'h',
			pragmaFrag: 'Fragment',
			development: false
		}
	},
	resolve: {
		alias: {
			testutils: resolve(__dirname, 'testutils'),
			lib: resolve(__dirname, 'lib')
		}
	},
	test: {
		globals: true,
		setupFiles: ['./vitest.setup.js'],
		include: ['tests/**/*.{js,jsx}'],
		exclude: ['**/fixtures/**']
	}
})
