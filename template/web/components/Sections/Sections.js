import RenderSections from '../RenderSection'

export default function Sections({sections}) {
  return (
    <main>
      {sections && <RenderSections sections={sections} />}
    </main>
  )
}
