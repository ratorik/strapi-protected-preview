import React, { useState } from 'react'
import {Modal, Typography, Box, Button } from '@strapi/design-system'
import { useIntl } from 'react-intl'
import { getTrad } from '../../../utils/getTrad'
import { CountdownComponent } from '../../countdownComponent'
import { copyToClipboard } from '../../../utils/copyToClipboard'
import { Duplicate } from '@strapi/icons'

interface PreviewProps {
  previewLink: string
  expiryDate: Date
}

export const PreviewLinkWithCountdown: React.FC<PreviewProps> = ({previewLink, expiryDate}) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const {formatMessage} = useIntl()

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(previewLink)
      setCopySuccess(
        formatMessage({
          id: getTrad('protected-preview.preview-link.copy-success'),
          defaultMessage: 'Link copied to clipboard!',
        })
      )

      setTimeout(() => setCopySuccess(null), 3000)
    } catch {
      setCopySuccess(
        formatMessage({
          id: getTrad('protected-preview.preview-link.copy-failure'),
          defaultMessage: 'Failed to copy link.',
        })
      )
    }
  }

  return (
    <Modal.Content labelledBy="title">
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('protected-preview.preview-link.link'),
            defaultMessage: 'Generated Preview Link',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Box>
          <Typography variant="epsilon" textColor="neutral600" marginBottom={2}>
            <a href={previewLink} target="_blank" rel="noopener noreferrer"
               style={{textDecoration: 'none', color: 'inherit'}}>
              {previewLink}
            </a>
          </Typography>
          <Box paddingTop={4}>
            <Button variant="secondary" startIcon={<Duplicate/>} onClick={handleCopyLink}>
              {formatMessage({
                id: getTrad('protected-preview.preview-link.copy'),
                defaultMessage: 'Copy preview link',
              })}
            </Button>
          </Box>
          {copySuccess && (
            <Typography variant="epsilon" marginTop={2} textColor="success500" fontWeight="bold" fontSize="11px" >
              {copySuccess}
            </Typography>
          )}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Box>
          <Typography variant="epsilon" marginTop={4} fontWeight="bold" textColor="neutral400" fontSize="11px">
            <CountdownComponent expiryDate={expiryDate} />
          </Typography>
        </Box>
      </Modal.Footer>
    </Modal.Content>
  )
}
