import { getLangTag, setAppLangTag } from 'qint'
import type { QintI18n } from 'qint/types'
import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { getQintConf } from './conf'
import { getAppRoutes } from './data/routes'

export let i18n: QintI18n

export default boot(async ({ app, router, ssrContext, urlPath }) => {
  const {
    langTags,
    cookieConf: { useCookie = false, langTagCookieOptions } = {},
    langTagsConf,
    quasarLangConf: { importQLang },
    vueI18nConf: { legacy, vueI18nOptions, composerOptions, importGeneralMsg },
  } = getQintConf()

  // Create Vue I18n instance.
  const i18n = createI18n(
    legacy ? vueI18nOptions : Object.assign(composerOptions, { legacy: false })
  )
  app.use(i18n)

  // Add the app routes. (The routes might have localized paths.)
  getAppRoutes({ ssrContext, i18n }).forEach((route) => router.addRoute(route))

  // Get the language tag to start the app with.
  const langTag = getLangTag({
    langTags,
    useCookie,
    urlPath,
    ssrContext,
  })
  const langTagConf = langTagsConf?.[langTag]

  await setAppLangTag({
    langTag,
    langTagConf,
    i18n,
    importVueI18nGeneralMsg: importGeneralMsg,
    importQLang,
    useCookie,
    langTagCookieOptions,
    ssrContext,
  })
})
