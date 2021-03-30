import type { QintImportVueI18nMsgFn } from 'qint/types'
import type { ComposerOptions } from 'vue-i18n'
import { loadVueI18nMsg } from 'qint'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getQintConf } from '../../conf'

export function setupLocalI18n({
  importMsgFn,
  composerOverrideOptions,
}: {
  importMsgFn: QintImportVueI18nMsgFn
  composerOverrideOptions?: ComposerOptions
}) {
  const {
    vueI18nConf: { composerOptions },
  } = getQintConf()

  const i18n = useI18n(
    Object.assign(
      composerOptions,
      {
        useScope: 'local' as const,
      },
      composerOverrideOptions
    )
  )

  watch(
    i18n.locale,
    (langTag) => {
      loadVueI18nMsg({
        langTag,
        i18n,
        importMsgFn,
      }).catch((err) => console.error(err))
    },
    { immediate: true }
  )

  return i18n
}
