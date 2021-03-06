import type { QSsrContext } from '@quasar/app'
import { getLangTag } from 'qint'
import type { QintI18n } from 'qint/types'
import { getQintConf } from 'src/extensions/qint/conf'
import type { RouteRecordRaw } from 'vue-router'
import { getLangTagRoutes } from './lang-tag-routes'
import { pathSegmentMsgs } from '../../i18n/path-msgs'

export function getAppRoutes({
  ssrContext,
  i18n,
}: {
  ssrContext?: QSsrContext | null
  i18n: QintI18n
}): RouteRecordRaw[] {
  const { langTags, cookieConf: { useCookie = false } = {} } = getQintConf()

  langTags.forEach((langTag) => {
    if (pathSegmentMsgs[langTag]) {
      i18n.mergeLocaleMessage(langTag, pathSegmentMsgs[langTag])
    }
  })

  const langTagRoutes = getLangTagRoutes({ ssrContext, i18n })

  return [
    {
      path: '/',
      name: 'root',
      redirect: () => `/${getLangTag({ langTags, useCookie, ssrContext })}`,
    },

    ...langTagRoutes,

    {
      path: '/:catchAll(.*)*',
      name: 'catchAll',
      component: () => import('./root/Error404.vue'),
    },
  ]
}
