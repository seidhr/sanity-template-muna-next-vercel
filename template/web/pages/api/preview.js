import { getPreviewMadeObjectByID } from '../../lib/api'

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.id
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `id` exists
  const item = await getPreviewMadeObjectByID(req.query.id)

  // If the id doesn't exist prevent preview mode from being enabled
  if (!item) {
    return res.status(401).json({ message: 'Invalid id' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched item
  // We don't redirect to req.query.id as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/items/${item.id}` })
  res.end()
}
