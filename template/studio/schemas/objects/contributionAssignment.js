export default {
  name: 'contributionAssignment',
  title: 'Bidragspåstand',
  titleEN: 'Contribution Assignment',
  type: 'object',
  fields: [
    {
      name: 'assignedActor',
      title: 'Aktør',
      titleEN: 'Actor',
      type: 'reference',
      to: [{type: 'actor', title: 'Actor'}],
    },
    {
      name: 'assignedRole',
      title: 'Rolle',
      titleEN: 'Role',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'role'}],
        },
      ],
    },
    {
      name: 'usedName',
      title: 'Navn',
      titleEN: 'Name',
      description: 'Brukes dersom objektet er signert under annet navn enn aktørens fulle navn.',
      descriptionEN: 'Used if the object is signed with another than the preferred name of the actor.',
      type: 'name'
    },
  ],
  preview: {
    select: {
      actor: 'assignedActor.label',
      name:  'usedName.content',
      role: 'role.0.label.nor',
    },
    prepare(selection) {
      const {actor, name, role} = selection
      return {
        title: actor || name,
        subtitle: `${role ? role : ''}`,
      }
    },
  },
}
