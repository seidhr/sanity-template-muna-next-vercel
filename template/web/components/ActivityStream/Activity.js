import Link from 'next/link'
import { imageBuilder } from '../../lib/sanity'
import { 
  Avatar, 
  AvatarGroup, 
  Badge, 
  Box, 
  Grid, 
  Heading,
  HStack,
  List, 
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton, 
  Portal,
  Tag, 
  TagLeftIcon, 
  TagLabel} from '@chakra-ui/core'
import { SunIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import Timespan from '../Timespan'
import PortableTextBlock from '../PortableTextBlock'
import Map from '../Map';
import HasType from '../HasType'
import { capitalize } from '../../lib/utils'

export default function Activity({data}) {
  if(!data) {
    return null
  }

  return (
    <Grid
      boxShadow="xl"
      borderColor="gray.200"
      borderWidth={1}
      borderRadius={3}
      w="100%"
      gridGap={5}
      alignContent="start"
      gridTemplateAreas={{ xl: `"metadata map"`, base: `"metadata map"`}}
      gridTemplateColumns={{ xl: "2fr 1fr", base: "2fr 1fr" }}
    >
      <Box pt={3} pb={6} pl={6} gridArea="metadata">
        <Heading>
          {data.label ? data.label : capitalize(data._type)}
        </Heading>

        {data.label && !data.hasType && (
          <Badge>
            {capitalize(data._type)}
          </Badge>
        )}

        {data.hasType?.length > 0 && (
          <HasType types={data.hasType} />
        )}

        {data.timespan && (
          <Timespan timespan={data.timespan} />
        )}

        {data.tookPlaceAt?.length > 0 && data.tookPlaceAt.map(place => (
          <HStack mt={2} mb={2}>
            <Tag size="lg" variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={SunIcon} />
              <TagLabel>
                <Link href={`/id/${place._id}`}>
                  <a>
                    {place.label.nor}
                  </a>
                </Link>
              </TagLabel>
            </Tag>
          </HStack>
        ))}

        {data.description && (
          <PortableTextBlock blocks={data.description} />
        )}

        <HStack>
        {data.carriedOutBy?.length > 0 && (
          <AvatarGroup size="md">
            {data.carriedOutBy.map(inRole => (
              <Popover>
                <PopoverTrigger>
                  <Avatar   
                    name={inRole.actor.label} 
                    src={imageBuilder.image(inRole.actor.mainRepresentation).height('300').width('300').url()} 
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Utført av</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Link
                        key={inRole.actor._id}
                        href={`/id/${inRole.actor._id}`}
                      >
                        <a>{inRole.actor.label}</a>
                      </Link>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            ))}
          </AvatarGroup>
        )}

        {data.target && (
          <>
            <ArrowForwardIcon/>
            <Popover>
              <PopoverTrigger>
                <Avatar   
                  name={data.target.label} 
                  src={imageBuilder.image(data.target.mainRepresentation).height('300').width('300').url()} 
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Mål for handling</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Link
                      key={data.target._id}
                      href={`/id/${data.target._id}`}
                    >
                      <a>{data.target.label}</a>
                    </Link>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </>
        )}
        </HStack>

        {data.movedTo && (
          <p>
            <span>
              ➡️
              <a href={`/id/${data.movedTo._id}`}>
                {data.movedTo.label.nor}
              </a>
            </span>
          </p>
        )}

        {data.observedDimension?.length > 0 && data.observedDimension.map(dimension => (
          <span>
            <strong>{dimension.hasType}:</strong>
            {dimension.value} {dimension.hasUnit}
          </span>
        ))}
      </Box>

      <Box gridArea="map">
        {data.tookPlaceAt?.length > 0 && data.tookPlaceAt.map(place => (
          <>
            {place.definedByGeoJSON && (
              <div>
                <Map data={place.definedByGeoJSON} />
              </div>
            )}
          </>
        ))}

        {data.geoJSON && (
          <div>
            <Map data={data.geoJSON} />
          </div>
        )}
      </Box>
    </Grid>
  )
}
