<template>
  <q-page class="row items-center justify-evenly">
    {{ t('g.Welcome to Qint demo') }}
    {{ lt('from Index') }}
  </q-page>
</template>

<script lang="ts">
import { setupLocalI18n } from 'qint/composables/local-i18n'
import { getQintConf } from 'src/extensions/qint/conf'
import { defineComponent } from 'vue'
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Index',

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t: lt } = setupLocalI18n({
      composerOptions: getQintConf().vueI18nConf.composerOptions,

      importMsgFn: async (langTag) =>
        (<{ default: LocaleMessageDictionary<VueMessageType> }>(
          await import(`./i18n-msgs/${langTag}`)
        )).default,
    })

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n()

    return { lt, t }
  },
})
</script>
