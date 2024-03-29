/// <reference types="vitest" />

import analog from "@analogjs/platform";
import { defineConfig, Plugin, splitVendorChunkPlugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		publicDir: "src/public",

		ssr: {
			noExternal: ["@analogjs/trpc", "@trpc/server"],
		},

		build: {
			target: ["es2020"],
		},
		plugins: [
			analog({
				nitro: {
					routeRules: {
						"/": {
							prerender: false,
						},
					},
				},
			}),

			tsConfigPaths({
				root: "../../",
			}),
			splitVendorChunkPlugin(),
		],
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: ["src/test-setup.ts"],
			include: ["**/*.spec.ts"],
			cache: {
				dir: `../../node_modules/.vitest`,
			},
		},
		define: {
			"import.meta.vitest": mode !== "production",
		},
	};
});
