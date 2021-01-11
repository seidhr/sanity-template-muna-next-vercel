import S from '@sanity/desk-tool/structure-builder'
// import PreviewIFrame from '../../src/components/previewIFrame'
import {FaSitemap, FaRoute} from 'react-icons/fa'
import {MdMenu} from 'react-icons/md'
import {FcHome, FcTemplate} from 'react-icons/fc'
import {RiSideBarFill} from 'react-icons/ri'
import {AiFillAlert} from 'react-icons/ai'

export default S.listItem()
  .title('Sidebygger')
  .icon(FaSitemap)
  .child(
    S.list()
      .title('Sidebygger')
      .items([
        S.documentListItem()
          .title('Frontpage')
          .schemaType('page')
          .icon(FcHome)
          .child(S.document().schemaType('page').documentId('frontpage')),
        S.listItem()
          .title('Sider')
          .icon(FcTemplate)
          .schemaType('page')
          .child(
            S.documentList('page')
              .title('Sider')
              .menuItems(S.documentTypeList('page').getMenuItems())
              .filter('_type == "page" && !(_id match "**frontpage")'),
          ),
        S.listItem()
          .title('Navigasjonsmenyer')
          .icon(MdMenu)
          .schemaType('navigationMenu')
          .child(S.documentTypeList('navigationMenu').title('Navigasjonsmenyer')),
        S.listItem()
          .title('Innholdsfortegnelser')
          .icon(RiSideBarFill)
          .schemaType('toc')
          .child(
            S.documentTypeList('toc')
              .title('Innholdsfortegnelser')
              .child(
                (documentId) => S.document().documentId(documentId).schemaType('toc'),
                // .views([S.view.form(), PreviewIFrame()])
              ),
          ),
        S.listItem()
          .title('Stier')
          .icon(FaRoute)
          .schemaType('route')
          .child(
            S.documentTypeList('route')
              .title('Stier')
              .child(
                (documentId) => S.document().documentId(documentId).schemaType('route'),
                // .views([S.view.form(), PreviewIFrame()])
              ),
          ),
        S.listItem()
          .title('Varsler')
          .icon(AiFillAlert)
          .schemaType('alert')
          .child(
            S.documentList('alert')
              .title('Varsler')
              .menuItems(S.documentTypeList('alert').getMenuItems())
              .filter('_type == "alert"'),
          ),
      ]),
  )
