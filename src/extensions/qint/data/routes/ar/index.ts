import { localizePathSegments, overrideRoutes } from 'qint'
import type { QintI18n } from 'qint/types'
import type { RouteRecordRaw } from 'vue-router'
import { getCommonRoutes } from '../common'

export function getArRoutes({ i18n }: { i18n: QintI18n }): RouteRecordRaw[] {
  /**
   * Override `Blog` route for the `ar` language tag to use a specialized
   * page component.
   */
  return overrideRoutes({
    routes: getCommonRoutes({ langTag: 'ar', i18n }),
    newRoutes: {
      arBlog: {
        path: localizePathSegments({
          path: 'blog',
          langTag: 'ar',
          i18n,
        }),
        name: 'arBlog',
        component: () => import('./blog/PostLcList.vue'),
      },
    },
  })
}
