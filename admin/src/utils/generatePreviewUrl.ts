export function generatePreviewUrl(urlTemplate: string, entryData: Record<string, any>, previewKey: string): string {
  urlTemplate = urlTemplate.replace('{key}', previewKey)

  return urlTemplate.replace(/{(.*?)}/g, (match, key) => {
    if (key in entryData) {
      return entryData[key]
    }
    return match
  })
}
