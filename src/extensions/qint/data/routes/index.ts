import type { QSsrContext } from '@quasar/app'
import { getLangTag } from 'qint'
import type { QintI18n } from 'qint/types'
import type { RouteRecordRaw } from 'vue-router'
import { getQintConf } from '../../conf'
import { getArRoutes } from './ar'
import { getCommonRoutes } from './common'
import { pathSegmentMsgs } from './vue-i18n-path-segment-msgs'

export function getAppRoutes({
  ssrContext,
  i18n,
}: {
  ssrContext?: QSsrContext | null
  i18n: QintI18n
}): RouteRecordRaw[] {
  const { langTags, cookieConf: { useCookie = false } = {} } = getQintConf()

  langTags.forEach((langTag) =>
    i18n.global.mergeLocaleMessage(langTag, pathSegmentMsgs[langTag])
  )

  return [
    {
      path: '/',
      name: 'root',
      // TODO: redirect url should be updated when the cookie changes.
      redirect: () => `/${getLangTag({ langTags, useCookie, ssrContext })}`,
    },

    {
      path: '/ar',
      name: 'arLayout',
      component: () => import('./MainLayout.vue'),
      children: getArRoutes({ i18n }),
    },

    {
      path: '/en',
      name: 'enLayout',
      component: () => import('./MainLayout.vue'),
      children: getCommonRoutes({ langTag: 'en', i18n }),
    },

    {
      path: '/:catchAll(.*)*',
      name: 'CatchAll',
      component: () => import('./root/Error404.vue'),
    },
  ]
}
