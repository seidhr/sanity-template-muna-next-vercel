import Head from 'next/head'
import { Container, Box } from '@chakra-ui/react'
import PortableTextBlockQuote from '../PortableTextBlockQuote'
import PortableTextBlock from '../PortableTextBlock'

/*
  NOT WORKING
 */
/* const events = item.events.map(function (event, i) {
  if (event._type == "event") {
    return {
      start_date: {
        year: dayjs(
          event.timespan[0].beginOfTheBegin
            ? event.timespan[0].beginOfTheBegin
            : event.timespan[0].date
        ).format("YYYY"),
        day: dayjs(
          event.timespan[0].beginOfTheBegin
            ? event.timespan[0].beginOfTheBegin
            : event.timespan[0].date
        ).format("DD"),
        month: dayjs(
          event.timespan[0].beginOfTheBegin
            ? event.timespan[0].beginOfTheBegin
            : event.timespan[0].date
        ).format("MM")
      },
      end_date: {
        year: dayjs(
          event.timespan[0].endOfTheEnd
            ? event.timespan[0].endOfTheEnd
            : event.timespan[0].date
        ).format("YYYY"),
        day: dayjs(
          event.timespan[0].endOfTheEnd
            ? event.timespan[0].endOfTheEnd
            : event.timespan[0].date
        ).format("DD"),
        month: dayjs(
          event.timespan[0].endOfTheEnd
            ? event.timespan[0].endOfTheEnd
            : event.timespan[0].date
        ).format("MM")
      },
      media: event.media
        ? Object.assign({}, event.media, {
          caption: event.media.caption,
          credit: event.media.credit
        })
        : "",
      text: Object.assign(
        {},
        {
          headline: event.label.nor,
          text: event.description
            ? blocksToHtml({
              blocks: event.description.nor.filter(({ _key = "" }) => _key)
            })
            : ""
        }
      )
    };
  }
  if (event._type == "timelineSlide") {
    return {
      start_date: {
        year: dayjs(
          event.timespan[0].beginOfTheBegin
            ? event.timespan[0].beginOfTheBegin
            : event.timespan[0].date
        ).format("YYYY"),
        day: dayjs(
          event.timespan[0].beginOfTheBegin
            ? event.timespan[0].beginOfTheBegin
            : event.timespan[0].date
        ).format("DD"),
        month: dayjs(
          event.timespan[0].beginOfTheBegin
            ? event.timespan[0].beginOfTheBegin
            : event.timespan[0].date
        ).format("MM")
      },
      end_date: {
        year: dayjs(
          event.timespan[0].endOfTheEnd
            ? event.timespan[0].endOfTheEnd
            : event.timespan[0].date
        ).format("YYYY"),
        day: dayjs(
          event.timespan[0].endOfTheEnd
            ? event.timespan[0].endOfTheEnd
            : event.timespan[0].date
        ).format("DD"),
        month: dayjs(
          event.timespan[0].endOfTheEnd
            ? event.timespan[0].endOfTheEnd
            : event.timespan[0].date
        ).format("MM")
      },
      media: event.media
        ? Object.assign({}, event.media, {
          url: event.media.url ? event.media.url : null,
          caption: event.media.caption ? event.media.caption : null,
          credit: event.media.credit ? event.media.credit : null
        })
        : "",
      text: Object.assign(
        {},
        {
          headline: event.headline.nor,
          text: event.text.nor
            ? blocksToHtml({
              blocks: event.text.nor.filter(({ _key = "" }) => _key)
            })
            : ""
        }
      )
    };
  }
});
const tl = Object.assign({}, item, {
  title: {
    text: {
      headline: item.headline.nor,
      text: item.text.nor
        ? blocksToHtml({
          blocks: item.text.nor.filter(({ _key = "" }) => _key)
        })
        : ""
    },
    // background: Object.assign({}, title.background, {
    //   color: title.background.color.hex ? title.background.color.hex : '#dddddd'
    // }),
    media: {
      url: item.media[0].url ? item.media[0].url : null,
      caption: item.media[0].caption
        ? blocksToHtml({
          blocks: item.media[0].caption.filter(({ _key = "" }) => _key)
        })
        : "",
      credit: item.media[0].credit
        ? blocksToHtml({
          blocks: item.media[0].credit.filter(({ _key = "" }) => _key)
        })
        : ""
    }
  },
  events
});
 */

export default function TimelineSection(props) {
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
      <div id="timeline-embed" style={{ width: '100%', height: '500px' }}></div>
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
