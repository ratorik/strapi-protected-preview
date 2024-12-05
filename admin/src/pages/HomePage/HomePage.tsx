import * as React from 'react'
import { useIntl } from 'react-intl'
import { Box } from '@strapi/design-system'
import { Information } from '@strapi/icons'
import { Page, ContentBox, useFetchClient } from '@strapi/strapi/admin'
import { Main } from '../../components/HomePage/Main'
import { Header } from '../../components/HomePage/Header'
import { getTrad } from '../../utils/getTrad'
import { PLUGIN_ID } from '../../../../shared/utils/pluginId'

interface ContentType {
  uid: string
  globalId: string
}

interface ContentType {
  collectionTypes: ContentType[]
  singleTypes: ContentType[]
}

interface ProtectedConfig {
  [key: string]: any
}

export const HomePage = React.memo(() => {
  const { get } = useFetchClient()
  const { formatMessage } = useIntl()
  const [isLoading, setIsLoading] = React.useState(true)
  const [shouldEffect] = React.useState(false)
  const [contentTypes, setContentTypes] = React.useState<{ collectionTypes: ContentType[]; singleTypes: ContentType[] } | null>(null)
  const [pluginConfig, setPluginConfig] = React.useState<ProtectedConfig | null>(null)

  const fetchContentTypes = async () => {
    try {
      const { data } = await get(`/${PLUGIN_ID}/content-types`)
      setContentTypes(data)
    } catch (error) {
      console.error('Error fetching content types:', error)
      setContentTypes(null)
    }
  };

  const fetchPluginConfig = async () => {
    try {
      const { data } =  await get(`/${PLUGIN_ID}/config`)
      setPluginConfig(data)
    } catch (error) {
      console.error('Error fetching plugin config:', error)
      setPluginConfig(null)
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchContentTypes();
      await fetchPluginConfig();
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, [shouldEffect]);

  if (isLoading) {
    return <Page.Loading />;
  }

  if (!contentTypes || !pluginConfig) {
    return <Page.Error />;
  }

  return (
    <React.Fragment>
      <Header />
      <Box paddingLeft={8} paddingRight={8}>
        <ContentBox
          title={formatMessage({
            id: getTrad('protected-preview.info.title'),
            defaultMessage: 'Information',
          })}
          subtitle={formatMessage({
            id: getTrad('protected-preview.info.information'),
            defaultMessage:
              "Protect your draft content so it can only be viewed with a valid link.",
          })}
          icon={<Information />}
          iconBackground="primary100"
        />
      </Box>
      <Main contentTypes={contentTypes} protectedConfigs={pluginConfig} />
    </React.Fragment>
  );
});
