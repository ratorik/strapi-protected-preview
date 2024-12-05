# Protected Preview Plugin for Strapi

The Protected Preview plugin provides a simple way to generate time-limited, protected preview links for content in your Strapi application. This is especially useful for sharing content drafts securely before they are published.

## 🚀 Features
- Generate time-limited preview links for your content.
- Easy integration with your existing Strapi application.
- Countdown timer to indicate link expiration.
- The associated keys will be automatically removed via a cron job when the time expires.

## ⚠️ Compatibility
- **Strapi Version**: This plugin is compatible with Strapi v5.x and above.
- **API Type**: Currently tested with **REST endpoints only**. GraphQL support is untested.
- **Key Scope**: The keys are valid for all items within a collection type.
- **URL Handling**: The generated preview URLs will work if the API URL starts with a UUID.

## 📦 Installation
TODO

## ⚙️ Configuration
1. Add the plugin to your Strapi project by including it in your `plugins.js` configuration:

```js
module.exports = {
  "protected-preview": {
    enabled: true,
    resolve: "./src/plugins/protected-preview",
    config: {
      'api::article.article': {
        'linkTimeoutInSec': 3600,  
        'previewUrl': 'http://localhost:1337/api/articles?filters[slug][$eq]={slug}&status=draft&previewKey={key}',
      },
    },
  },
};
```

### In the configuration above:
- **linkTimeoutInSec**: The duration in seconds for which the preview link will be valid (3600 seconds = 1 hour).
- **previewUrl**: The URL structure for generating the preview link. The `{slug}` value will be replaced dynamically with the entry's slug, and `{key}` will be replaced with the `previewKey` that the API will use to check and validate the preview link.

You can adjust these settings according to your content model and desired behavior.