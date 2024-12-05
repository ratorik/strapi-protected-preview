import type { Core } from '@strapi/strapi'
import protectDraftMiddleware from './middlewares'
import {PLUGIN_ID} from '../../shared/utils/pluginId'

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  const config = strapi.config.get(`plugin::${PLUGIN_ID}`)
  strapi.server.use(protectDraftMiddleware(config, { strapi }))
};

export default register
