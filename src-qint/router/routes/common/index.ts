import { loadVueI18nMsg, localizePathSegments } from 'qint'
import type { QintI18n } from 'qint/types'
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
import { RouteRecordRaw } from 'vue-router'

export function getCommonRoutes({
  langTag,
  i18n,
}: {
  langTag: string
  i18n: QintI18n
}): RouteRecordRaw[] {
  return [
    {
      path: '',
      name: `${langTag}Index`,
      component: () => import('../../../pages/common/index/Index.vue'),
    },

    {
      path: localizePathSegments({ path: 'blog', langTag, i18n }),
      name: `${langTag}Blog`,
      component: () =>
        import('../../../pages/common/blog/post-lc-list/PostLcList.vue'),
      beforeEnter: [
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
      path: localizePathSegments({ path: 'blog', langTag, i18n }) + '/:slug',
      name: `${langTag}BlogPostLc`,
      component: () => import('../../../pages/common/blog/post-lc/PostLc.vue'),
    },
  ]
}
