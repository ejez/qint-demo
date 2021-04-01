import type { QSsrContext } from '@quasar/app'
import { assignToRoute, setAppLangTag } from 'qint'
import type { QintI18n } from 'qint/types'
import { getQintConf } from 'src/extensions/qint/conf'
import type { RouteRecordRaw } from 'vue-router'
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
      component: () => import('../../layouts/MainLayout.vue'),
      children: getCommonRoutes({ langTag, ssrContext, i18n }),
      beforeEnter: [
        async () => {
          await setAppLangTag({
            langTag,
            langTagConf: langTagsConf?.[langTag],
            i18n,
            importVueI18nMsgFn: importGeneralMsg,
            importQLang,
            useCookie,
            langTagCookieOptions,
            ssrContext,
          })
        },
      ],
    })
  })

  assignToRoute({
    routes: langTagRoutes,
    targetName: 'arLayout',
    source: {
      children: getArRoutes({ ssrContext, i18n }),
    },
  })

  return langTagRoutes
}
