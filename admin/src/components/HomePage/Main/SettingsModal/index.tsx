import React, { useState, useEffect } from 'react'
import { Modal, Button, TextInput, Box, Typography } from '@strapi/design-system'
import {getTrad} from '../../../../utils/getTrad'
import {Duplicate} from '@strapi/icons'
import {useIntl} from 'react-intl'
import {copyToClipboard} from '../../../../utils/copyToClipboard'

interface SettingsModalProps {
  collectionType: string
  settings: any
}

const SettingsModal: React.FC<SettingsModalProps> = ({ collectionType, settings = {} }) => {
  const [linkTimeoutInSec, setLinkTimeoutInSec] = useState(settings.linkTimeoutInSec ?? 3600)
  const [previewUrl, setPreviewUrl] = useState(settings.previewUrl ?? 'https://example.com/api/examples?status=draft&previewKey={key}')
  const [jsonConfig, setJsonConfig] = useState<string>('')
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const {formatMessage} = useIntl()

  useEffect(() => {
    const config = {
      [collectionType]: {
        linkTimeoutInSec,
        previewUrl,
      },
    };
    setJsonConfig(JSON.stringify(config, null, 2))
  }, [linkTimeoutInSec, previewUrl, collectionType])

  const handleLinkTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkTimeoutInSec(Number(e.target.value));
  };

  const handlePreviewUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreviewUrl(e.target.value);
  };

  const handleCopyJson = async () => {
    try {
      await copyToClipboard(jsonConfig)
      setCopySuccess(formatMessage({
        id: getTrad('protected-preview.settings.copy-success'),
        defaultMessage: 'Json copied to clipboard!',
      }));

      setTimeout(() => setCopySuccess(null), 3000)
    } catch (error) {
      console.error('Failed to copy link:', error)
      setCopySuccess(formatMessage({
        id: getTrad('protected-preview.preview-link.copy-failure'),
        defaultMessage: 'Failed to Json link.',
      }));
    }
  };

  return (
    <Modal.Content>
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('protected-preview.settings-modal.title'),
            defaultMessage: 'Configure Protected Preview',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Box marginBottom={4}>
          <TextInput
            label="Link Timeout (in seconds)"
            value={linkTimeoutInSec}
            onChange={handleLinkTimeoutChange}
            type="number"
          />
        </Box>

        <Box marginBottom={4}>
          <TextInput
            label="Preview URL"
            value={previewUrl}
            onChange={handlePreviewUrlChange}
            description="The preview key is required to fetch draft data. Use {slug} and {key} as placeholders."
          />
        </Box>

        <Box marginBottom={4}>
          <strong>Generated JSON:</strong>
          <textarea
            value={jsonConfig || ''}
            readOnly
            rows={10}
            style={{ width: '100%', resize: 'none' }}
            placeholder="JSON will be generated here..."
          />
          <Button variant="secondary" startIcon={<Duplicate/>} onClick={handleCopyJson}>
            {formatMessage({
              id: getTrad('protected-preview.settings-modal.copy'),
              defaultMessage: 'Copy Json for plugins config',
            })}
          </Button>
          {copySuccess && (
            <Typography variant="epsilon" marginTop={2} textColor="success500" fontWeight="bold" fontSize="11px" >
              {copySuccess}
            </Typography>
          )}
        </Box>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

export default SettingsModal;
