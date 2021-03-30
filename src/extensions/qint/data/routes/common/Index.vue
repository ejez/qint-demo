<template>
  <q-page class="row items-center justify-evenly">
    {{ gt('g.Welcome to Qint demo') }}
    {{ t('from Index') }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
import { useI18n } from 'vue-i18n'
import { setupLocalI18n } from '../../composables/local-i18n'

export default defineComponent({
  name: 'Index',

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = setupLocalI18n({
      importMsgFn: async (langTag) =>
        (<{ default: LocaleMessageDictionary<VueMessageType> }>(
          await import(`./vue-i18n-index-msgs/${langTag}`)
        )).default,
    })

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t: gt } = useI18n()

    return { t, gt }
  },
})
</script>
