import Link from 'next/link'
import dynamic from 'next/dynamic';
import { Badge, Container, Heading, OrderedList, ListItem } from '@chakra-ui/core'
import Timespan from './Timespan'
import PortableTextBlock from './PortableTextBlock'
import Map from './Map';

export default function ActivityStream({stream}) {
  if(!stream) {
    return null
  }
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const MapWithNoSSR = dynamic(
    () => import('./Map'),
    { ssr: false }
  )

  return (
    <Container marginTop={10}>
      <Heading>
        Activitystream
      </Heading>
      <OrderedList spacing={5}>
        {stream.map(activity => (
          <ListItem>
            <Badge>
              {activity.activityType ? activity.activityType : capitalize(activity._type)}
            </Badge>
            {activity.timespan && (
              <Timespan timespan={activity.timespan} />
            )}
            {activity.description && (
              <PortableTextBlock blocks={activity.description} />
            )}
            {activity.carriedOutBy?.length > 0 && activity.carriedOutBy.map(actor => (
              <p>
                  {actor.actor.mainRepresentation && (
                    <figure>
                      <img
                        alt={actor.actor.label}
                        src={urlFor(actor.actor.mainRepresentation)
                          .width(50)
                          .height(50)
                          .url()} />
                    </figure>
                  )}
                  <span>
                    <a alt={actor.actor.label} href="id/{actor.actor._id}">
                      {actor.actor.label}
                    </a>
                  </span>
              </p>
            ))}
            {activity.tookPlaceAt?.length > 0 && activity.tookPlaceAt.map(place => (
              <>
                <span>
                  📍
                  <a href="/id/{place._id}">{place.label.nor}</a>
                </span>
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
                  <a href="/id/{activity.movedTo._id}">
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
      </OrderedList>
    </Container>
  )
}
