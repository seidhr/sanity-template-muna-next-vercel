export default {
  name: 'dataTransferEvent',
  title: 'Dataoverføringshendelse',
  titleEN: 'Data transfer event',
  type: 'object',
  fields: [
    {
      name: 'transferred',
      title: 'Transferred',
      type: 'digitalObject',
    },
    {
      name: 'hasSender',
      title: 'Has sender',
      type: 'digitalDevice',
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    },
  ],
}
