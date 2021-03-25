import { getLangTag, loadVueI18nMsg, setQLang } from 'qint'
import type { QintI18n } from 'qint/types'
import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { getQintConf } from './conf'
import { getAppRoutes } from './data/routes'

export let i18n: QintI18n

export default boot(async ({ app, router, ssrContext, urlPath }) => {
  const {
    langTags,
    cookieConf: { useCookie = false } = {},
    langTagsConf,
    quasarLangConf: { importQLang },
    vueI18nConf: { legacy, vueI18nOptions, composerOptions, importGeneralMsg },
  } = getQintConf()

  // Get the language tag to start the app with.
  const langTag = getLangTag({
    langTags,
    useCookie,
    urlPath,
    ssrContext,
  })
  const langTagConf = langTagsConf?.[langTag]

  // Create Vue I18n instance.
  const i18n = createI18n(
    legacy ? vueI18nOptions : Object.assign(composerOptions, { legacy: false })
  )
  app.use(i18n)
  i18n.global.locale = langTag

  // Add the app routes. (The routes might have localized paths.)
  getAppRoutes({ i18n }).forEach((route) => router.addRoute(route))

  const loadVueI18nGeneralMsgPromise = loadVueI18nMsg({
    langTag,
    i18n,
    importMsgFn: importGeneralMsg,
  })

  // Load and set the language pack corresponding to `langTag`.
  const setQLangPromise = setQLang({
    langTag,
    importQLang,
    langTagConf,
    ssrContext,
  })

  // Await promises.
  await setQLangPromise
  await loadVueI18nGeneralMsgPromise
})
