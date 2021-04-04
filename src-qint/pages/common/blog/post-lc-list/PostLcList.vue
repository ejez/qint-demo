<template>
  <q-page class="q-px-lg">
    <h5>{{ t('r.Welcome to Qint Blog') }}</h5>
    <div v-if="postLcList" class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="postLc in postLcList"
        :key="postLc.id"
        style="max-width: 300px"
      >
        <q-card-section>
          <q-btn
            flat
            no-caps
            class="text-h6"
            :to="{
              name: `${langTag}BlogPostLc`,
              params: { slug: postLc.slug },
            }"
          >
            {{ postLc.title }}
          </q-btn>
        </q-card-section>

        <q-card-section class="q-py-none">
          <div v-html="postLc.summary" />
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn
            flat
            :to="{
              name: `${langTag}BlogPostLc`,
              params: { slug: postLc.slug },
            }"
            >{{ t('r.Read more') }}</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import data from '../../../../content/db'

export default defineComponent({
  name: 'PostLcList',

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t, locale: langTag } = useI18n()

    const postLcList = ref()

    watch(
      langTag,
      (langTag) => {
        postLcList.value = data.blog.postLc.filter(
          (postLc) => postLc.langTag === langTag
        )
      },
      { immediate: true }
    )

    return { t, langTag, postLcList }
  },
})
</script>
