import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
	resolve: {
		alias: {
			'@styles': path.resolve(__dirname, './src/styles'),
			'@types': path.resolve(__dirname, './src/types'),
			'@components': path.resolve(__dirname, './src/components'),
			// '@utils': path.resolve(__dirname, './src/utils'),
			// '@api': path.resolve(__dirname, './src/api'),
		},
	},
})
