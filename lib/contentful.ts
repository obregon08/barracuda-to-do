const contentful = require("contentful")

const CONTENTFUL_CONFIG = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
}

const client = contentful.createClient(CONTENTFUL_CONFIG)

export type ContentfulRecordWithImg = {
  image: {
    fields: {
      description: string
      file: {
        url: string
      }
    }
  }
}

export interface ContentfulRecord {
  sys: {
    id: string
  }
  type: string
  contentType: {
    id: string
  }
  createdAt: string
  updatedAt: string
  locale: "en-US"
  fields: {
    slug: string
  }
}

const fetchEntry = (contentType, slug, depth = 1) => {
  return client
    .getEntries({
      content_type: contentType,
      "fields.slug": slug,
      include: depth,
    })
    .then((response) => response.items)
    .catch((error) => {
      console.log(`\nError occurred while fetching Entries for ${contentType}`)
      console.error(error)
    })
}

const displayEntry = (contentType, slug, depth) =>
  fetchEntry(contentType, slug, depth).then((entries) => entries[0].fields)

export const fetchContent = (contentType: string, slug: string, depth?: number): Promise<any> => {
  return displayEntry(contentType, slug, depth).catch((error) => {
    console.log("\nError occurred:")
    if (error.stack) {
      console.error(error.stack)
      return
    }
    console.error(error)
  })
}

export const fetchEntryById = (id: string | number): Promise<any> => {
  return client
    .getEntry(id)
    .then((response) => response)
    .catch((error) => {
      console.log(`\nError occurred while fetching entry for ${id}`)
      console.error(error)
    })
}

export const getUrlFromContentfulImgRecord = (record: ContentfulRecordWithImg): string => record.image.fields.file.url
export const getAltFromContentfulImgRecord = (record: ContentfulRecordWithImg): string =>
  record.image.fields.description || ""
export const getIdFromContentfulRecord = (record: ContentfulRecord): string => record.sys.id
