import * as React from 'react'
import { useIntl } from 'react-intl'
import {
  Box,
  Flex,
  Typography,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Tabs, Modal, Button,
} from '@strapi/design-system'
import { Eye, Plus } from '@strapi/icons'
import { getTrad } from '../../../utils/getTrad'
import SettingsModal from './SettingsModal'

interface ContentType {
  uid: string
  globalId: string
}

interface ProtectedConfig {
  [key: string]: any
}

interface MainProps {
  contentTypes: {
    collectionTypes: ContentType[]
    singleTypes: ContentType[]
  };
  protectedConfigs: ProtectedConfig;
}

export const Main: React.FC<MainProps> = ({ contentTypes, protectedConfigs }) => {
  const { formatMessage } = useIntl();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const TabValues = {
    collectionTypes: 'collection-types',
    singleTypes: 'single-types',
  };

  return (
    <Box padding={8}>
      <Tabs.Root id="tabs" variant="simple" defaultValue={TabValues.collectionTypes}>
        <Tabs.List>
          <Tabs.Trigger value={TabValues.collectionTypes}>
            <Typography>
              {formatMessage({
                id: getTrad('protected-preview.main.tab.collection-type-title'),
                defaultMessage: 'Collection Types',
              })}
            </Typography>
          </Tabs.Trigger>
          <Tabs.Trigger value={TabValues.singleTypes}>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('protected-preview.main.tab.single-type-title'),
                defaultMessage: 'Single Types',
              })}
            </Typography>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={TabValues.collectionTypes}>
          {/* TABLE */}
          <Table colCount={2} rowCount={contentTypes.collectionTypes.length}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({
                      id: getTrad('protected-preview.main.tab-panel.column-name'),
                      defaultMessage: 'Name',
                    })}
                  </Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {contentTypes.collectionTypes.map((item: ContentType) => (
                <Tr key={item.uid}>
                  <Td>
                    <Typography textColor="neutral800">{item.globalId}</Typography>
                  </Td>
                  <Td >
                    <Flex justifyContent="right" alignItems="right">
                    <Modal.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                      <Modal.Trigger>
                        <Box paddingTop={4}>
                          {protectedConfigs[item.uid] ?
                          <Button variant="primary" startIcon={<Eye />}>
                            {formatMessage({
                              id: getTrad('protected-preview.main.settings'),
                              defaultMessage: 'Protected Preview settings',
                            })}
                          </Button>
                          :
                            <Button variant="secondary" startIcon={<Plus />}>
                              {formatMessage({
                                id: getTrad('protected-preview.main.settings'),
                                defaultMessage: 'Protected build',
                              })}
                            </Button>
                          }
                        </Box>
                      </Modal.Trigger>
                      <SettingsModal collectionType={item.uid} settings={protectedConfigs[item.uid]} />
                    </Modal.Root>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* END TABLE */}
        </Tabs.Content>
        <Tabs.Content value={TabValues.singleTypes}>
          {/* TABLE */}
          <Table colCount={2} rowCount={contentTypes.singleTypes.length}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({
                      id: getTrad('protected-preview.main.tab-panel.column-name'),
                      defaultMessage: 'Name',
                    })}
                  </Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {contentTypes.singleTypes.map((item: ContentType) => (
                <Tr key={item.uid}>
                  <Td>
                    <Typography textColor="neutral800">{item.globalId}</Typography>
                  </Td>
                  <Td>
                    <Flex justifyContent="right" alignItems="right">
                        <Modal.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                          <Modal.Trigger>
                            <Box paddingTop={4}>
                              {protectedConfigs[item.uid] ?
                                <Button variant="primary" startIcon={<Eye />}>
                                  {formatMessage({
                                    id: getTrad('protected-preview.main.settings'),
                                    defaultMessage: 'Protected Preview settings',
                                  })}
                                </Button>
                                :
                                <Button variant="secondary" startIcon={<Plus />}>
                                  {formatMessage({
                                    id: getTrad('protected-preview.main.settings'),
                                    defaultMessage: 'Protected build',
                                  })}
                                </Button>
                              }
                            </Box>
                          </Modal.Trigger>
                          <SettingsModal collectionType={item.uid} settings={protectedConfigs[item.uid]} />
                        </Modal.Root>
                      </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* END TABLE */}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};
