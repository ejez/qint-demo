<template>
  <q-page class="row items-center justify-evenly">
    ArPostLcList
    {{ t('r.from blog list route') }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ArPostLcList',

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n()

    return { t }
  },
})
</script>
