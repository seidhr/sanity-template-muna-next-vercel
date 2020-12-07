import React from 'react'
import InstagramEmbed from 'react-instagram-embed'

const token = process.env.SANITY_STUDIO_INSTAGRAM_TOKEN

const InstagramPreview = ({value}) => {
  const {url} = value
  if (!url) {
    return <p>Missing URL for Instagram post</p>
  }

  return (
    <InstagramEmbed
      clientAccessToken={token}
      url={url}
      maxWidth={480}
      hideCaption={true}
      containerTagName="div"
      injectScript
    />
  )
}

export default InstagramPreview
