import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import PortableTextBlockQuote from '../PortableTextBlockQuote'
import PortableTextBlock from '../PortableTextBlock'

/*
  NOT WORKING
 */
export default function Quote(props) {
  return (
    <Container maxW="4xl" marginTop="10">
      <Head>
        <link title="timeline-styles" rel="stylesheet" href="/static/timeline3/css/timeline.css" />
        <script type="text/javascript" src="/static/timeline3/js/timeline-min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `var additionalOptions = {
              script_path: '/static/timeline3/js',
            }
            
            timeline = new TL.Timeline('timeline-embed',
            'https://docs.google.com/spreadsheets/d/1cWqQBZCkX9GpzFtxCWHoqFXCHg-ylTVUWlnrdYMzKUI/pubhtml',
            additionalOptions);`,
          }}
        />
      </Head>
      <div id="timeline-embed" style={{width: '100%', height: '500px'}}></div>
      <Box>
        <Box size="md">
          <PortableTextBlockQuote fontSize="2xl" blocks={props.content} />
        </Box>
      </Box>
      {props?.credit && (
        <Box size="xl">
          <PortableTextBlock blocks={props.credit} />
        </Box>
      )}
    </Container>
  )
}
