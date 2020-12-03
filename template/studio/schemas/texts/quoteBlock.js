import React from 'react'

const highlightIcon = () => <span style={{fontWeight: 'bold'}}>H</span>
const highlightRender = (props) => <span style={{backgroundColor: 'yellow'}}>{props.children}</span>

/* 
  Used in Quote section
*/
export default {
  name: 'quoteBlock',
  type: 'array',
  title: 'Quote',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [
        {title: 'Numbered', value: 'number'},
        {title: 'Bulleted', value: 'bullet'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {
            title: 'Highlight',
            value: 'highlight',
            blockEditor: {
              icon: highlightIcon,
              render: highlightRender,
            },
          },
        ],
      },
    },
  ],
}
