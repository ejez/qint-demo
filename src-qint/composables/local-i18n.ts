import { loadVueI18nMsg } from 'qint'
import type { QintImportVueI18nMsgFn } from 'qint/types'
import { getQintConf } from 'src/extensions/qint/conf'
import { watch } from 'vue'
import type { ComposerOptions } from 'vue-i18n'
import { useI18n } from 'vue-i18n'

export function setupLocalI18n({
  importMsgFn,
  composerOptionsAssignments,
}: {
  importMsgFn: QintImportVueI18nMsgFn
  composerOptionsAssignments?: Partial<ComposerOptions>
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
      composerOptionsAssignments
    )
  )

  watch(
    i18n.locale,
    (langTag) => {
      loadVueI18nMsg({
        langTag,
        i18n,
        importMsgFn,
      }).catch((err) => {
        console.error(err)
      })
    },
    { immediate: true }
  )

  return i18n
}
