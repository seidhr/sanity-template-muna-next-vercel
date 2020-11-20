import {Heading, Link, Tag} from '@chakra-ui/core'

export default function CurrentOwner({owners}) {
  if (!owners) {
    return null
  }

  return (
    <>
      <Heading fontSize="md">Eier</Heading>
      {owners.map((owner) => (
        <Tag key={owner._id}>
          <Link key={owner._id} href={`/id/${owner._id}`}>
            {owner.label}
          </Link>
        </Tag>
      ))}
    </>
  )
}
