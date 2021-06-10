# Pages

**DEFINITION:** In Next.js, a page is a React Component exported from a .js, .jsx, .ts, or .tsx file in the pages directory. Each page is associated with a route based on its file name.

Example: If you create `pages/about.js` that exports a React component like below, it will be accessible at `/about`.

```tsx
function About() {
  return <div>About</div>
}

export default About
```

Since we're implementing the Atomic Design Pattern, pages will only import [templates](../ui/templates/README.md). Pages can fetch data (if needed) using [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation), [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) or [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps) to configure templates. Pages shouldn't import atoms, molecules, or organisms directly.

## Api routes:

API routes provide a solution to build your API with Next.js.

Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a page.
They are server-side only bundles and won't increase your client-side bundle size.

For example, the following API route `pages/api/user.js` returns a json response with a status code of 200:

```ts
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" })
}
```

## Resources:

- https://nextjs.org/docs/basic-features/pages
- https://nextjs.org/docs/api-routes/introduction
