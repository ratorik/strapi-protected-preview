export default {
  'protected-preview' : {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/content-types',
        handler: 'controller.getContentTypes',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/config',
        handler: 'controller.getConfig',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/draft-keys/:contentType',
        handler: 'controller.GetDraftKeys',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/draft-key',
        handler: 'controller.SetDraftKey',
        config: {
          policies: [],
        },
      }
    ]
  }
};
