import type { Core } from '@strapi/strapi'
import {PLUGIN_ID} from "../../shared/utils/pluginId"

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.cron.add({
    '0 * * * *': async () => {

      try {
        const now = new Date()
        await strapi.db.query(`plugin::${PLUGIN_ID}.draft-key`).deleteMany({
            where: {
              expiryDate: { $lt: now },
            },
        });

        strapi.log.info(`Removed for expired draft keys at: ${now.toISOString()}`)
      } catch (error) {
        strapi.log.error('error in deleting expired draft keys :', error)
      }
    },
  })
}

export default bootstrap
