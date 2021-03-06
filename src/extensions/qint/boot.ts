import { getLangTag, setAppLangTag } from 'qint'
import { boot } from 'quasar/wrappers'
import { getAppRoutes } from 'src/../src-qint/router/routes'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { getQintConf } from './conf'
import { augmentGlobals } from './helpers'

export let i18nInstance: I18n<unknown, unknown, unknown, boolean>

export default boot(async ({ app, router, ssrContext, urlPath }) => {
  const {
    langTags,
    cookieConf: { useCookie = false, langTagCookieOptions } = {},
    langTagsConf,
    quasarLangConf: { importQLang },
    vueI18nConf: { legacy, vueI18nOptions, composerOptions, importGeneralMsg },
  } = getQintConf()

  i18nInstance = createI18n(
    legacy ? vueI18nOptions : Object.assign(composerOptions, { legacy: false })
  )
  app.use(i18nInstance)
  const i18n = i18nInstance.global

  // Add the app routes. (The routes might have localized paths.)
  getAppRoutes({ ssrContext, i18n }).forEach((route) => {
    router.addRoute(route)
  })

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
    importVueI18nMsgFn: importGeneralMsg,
    importQLang,
    useCookie,
    langTagCookieOptions,
    ssrContext,
  })
})

augmentGlobals()
