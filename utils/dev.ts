/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const dir = (args) => {
  return process.env.NODE_ENV !== "production" ? console.dir(args, { depth: null }) : null
}
