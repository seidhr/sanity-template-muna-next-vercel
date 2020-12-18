import {hasMember} from '../props'

export default {
  name: 'set',
  title: 'Sett',
  titleEN: 'Set',
  description:
    'Brukes til å samle objekter i et sett, der settet er knyttet til for eksempel en samling.',
  type: 'object',
  fields: [hasMember],
}
