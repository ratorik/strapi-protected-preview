import type {Core} from '@strapi/strapi'
import {PLUGIN_ID} from '../../../shared/utils/pluginId'

const controller = ({strapi}: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('protected-preview')
      .service('service')
      .getWelcomeMessage()
  },
  async getContentTypes(ctx) {
    try {
      const service = strapi.plugin(PLUGIN_ID).service('protectedPreviewService')
      ctx.body = await service.getContentTypes()

    } catch (error) {
      ctx.throw(500, 'Failed to fetch content types')
    }
  },
  async getConfig(ctx) {
    try {
      ctx.body = strapi.config.get(`plugin::${PLUGIN_ID}`)
    } catch (error) {
      ctx.throw(500, 'Failed to fetch config')
    }
  },
  async GetDraftKeys(ctx) {
    const { contentType } = ctx.params;
    try {
      ctx.body = await strapi.db.query(`plugin::${PLUGIN_ID}.draft-key`).findMany({
        where: {
          contentType : contentType,
        },
      });
    } catch (error) {
      ctx.throw(500, 'Failed to fetch draft keys')
    }
  },

  async SetDraftKey(ctx) {
    try {
      ctx.body = await strapi.documents(`plugin::${PLUGIN_ID}.draft-key`).create({
        data: ctx.request.body,
        fields: ["contentType", "key", "expiryDate", "locale"],
      });
    } catch (error) {

      ctx.throw(500, 'Failed to make draft key')
    }
  }

})

export default controller
