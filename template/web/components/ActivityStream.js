import Link from 'next/link'
import { imageBuilder } from '../lib/sanity'
import { Avatar, Badge, Container, Heading, List, ListItem, Tag, TagLeftIcon, TagLabel, Wrap } from '@chakra-ui/core'
import { SunIcon } from '@chakra-ui/icons'
import Timespan from './Timespan'
import PortableTextBlock from './PortableTextBlock'
import Map from './Map';
import HasType from './HasType'

export default function ActivityStream({stream}) {
  if(!stream) {
    return null
  }
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <Container maxW="md" marginTop={10}>
      <Heading>
        Activitystream
      </Heading>
      <List spacing={5}>
        {stream.map(activity => (
          <ListItem>
            {activity.label && (
              <Heading>
                {activity.label}
              </Heading>
            )}
            <Badge>
              {capitalize(activity._type)}
            </Badge>

            {activity.hasType && (
              <HasType types={activity.hasType} />
            )}

            {activity.timespan && (
              <Timespan timespan={activity.timespan} />
            )}

            {activity.description && (
              <PortableTextBlock blocks={activity.description} />
            )}

            {activity.carriedOutBy?.length > 0 && activity.carriedOutBy.map(inRole => (
              <Wrap>
                <Link
                  key={inRole.actor.id}
                  href={`/id/${inRole.actor.id}`}
                >
                  <Avatar   
                    name={inRole.actor.label} 
                    src={imageBuilder.image(inRole.actor.mainRepresentation).height('300').width('300').url()} 
                  />
                </Link>
              </Wrap>
            ))}

            {activity.tookPlaceAt?.length > 0 && activity.tookPlaceAt.map(place => (
              <>
                <Tag size="lg" marginBottom={5} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={SunIcon} />
                  <TagLabel>
                    <Link href={`/id/${place._id}`}>
                      <a>
                        {place.label.nor}
                      </a>
                    </Link>
                  </TagLabel>
                </Tag>

                {place.definedByGeoJSON && (
                  <div>
                    <Map data={place.definedByGeoJSON} />
                  </div>
                )}
              </>
            ))}

            {activity.movedTo && (
              <p>
                <span>
                  ➡️
                  <a href={`/id/${activity.movedTo._id}`}>
                    {activity.movedTo.label.nor}
                  </a>
                </span>
              </p>
            )}

            {activity.observedDimension?.length > 0 && activity.observedDimension.map(dimension => (
              <span>
                <strong>{dimension.hasType}:</strong>
                {dimension.value} {dimension.hasUnit}
              </span>
            ))}
            
            {activity.geoJSON && (
              <div>
                <Map data={activity.geoJSON} />
              </div>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
