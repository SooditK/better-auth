import createMDX from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { remarkInstall } from "fumadocs-docgen";
import { transformerTwoslash } from "fumadocs-twoslash";
import { JsxEmit, ModuleResolutionKind } from "typescript";

const withMDX = createMDX({
	mdxOptions: {
		rehypeCodeOptions: {
			transformers: [
				...rehypeCodeDefaultOptions.transformers,
				transformerTwoslash({
					twoslashOptions: {
						compilerOptions: {
							moduleResolution: ModuleResolutionKind.Bundler,
							jsx: JsxEmit.React,
						},
					},
				}),
			],
		},
		remarkPlugins: [
			[
				remarkInstall,
				{
					persist: {
						id: "persist-install",
					},
				},
			],
		],
	},
});

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	redirects() {
		return [
			{
				source: "/docs",
				destination: "/docs/introduction",
				permanent: true,
			},
			{
				source: "/docs/examples",
				destination: "/docs/examples/next-js",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				hostname: "images.unsplash.com",
			},
			{
				hostname: "assets.aceternity.com",
			},
		],
	},
};

export default withMDX(config);
