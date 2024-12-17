import {PLUGIN_ID} from '../../../shared/utils/pluginId'

export default (config: any, {strapi}: { strapi: any }) => {
  return async (ctx: any, next: () => Promise<void>) => {

    if (ctx.url.startsWith('/admin')) {
      return await next()
    }

    const contentType = getContentTypeFromUrl(ctx.url, strapi)
    const rules = config[contentType]

    if (!rules) {
      return await next()
    }
    const draft = ctx.query?.status

    if (draft && draft !== 'published') {

      const authorizationHeader = ctx.request.headers['authorization'];
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ') && rules.alwaysAllowRequestsWithApiToken ) {
        // leave validation to strapi
        return await next()
      }

      const previewKey = ctx.query?.previewKey

      const entries = await strapi.documents(`plugin::${PLUGIN_ID}.draft-key`).findMany({
        contentType: contentType
      })

      for (const entry of entries) {
        if (entry.key === previewKey && new Date(entry.expiryDate) >= new Date()) {
          return await next()
        }
      }
      return ctx.forbidden('Drafts are protected.')
    }
    return await next()
  }
}

const getContentTypeFromUrl = (url: string, strapi: any): string | null => {
  const allContentTypes = Object.entries(strapi.contentTypes)
  const matchedContentType = allContentTypes.find(([uid, schema]) => {

    const contentType = schema as { info: { pluralName: string } }
    if (contentType?.info?.pluralName) {
      return url.startsWith(`/api/${contentType.info.pluralName}`)
    }

    return false
  })

  return matchedContentType ? matchedContentType[0] : null
}

