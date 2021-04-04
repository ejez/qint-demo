<template>
  <q-page class="q-px-lg">
    <div v-if="postLc">
      <h4>{{ postLc.title }}</h4>
      <div class="text-body1" v-html="postLc.body"></div>
    </div>
    <h4 v-else>{{ t('We are sorry, the requested page does not exist.') }}</h4>
  </q-page>
</template>

<script lang="ts">
import {
  createHreflangLink,
  localizeRoutePathSegments,
  useQintMeta
} from 'qint'
import { getQintConf } from 'src/extensions/qint/conf'
import type { Ref } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import data from '../../../../content/db'

export default defineComponent({
  name: 'BlogPostLc',

  setup() {
    const i18n = useI18n()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t, locale: langTag } = i18n
    const route = useRoute()
    const { langTags, langTagsConf } = getQintConf()
    const qintMeta = useQintMeta()

    const postLc: Ref<{ [key: string]: string }> = ref({})

    watch(
      () => route.params,
      () => {
        postLc.value =
          data.blog.postLc.find(
            (p) => p.langTag === langTag.value && p.slug === route.params.slug
          ) || {}
      },
      { immediate: true }
    )

    // hreflangs
    watch(
      postLc,
      () => {
        const localizedPaths: { [langTag: string]: string } = {}

        data.blog.postLc
          .filter((p) => p.postId === postLc.value?.postId)
          .forEach((p) => {
            const langTag = p.langTag
            localizedPaths[langTag] =
              localizeRoutePathSegments({ path: 'blog', langTag, i18n }) +
              `/${encodeURI(p.slug)}`
          })

        // Your logic for picking up `x-default` language tag.
        const xDefaultLangTag =
          langTags[0] in localizedPaths
            ? langTags[0]
            : Object.keys(localizedPaths)[0]

        const link = createHreflangLink({
          localizedPaths,
          xDefaultLangTag,
          langTagsConf,
        })

        if (link) {
          qintMeta.value = { link }
        }
      },
      { immediate: true }
    )

    return { t, postLc }
  },
})
</script>
