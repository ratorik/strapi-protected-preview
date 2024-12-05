import * as React from 'react'
import {useIntl} from 'react-intl'
import {Box, Button, Typography, Modal} from '@strapi/design-system'
import {Eye, Duplicate} from '@strapi/icons'
import {v4 as uuidv4} from 'uuid'
import {PreviewLinkWithCountdown} from './previewLinkWithCountdown'
import {PLUGIN_ID} from '../../../../../shared/utils/pluginId'
import {getTrad} from '../../../utils/getTrad'
import {useFetchClient} from '@strapi/strapi/admin'
import {generatePreviewUrl} from '../../../utils/generatePreviewUrl'
import {copyToClipboard} from '../../../utils/copyToClipboard'
import {CountdownComponent} from '../../countdownComponent'

export const previewContext = React.createContext<string | null>(null)

interface DraftKey {
  key: string
  expiryDate: string
  id: string
}

export const RightPanel = ({config, slug, entry, draftKeys: initialDraftKeys}: {
  config: any
  slug: string
  entry: any
  draftKeys: DraftKey[]
}) => {
  const {formatMessage} = useIntl()
  const {post} = useFetchClient()
  const [previewLink, setPreviewLink] = React.useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [expiryDate, setExpiryDate] = React.useState<Date | null>(null)
  const [draftKeys, setDraftKeys] = React.useState(initialDraftKeys || [])

  React.useEffect(() => {
    if (Array.isArray(initialDraftKeys)) {
      setDraftKeys(initialDraftKeys)
    }
  }, [initialDraftKeys])

  const handleGeneratePreview = async () => {
    const previewKey = uuidv4()
    const expiryDate = new Date(new Date().getTime() + config.linkTimeoutInSec * 1000)

    const data = {
      contentType: slug,
      key: previewKey,
      expiryDate: expiryDate ? expiryDate.toISOString() : null,
      locale: entry.locale,
    }

    try {
      const response = await post(`/${PLUGIN_ID}/draft-key`, data)

      if (response?.data) {
        const generatedPreviewLink = generatePreviewUrl(config.previewUrl, entry, previewKey)

        setPreviewLink(generatedPreviewLink)
        setExpiryDate(expiryDate)
        setDraftKeys((prevKeys) => [...(prevKeys || []), response.data])

      } else {
        console.error('Failed to generate draft key. No data in response.')
      }
    } catch (error) {
      console.error('Error generating draft key:', error)
    }
  }

  return (
    <previewContext.Provider value={previewLink}>
      <Box paddingTop={4} width="100%">
        <Typography tag="h2" variant="sigma" textTransform="uppercase" textColor="neutral600">
          {formatMessage({
            id: getTrad('protected-preview.cme-edit.title'),
            defaultMessage: 'Protected Preview',
          })}
        </Typography>

        <Modal.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Trigger>
            <Box paddingTop={4}>
              <Button variant="secondary" startIcon={<Eye/>} onClick={handleGeneratePreview}>
                {formatMessage({
                  id: getTrad('protected-preview.cme-edit.link-button'),
                  defaultMessage: 'Generate Preview Link',
                })}
              </Button>
            </Box>
          </Modal.Trigger>
          {previewLink && <PreviewLinkWithCountdown previewLink={previewLink} expiryDate={expiryDate || new Date()}/>}

          <Box paddingTop={4} paddingBottom={2}>
            <Typography tag="h2" variant="sigma" textTransform="uppercase" textColor="neutral600">
              {draftKeys && draftKeys.length > 0 ?
                formatMessage({
                  id: getTrad('protected-preview.cme-edit.drafts-links'),
                  defaultMessage: 'Current Drafts Links',
                }) :
                formatMessage({
                  id: getTrad('protected-preview.cme-edit.no-drafts-links'),
                  defaultMessage: 'No Drafts Links',
                })
              }
            </Typography>

            {draftKeys?.map((draftKey) => {
              const previewUrl = generatePreviewUrl(config.previewUrl, entry, draftKey.key)
              const expiryDate = new Date(draftKey.expiryDate)
              const shortPreviewUrl = previewUrl.length > 50 ? previewUrl.slice(0, 50) + '...' : previewUrl

              return (
                <Box key={draftKey.id} padding={4} marginTop={2} borderRadius={4} background={'neutral100'}>
                  <Box paddingTop={2}>
                    <Typography variant="pi" textColor="neutral500"
                                style={{maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                      {shortPreviewUrl}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" paddingTop={2} width="100%">
                    <Box flex="1" paddingTop={2} paddingBottom={2} fontsize={10}>
                      <CountdownComponent expiryDate={expiryDate}/>
                    </Box>
                    <Box display="flex" alignItems="center" >
                      <Button
                        variant="secondary"
                        onClick={() => copyToClipboard(previewUrl)}
                        startIcon={<Duplicate/>}
                        style={{marginLeft: '8px'}}
                      >
                        {formatMessage({
                          id: getTrad('protected-preview.copy-button'),
                          defaultMessage: 'Copy Link',
                        })}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Modal.Root>
      </Box>
    </previewContext.Provider>
  )
}
