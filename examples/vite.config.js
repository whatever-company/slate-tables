import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
	oxc: {
		jsx: {
			runtime: 'classic'
		}
	},
	resolve: {
		alias: {
			testutils: resolve(__dirname, '..', 'testutils'),
			lib: resolve(__dirname, '..', 'lib')
		}
	},
	base: '/slate-tables'
})
