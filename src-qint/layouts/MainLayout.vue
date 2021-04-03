<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          @click="togglePrimaryDrawer"
        />

        <q-btn
          :to="'/'"
          v-if="$q.screen.gt.xs"
          flat
          no-caps
          no-wrap
          class="q-ml-xs"
        >
          <q-icon :name="laLanguageSolid" color="green" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            {{ t('g.Qint') }}
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="grey-8"
            :to="pt('blog')"
          >
            <q-icon :name="laReadme" color="grey-8" size="28px" />
            <q-tooltip>{{ t('g.blog').c() }}</q-tooltip>
          </q-btn>

          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="grey-8"
            type="a"
            href="https://github.com/ejez/qint"
            target="_blank"
          >
            <q-icon :name="laCodeSolid" color="grey-8" size="28px" />
            <q-tooltip>{{ t('g.source code').c() }}</q-tooltip>
          </q-btn>

          <q-space />
          <q-space />
        </div>

        <qint-lang-tag-selector
          :lang-tags="langTags"
          :lang-tags-conf="langTagsConf"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="primaryDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ t('g.' + link.text).c() }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {
  laCodeSolid,
  laLanguageSolid,
  laReadme
} from '@quasar/extras/line-awesome'
import { pt } from 'qint'
import QintLangTagSelector from 'qint/components/QintLangTagSelector.vue'
import { getQintConf } from 'src/extensions/qint/conf'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MainLayout',
  components: {
    QintLangTagSelector,
  },

  setup() {
    const { langTags, langTagsConf } = getQintConf()

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n()

    const primaryDrawerOpen = ref(false)

    function togglePrimaryDrawer() {
      primaryDrawerOpen.value = !primaryDrawerOpen.value
    }

    return {
      langTags,
      langTagsConf,

      t,
      pt,

      laLanguageSolid,
      laReadme,
      laCodeSolid,

      primaryDrawerOpen,
      togglePrimaryDrawer,

      links1: [
        { icon: 'home', text: 'home' },
        { icon: laReadme, text: 'blog' },
      ],
    }
  },
})
</script>
