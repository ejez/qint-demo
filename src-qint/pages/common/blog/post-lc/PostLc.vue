<template>
  <q-page class="row items-center justify-evenly"> </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PostLc',

  setup() {
    const route = useRoute()
    console.log(route.params)
  },
})
</script>
