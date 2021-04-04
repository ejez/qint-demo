import type { QSsrContext } from '@quasar/app'
import {
    createHreflangRouteMeta,
    loadVueI18nMsg,
    localizeRoutePathSegments,
    useQintMeta
} from 'qint'
import type { QintI18n } from 'qint/types'
import { getQintConf } from 'src/extensions/qint/conf'
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
import { RouteRecordRaw } from 'vue-router'

export function getCommonRoutes({
  langTag,
  ssrContext,
  i18n,
}: {
  langTag: string
  ssrContext?: QSsrContext | null
  i18n: QintI18n
}): RouteRecordRaw[] {
  const { langTags, langTagsConf } = getQintConf()
  const qintMeta = useQintMeta()

  return [
    {
      path: '',
      name: `${langTag}Index`,
      component: () => import('../../../pages/common/index/Index.vue'),
      beforeEnter: [
        () => {
          qintMeta.value = createHreflangRouteMeta({
            path: '',
            langTags,
            langTagsConf,
            ssrContext,
            i18n,
          })
        },
      ],
    },

    {
      path: localizeRoutePathSegments({ path: 'blog', langTag, i18n }),
      name: `${langTag}Blog`,
      component: () =>
        import('../../../pages/common/blog/post-lc-list/PostLcList.vue'),
      beforeEnter: [
        () => {
          qintMeta.value = createHreflangRouteMeta({
            path: 'blog',
            langTags,
            langTagsConf,
            ssrContext,
            i18n,
          })
        },

        async () => {
          await loadVueI18nMsg({
            langTag,
            i18n,
            importMsgFn: async (langTag) =>
              (<{ default: LocaleMessageDictionary<VueMessageType> }>(
                await import(`../../../i18n/route-msgs/common/blog/${langTag}`)
              )).default,
          })
        },
      ],
    },

    {
      path:
        localizeRoutePathSegments({ path: 'blog', langTag, i18n }) + '/:slug',
      name: `${langTag}BlogPostLc`,
      component: () => import('../../../pages/common/blog/post-lc/PostLc.vue'),
    },
  ]
}
