import type { QSsrContext } from '@quasar/app'
import { assignToRoutes } from 'qint'
import type { QintI18n } from 'qint/types'
import type { RouteRecordRaw } from 'vue-router'
import { getCommonRoutes } from '../common'

export function getArRoutes({
  ssrContext,
  i18n,
}: {
  ssrContext?: QSsrContext | null
  i18n: QintI18n
}): RouteRecordRaw[] {
  /**
   * Override `Blog` route for the `ar` language tag to use a specialized
   * page component.
   */
  return assignToRoutes({
    routes: getCommonRoutes({ langTag: 'ar', ssrContext, i18n }),
    assignments: {
      arBlog: {
        component: () =>
          // import('../../../pages/ar/blog/post-lc-list/PostLcList.vue'),
          import('../../../pages/common/blog/post-lc-list/PostLcList.vue'),
      },
    },
  })
}
