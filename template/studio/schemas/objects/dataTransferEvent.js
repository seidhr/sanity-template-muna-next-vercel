export default {
  title: 'Data transfer event',
  name: 'dataTransferEvent',
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
    }
  ],
}
