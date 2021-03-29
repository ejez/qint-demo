<template>
  <q-page class="row items-center justify-evenly">
    {{ gt('g.Welcome to Qint demo') }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { getQintConf } from '../../../conf'

export default defineComponent({
  name: 'Index',

  setup() {
    const {
      vueI18nConf: { composerOptions },
    } = getQintConf()

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n(
      Object.assign(composerOptions, {
        useScope: 'local' as const,
      })
    )

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t: gt } = useI18n()

    return { t, gt }
  },
})
</script>
