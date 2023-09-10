import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ["favicon.ico"],
			includeManifestIcons: true,
			devOptions: {
				enabled: true
			},
			manifest: {
				name: 'Workout Planner',
				short_name: 'Workout',
				description: 'A way to plan workouts',
				theme_color: '#FF6961',
				icons: [
					{
						src: 'icon_.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icon_512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
