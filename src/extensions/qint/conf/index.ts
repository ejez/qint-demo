import type { QintConf } from 'qint/types'
import type { QuasarLanguage } from 'quasar'
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
// import { BootFileParams } from '@quasar/app'

export function getQintConf(/* { app, router, ... }: Partial<BootFileParams<unknown>> */) {
  const qintConf: QintConf = {
    langTags: ['ar', 'en'],

    langTagsConf: {
      ar: { nativeName: 'العربية' },
      en: {
        nativeName: 'English',
        quasarLang: {
          isoName: 'en-US',
        },
      },
    },

    quasarLangConf: {
      // This function is included in the configuration because it contains a
      // webpack magic comment that is user specific, and needs to be updated
      // according to the Quasar language packs used in the app.
      importQLang: async (isoName, custom) => {
        if (custom) {
          return (
            (<{ default: QuasarLanguage }>(
              // Modify if the custom language packs are in a different location.
              await import(`./q-lang-packs/${isoName}`)
            )).default
          )
        } else {
          return (<{ default: QuasarLanguage }>await import(
            // Update this webpack magic comment according to your needs.
            /* webpackInclude: /(ar|en-US)\.js$/ */
            `quasar/lang/${isoName}`
          )).default
        }
      },
    },

    vueI18nConf: {
      legacy: false,

      importGeneralMsg: async (langTag) =>
        (<{ default: LocaleMessageDictionary<VueMessageType> }>(
          // Modify if the messages are in a different location.
          await import(`../data/vue-i18n-general-msgs/${langTag}`)
        )).default,
    },

    cookieConf: {
      useCookie: true,

      langTagCookieOptions: {
        expires: 365,
        path: '/',
        sameSite: 'Lax',
      },
    },
  }

  qintConf.vueI18nConf.composerOptions = {
    locale: qintConf.langTags[0],
    fallbackLocale: qintConf.langTags[0],
    missingWarn: !!process.env.DEV,
    fallbackWarn: !!process.env.DEV,
  }

  return qintConf
}
