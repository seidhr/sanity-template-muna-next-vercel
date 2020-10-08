import { timespanAsString } from "../helpers/helpers"

export default {
    type: 'document',
    name: 'alert',
    title: 'Alert',
    fields: [
      {
        name: 'content',
        type: 'simpleBlockContent',
        title: 'Content',
        description: 'Describe what the alert is all about',
      },
      {
        name: 'showAlert',
        type: 'boolean',
        title: 'Should the alert be public?'
      },
      {
        name: 'validFrom',
        type: 'date',
        title: 'Valid from'
      },
      {
        name: 'validTo',
        type: 'date',
        title: 'Valid to'
      }
    ],
    preview: {
      select: {
        content: 'content',
        bb: 'validFrom',
        ee: 'validTo',
        showAlert: 'showAlert'
      },
      prepare (selection) {
        const {content, bb, ee, showAlert} = selection
        const block = content[0]
        const eb = "",
              date = "", 
              be = ""
        const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
        const isPublic = showAlert === true ? "👁️" : "";

        return {
          title: block
          ? block.children
              .filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "",
          subtitle: `${isPublic ? isPublic + ' ': '' }${timespan}`
        }
      }
    }
  }