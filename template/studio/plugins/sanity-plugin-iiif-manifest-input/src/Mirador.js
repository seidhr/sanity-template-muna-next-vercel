import React, {Component} from 'react'
import mirador from 'mirador'

class Mirador extends Component {
  componentDidMount() {
    const {manifest} = this.props

    const config = {
      id: 'manifest',
      windows: {
        manifestId: manifest.value,
      },
      window: {
        allowClose: false,
        allowWindowSideBar: false,
      },
    }

    mirador.viewer(config)
  }

  render() {
    return <div id={config.id} />
  }
}

export default Mirador
