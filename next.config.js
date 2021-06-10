const path = require("path")
// const withBundleAnalyzer = require('@next/bundle-analyzer');
const withSourceMaps = require("@zeit/next-source-maps")()
const SentryWebpackPlugin = require("@sentry/webpack-plugin")
const { i18n } = require("./next-i18next.config")

const {
  NEXT_PUBLIC_SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env

const isProd = NODE_ENV === "production"

// const withDotenv = config => {
//   require('dotenv').config();
//   const path = require('path');
//   const Dotenv = require('dotenv-webpack');
//
//   config.plugins = config.plugins || [];
//   config.plugins.push(
//     new Dotenv({
//       path: path.join(__dirname, '.env'),
//       systemvars: true,
//     })
//   );
// };

const COMMIT_SHA = VERCEL_GITHUB_COMMIT_SHA || VERCEL_GITLAB_COMMIT_SHA || VERCEL_BITBUCKET_COMMIT_SHA

const getCDNUrl = () => {
  return process.env.CDN_URL
}

const nextConfig = {
  distDir: "./.next",
  images: {
    domains: ["images.ctfassets.net"], // contentful.com cdn
  },
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  assetPrefix: isProd ? getCDNUrl() : "",
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "./bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "./bundles/client.html",
    },
  },
  env: {
    NEXT_URL: process.env.NEXT_URL,
    WWW_URL: process.env.WWW_URL,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_HOST: process.env.CONTENTFUL_HOST,
    BASE_URL: process.env.BASE_URL,
    // Make the COMMIT_SHA available to the client so that Sentry events can be
    // marked for the release the belong to. It may be undefined if running
    // outside of Vercel
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
  },
  serverRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser"
      config.node = {
        fs: "empty",
        child_process: "empty",
        net: "empty",
        tls: "empty",
      }
    }

    // Define an environment variable so source code can check whether or not
    // it's running on the server so we can correctly initialize Sentry
    config.plugins.push(
      new options.webpack.DefinePlugin({
        "process.env.NEXT_IS_SERVER": JSON.stringify(options.isServer.toString()),
      })
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    })

    // if (!isProd) {
    //   withDotenv(config);
    // }

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      NEXT_PUBLIC_SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === "production"
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          urlPrefix: "~/_next",
          release: COMMIT_SHA,
        })
      )
    }

    return config
  },
  experimental: {
    sprFlushToDisk: false,
  },
  i18n,
}

// module.exports = withSourceMaps(withBundleAnalyzer(nextConfig));
module.exports = withSourceMaps(nextConfig)
