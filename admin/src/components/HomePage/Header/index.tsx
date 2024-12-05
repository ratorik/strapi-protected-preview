import * as React from 'react'
import { useIntl } from 'react-intl'
import { Box } from '@strapi/design-system'
import { Layouts } from '@strapi/admin/strapi-admin'
import { getTrad } from '../../../utils/getTrad'

export const Header = () => {
  const { formatMessage } = useIntl();

  return (
    <Box background="neutral100">
      <Layouts.Header
        title={formatMessage({
          id: getTrad('protected-preview.header.title'),
          defaultMessage: 'Protected Preview',
        })}
        subtitle={formatMessage({
          id: getTrad('protected-preview.header.subtitle'),
          defaultMessage: 'Protected your Draft content for Preview',
        })}
        as="h2"
      />
    </Box>
  );
};
