export default {
  kind: 'collectionType',
  collectionName: 'draft_keys',
  info: {
    singularName: 'draft-key',
    pluralName: 'draft-keys',
    displayName: 'draft-key',
    description: 'Table to store draft validation keys with an expiration time',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: false,
    },
    i18n: {
      localized: false,
    },
  },
  attributes: {
    contentType: {
      type: 'string',
      required: true,
    },
    key: {
      type: 'string',
      required: true,
      unique: true,
    },
    expiryDate: {
      type: 'datetime',
      required: true,
    },
  },
}
