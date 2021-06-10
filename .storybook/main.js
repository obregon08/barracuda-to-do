const { resolve } = require("path")
const webpack = require("webpack")

module.exports = {
  stories: ["../ui/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-i18n"],
  webpackFinal: async (baseConfig) => {
    // Add SVGR Loader
    // ========================================================
    const assetRule = baseConfig.module.rules.find(({ test }) => test.test(".svg"))

    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    }

    // Merge our rule with existing assetLoader rules
    baseConfig.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", assetLoader],
    })

    const nextConfig = require("../next.config.js")

    // Workaround for `next/Link` "error: cannot read prefetch of null"
    // see https://github.com/vercel/next.js/discussions/14031
    baseConfig.plugins.push(new webpack.NormalModuleReplacementPlugin(/next\/link/, resolve(__dirname, "next-link.js")))

    // Workaround for `next/Image`. Also see change in preview.js
    // see https://stackoverflow.com/questions/64622746/how-to-mock-next-js-image-component-in-storybook
    baseConfig.plugins.push(
      new webpack.DefinePlugin({
        "process.env.__NEXT_IMAGE_OPTS": JSON.stringify({
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: [],
          path: "/",
          loader: "default",
        }),
      })
    )

    // merge whatever from nextConfig into the webpack config storybook will use
    return { ...baseConfig }
  },
}
