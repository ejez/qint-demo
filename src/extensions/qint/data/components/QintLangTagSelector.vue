<template>
  <q-select
    v-model="langTag"
    :options="langTagOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 100px"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getQintConf } from '../../conf'

export default defineComponent({
  name: 'QintLangTagSelector',

  setup() {
    const { langTags, langTagsConf } = getQintConf()
    const langTagOptions = langTags.map((langTag) => ({
      label: langTagsConf?.[langTag]?.nativeName || langTag,
      value: langTag,
    }))

    const router = useRouter()

    const { locale } = useI18n()

    const langTag = ref(locale.value)

    watch(langTag, async (langTag) => {
      await router.push(`/${langTag}`)
    })

    return {
      langTag,
      langTagOptions,
    }
  },
})
</script>
