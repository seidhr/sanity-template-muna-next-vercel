import React from 'react'
import Button from 'part:@sanity/components/buttons/default'
import DefaultBadge from 'part:@sanity/components/badges/default'
import {ResultCard} from '@appbaseio/reactivesearch'
// import DateBadge from '../../components/DateBadge'
import {chooseItem} from '../apis'

const Card = ({item}) => {
  return (
    <ResultCard key={item._id}>
      {item.hasThumbnail && <ResultCard.Image src={item.hasThumbnail} />}
      <ResultCard.Title
        dangerouslySetInnerHTML={{
          __html: item.label || item.preferredLabel || item.title || item.identifier,
        }}
      />
      <ResultCard.Description>
        <DefaultBadge style={{marginBottom: '0.5em'}}>{item.type}</DefaultBadge>
        <br />
        {item.hasThumbnail && (
          <Button inverted onClick={() => chooseItem(item.uri)}>
            Import
          </Button>
        )}
        <a target="blank" href={item.uri} style={{marginLeft: '0.5em'}}>
          View at Marcus
        </a>
      </ResultCard.Description>
    </ResultCard>
  )
}

export default Card
