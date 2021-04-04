<template>
  <router-view />
</template>
<script lang="ts">
import { useQintMeta } from 'qint'
import { useMeta } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  setup() {
    const qintMeta = useQintMeta()
    useMeta(() => qintMeta.value)
  },
})
</script>
