import S from '@sanity/desk-tool/structure-builder'
// import PreviewIFrame from '../../src/components/previewIFrame'
import { FaSitemap, FaRoute } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { FcHome, FcTemplate } from 'react-icons/fc'
import { RiSideBarFill } from 'react-icons/ri'
import { AiFillAlert } from 'react-icons/ai'

export default S.listItem()
  .title('Page Builder')
  .icon(FaSitemap)
  .child(
    S.list()
      .title('Landing Pages')
      .items([
        S.documentListItem()
          .title('Frontpage')
          .schemaType('page')
          .icon(FcHome)
          .child(S.document().schemaType('page').documentId('frontpage')),
        S.listItem()
          .title('Pages')
          .icon(FcTemplate)
          .schemaType('page')
          .child(
            S.documentList('page')
              .title('Pages')
              .menuItems(S.documentTypeList('page').getMenuItems())
              .filter('_type == "page" && _id != "frontpage"'),
          ),
        S.listItem()
          .title('Navigation Menus')
          .icon(MdMenu)
          .schemaType('navigationMenu')
          .child(S.documentTypeList('navigationMenu').title('Navigation Menus')),
        S.listItem()
          .title('Table of contents')
          .icon(RiSideBarFill)
          .schemaType('toc')
          .child(
            S.documentTypeList('toc')
              .title('ToCs')
              .child(
                (documentId) => S.document().documentId(documentId).schemaType('toc'),
                // .views([S.view.form(), PreviewIFrame()])
              ),
          ),
        S.listItem()
          .title('Routes')
          .icon(FaRoute)
          .schemaType('route')
          .child(
            S.documentTypeList('route')
              .title('Routes')
              .child(
                (documentId) => S.document().documentId(documentId).schemaType('route'),
                // .views([S.view.form(), PreviewIFrame()])
              ),
          ),
        S.listItem()
          .title('Alerts')
          .icon(AiFillAlert)
          .schemaType('alert')
          .child(
            S.documentList('alert')
              .title('Alerts')
              .menuItems(S.documentTypeList('alert').getMenuItems())
              .filter('_type == "alert"'),
          ),
      ]),
  )
