export const copyToClipboard = async (text: string): Promise<void> => {
  if (!text) {
    console.error('No text provided to copy.')
    return;
  }

  try {
    await navigator.clipboard.writeText(text)
    console.log('Text successfully copied to clipboard:', text)
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error)
    throw new Error('Unable to copy text.')
  }
};
