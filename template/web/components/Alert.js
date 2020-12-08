import {Flex} from '@chakra-ui/react'
import PortableTextBlock from './PortableTextBlock'

export default function Alert({alert, preview}) {
  if (!alert) {
    return null
  }

  return (
    <Flex>
      <div className="py-2 text-center text-sm">
        {preview ? (
          <>{alert?.item?.content}</>
        ) : (
          <>
            <PortableTextBlock blocks={alert?.item?.content} />
          </>
        )}
      </div>
    </Flex>
  )
}
