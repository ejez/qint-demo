import type { QSsrContext } from '@quasar/app'
import { assignToRoute, setAppLangTag } from 'qint'
import type { QintI18n } from 'qint/types'
import type { RouteRecordRaw } from 'vue-router'
import { getQintConf } from '../../conf'
import { getArRoutes } from './ar'
import { getCommonRoutes } from './common'

export function getLangTagRoutes({
  ssrContext,
  i18n,
}: {
  ssrContext?: QSsrContext | null
  i18n: QintI18n
}) {
  const {
    langTags,
    langTagsConf,
    cookieConf: { useCookie = false, langTagCookieOptions } = {},
    quasarLangConf: { importQLang },
    vueI18nConf: { importGeneralMsg },
  } = getQintConf()

  const langTagRoutes: RouteRecordRaw[] = []

  langTags.forEach((langTag) => {
    langTagRoutes.push({
      path: `/${langTag}`,
      name: langTag.replace(/-/g, '') + 'Layout',
      component: () => import('./MainLayout.vue'),
      children: getCommonRoutes({ langTag, i18n }),
    })
  })

  assignToRoute({
    routes: langTagRoutes,
    targetName: 'arLayout',
    source: {
      children: getArRoutes({ i18n }),
    },
  })

  langTagRoutes.forEach((route) => {
    route.beforeEnter = [
      async () => {
        const langTag = route.path.substring(1)
        const langTagConf = langTagsConf?.[langTag]
        await setAppLangTag({
          langTag,
          langTagConf,
          i18n,
          importVueI18nGeneralMsg: importGeneralMsg,
          importQLang,
          useCookie,
          langTagCookieOptions,
          ssrContext,
        })
      },
    ]
  })

  return langTagRoutes
}
