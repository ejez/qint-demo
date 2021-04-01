<template>
  <router-view />
</template>
<script lang="ts">
import { getAppMeta } from 'qint'
import { useMeta } from 'quasar'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',

  setup() {
    const route = useRoute()
    useMeta(() => getAppMeta(route))
  },
})
</script>
