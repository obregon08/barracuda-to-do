# Barracuda To Do App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Documentation

**IMPORTANT: If you would like more information about Next.js, Storybook or any of the concepts in this project, please check the following:**

- [Next.js tutorial](https://nextjs.org/learn/basics/create-nextjs-app)
- [Storybook](https://storybook.js.org/)
- [Styled Components](https://styled-components.com/)
- [Atomic Design Principles](https://atomicdesign.bradfrost.com/chapter-2/)
- Internationalization: [i18next package](https://react.i18next.com/) and [i18n-routing on Next.js](https://nextjs.org/docs/advanced-features/i18n-routing)
- [React Hooks Video](https://app.pluralsight.com/course-player?clipId=a6da93c0-93f4-4cf1-b45d-b9e55923679f)
- State management: This project doesn't use Redux, [but singleton react hooks](https://www.npmjs.com/package/react-singleton-hook).
  Here's [an article](https://levelup.gitconnected.com/using-react-hooks-for-global-state-management-951834054971)
  from the author of the react-singleton-hook library which explains in detail how it works.
  [This other article](https://www.freecodecamp.org/news/what-is-state-in-react-explained-with-examples/) is helpful in providing foundational understanding of React state-management in general.
- Error management: [Sentry](https://sentry.io/). Here's [an article with good advice about error handling.](https://blog.insiderattack.net/error-management-in-node-js-applications-e43198b71663)
- [Material UI](https://material-ui.com/)
- [Frontend Architecture](https://dev.to/quochuytlbk/a-different-approach-to-frontend-architecture-38d4)

You can find more information about the content of each folder by review the Readme file in it.

- [Storybook](.storybook/README.md)
- [Pages](pages/README.md)
- [Providers](providers/README.md)
- [UI](ui/README.md)

## Prerequisites

- node v14.16.0 LTS (see .nvmrc file)
- yarn 1.19.1

## Running NextJs

Prepare the env vars by copying `env.sample` to `.env.local`

Make sure you're using the correct node version. If you have nvm installed then just run:

```bash
nvm use
```

Installing all packages

```bash
yarn install
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Running StoryBook (component browser, preview and documentation)

Run the server:

```bash
yarn sb
```

Open [http://localhost:9001](http://localhost:9001) with your browser to see the result.

You can start editing the \*.stories.js files. The `stories` folder contains
the default StoryBook files which can be used as a reference to implement our stories.

The goal is to have a story for each component.

## Running Swagger Editor (API docs)

Option 1 (**Recommended**): If your IDE supports a Swagger plugin (i.e https://plugins.jetbrains.com/plugin/14837-openapi-swagger-editor),
then just use that plugin. It should allow you to edit the swagger.json file, preview its changes and call the local API.

Option 2: Use Spotlight Studio (free version, but you have to register to get the key) (https://stoplight.io/studio/). It supports mocking the API

Option 3: This option requires the Docker daemon to be running. Follow the instructions at https://github.com/swagger-api/swagger-editor. In summary:

1. First, you need to download the Swagger docker image:

```bash
docker pull swaggerapi/swagger-editor
```

2. Run the Swagger/OpenAPI Editor docker container and then view it http://localhost:8080/

```bash
docker run -d -p 8080:8080 --name swagger_next swaggerapi/swagger-editor
```

3. Click File > Import URL, then type "http://localhost:3000/swagger.json" in the input box.

The generated swagger.json file is at `./public/swagger.json`.

**IMPORTANT**: Remember to provide the correct CORS config to your endpoints, otherwise Swagger won't be able to
consume the endpoint.

## Browsing the API Docs

The API docs are rendered with the ReDoc react component. To browse the swagger.json file:

1. Start the nextjs server: `next dev`
2. Go to: `http://localhost:3000/api-docs`

# Deploy Setup

TBD

# Regular Deployments

TBD

# Tests & Type checking

To run `pretty` (beautifier), `eslint` (linter) and `tsc` (type checking), run the following command. It will be automatically run by a pre-commit hook:

```bash
yarn x
```

This project has Cypress (https://www.cypress.io/) already setup locally with the example integration in the `./cypress` folder.

Before running Cypress tests, make sure the app is running (`yarn dev`). To run tests with Cypress run:

```bash
yarn test
```

# Conventions:

### DO:

1. Use full name for variables and props as much as possible. i.e use `imageUrl` instead of `imgUrl`. Same as `MOCK_SECTION_NAME_DATA` is better than `MOCK_DATA`
2. Name things for what they are with whole words: `buttonLabel` is better than `bl`

### DON'T:

1. Do not dynamically change data structure in middle components. Any data structure change should happen at the
   page level (i.e Contentful data structure coming in as a prop needs to be re-structured to match our internal
   references. See next point).
2. Do not create a tight couple between components and external services. For example, if a component needs an image url which comes
   from Contentful as `{image: {sys: { ... }, fields: { file: { url: 'the-url.png' } } } }`, then
   at the page level (top level component where we pull those props) reformat the prop structure that gets passed to the
   component:

   ```tsx
   const myComponentData = fetchContent("theContentType", "theSlug", 2) // fetch content from Contentful with a depth of 2 for nested relationships

   /// OPTION 1 (preferred way, it's more explicit than option 2):
   const myComponentProp = {
     firstName: myComponentData.fiRsT_naM_e, // we're internally using camelCase.
     lastName: myComponentData.lastName,
     imageUrl: myComponentData.image.fields.file.url, // or use: getUrlFromContentfulImgRecord(myComponentData)
   }

   /// OPTION 2 (in case you have a lot of fields and don't want to type them all)
   const myComponentProp = {
     ...myComponentData, // i.e. { firstName: string, lastName: string, etc... }
     imageUrl: myComponentData.image.fields.file.url, // or use: getUrlFromContentfulImgRecord(myComponentData)
   }
   ```

# Design

Below is a list of some design dependencies and resources:

### Material UI Theme Customization

https://material-ui.com/customization/default-theme/

### Icons

https://fontawesome.com/v5.15/icons?d=gallery&p=2

# Limitations

1. Non-critical limitation: i18n support is not compatible with next export. That means we have to deploy and serve
   the app with node. An "exported" site could be served with Apache or any other webserver since the export generates
   static files.

# Known Issues

#####(feel free to add any known issue here and if you find a solution, add it here for documentation purposes)

TBD
