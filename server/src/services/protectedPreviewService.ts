export const protectedPreviewService = ({ strapi }) => ({
  getContentTypes() {
    const contentTypes = strapi.contentTypes
    const keys = Object.keys(contentTypes)

    let collectionTypes = []
    let singleTypes = []

    keys.forEach((name) => {
      if (
        name.includes('api::') ||
        (contentTypes[name].__schema__.pluginOptions &&
          contentTypes[name].__schema__.pluginOptions['content-manager']?.visible === true)
      ) {
        const object = {
          uid: contentTypes[name]?.uid,
          kind: contentTypes[name]?.kind,
          globalId: contentTypes[name]?.globalId,
          attributes: contentTypes[name]?.attributes,
        };

        if (name.includes('api::')) {
          contentTypes[name]?.kind === 'collectionType'
            ? collectionTypes.push(object)
            : singleTypes.push(object)
        }
      }
    })
    return { collectionTypes, singleTypes} || null
  },
})
