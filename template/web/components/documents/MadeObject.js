import dynamic from 'next/dynamic'
import { ViewIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Grid, 
  Container, 
  Divider,
  Heading, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useClipboard
} from '@chakra-ui/core'
import ReferredToBy from '../ReferredToBy'
import Palette from '../Palette'
import Depicts from '../Depicts'
import ActivityStream from '../ActivityStream'
import HasType from '../HasType'
import Subject from '../Subject'

const MiradorWithNoSSR = dynamic(
  () => import('../Mirador'),
  { ssr: false }
)

export default function MadeObject(item) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(item, null, 2))

  return (
    <>
      <Grid 
        w="100%"
        p={5}
        gridGap={{xl: 5, base: 0}}
        alignContent="start"
        gridTemplateAreas={{ xl: `"image image metadata"`, base: `"image" "metadata"`}}
        gridTemplateColumns={{ xl: "1fr 1fr 1fr", base: "1fr" }}
      >
        <Container maxW="md" gridArea="metadata">
          {item.mainRepresentation?.palette && (
            <Palette colors={item.mainRepresentation.palette} />
          )}

          <Heading mt={5} mb={5}>
            {item.label}
            <Button marginLeft={5} onClick={onOpen}><ViewIcon/></Button>
          </Heading>

          {item.hasType && (
            <HasType types={item.hasType} />
          )}

          {item?.referredToBy && (
            <Box>
              <ReferredToBy array={item.referredToBy} />
            </Box>
          )}

          {item.subject && (
            <Subject subjects={item.subject} />
          )}     
        </Container>

        {/* {item.mainRepresentation && !item.subjectOfManifest && (
          <Center 
            gridArea="image"
            borderRight={{xl: "1px"}} 
            borderColor={{xl: "gray.200"}}
          >
            <ItemImage 
              id={item.id} 
              label={item.label}
              url={item.mainRepresentation} 
            />
          </Center>
        )} */}

        {item.subjectOfManifest && (
          <Box gridArea="image">
            <MiradorWithNoSSR manifest={[item.subjectOfManifest]} />
          </Box>
        )}

        {item.manifest && !item.subjectOfManifest && (
          <Box gridArea="image">
            <MiradorWithNoSSR manifest={[item.manifest]} />
          </Box>
        )}
      </Grid>

      <Divider />

      {item.depicts && (
        <Depicts depicted={item.depicts} />
      )}
      
      {item.activityStream && (
        <ActivityStream stream={item.activityStream} />
      )}
      
      <Modal 
        isOpen={isOpen} 
        size="full" 
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>JSON</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <pre>
              {JSON.stringify(item, null, 2)}
            </pre>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
