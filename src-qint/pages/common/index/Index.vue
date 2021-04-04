<template>
  <q-page class="q-px-lg">
    <h4 v-html="postLc.title"></h4>
    <div class="text-body1" v-html="postLc.body"></div>
  </q-page>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface IndexPostLc {
  title: string
  body: string
}

export default defineComponent({
  name: 'Index',

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { locale } = useI18n()

    const postLc: Ref<IndexPostLc> = ref({ title: '', body: '' })

    watch(
      locale,
      (langTag) => {
        import(`../../../content/${langTag}/index.ts`)
          .then(({ default: result }) => {
            postLc.value = result
          })
          .catch((err) => {
            console.error(err)
          })
      },
      { immediate: true }
    )

    return { postLc }
  },
})
</script>
