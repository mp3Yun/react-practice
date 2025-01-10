import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// 初始化 i18next
i18n
  .use(LanguageDetector) // 偵測語言
  .use(HttpApi) // 使用後端插件加載翻譯文件
  .use(initReactI18next) // React 與 i18next 結合
  .init({
    lng: 'en', // 預設語言
    supportedLngs: ['en', 'zh-TW', 'zh-CN', 'ja'], // 支援的語言列表
    // 分割檔案與載入
    // // files to load
    // ns: ['app', 'common'],
    // // default namespace (needs no prefix on calling t)
    // defaultNS: 'app',
    // // fallback, can be a string or an array of namespaces
    // fallbackNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 翻譯檔案路徑
    },
    detection: {
      order: ['navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    fallbackLng: (code) => {
      if (!code || code === 'zh') return ['zh-TW', 'zh-CN']
      const fallbacks = [code]
      return fallbacks
    }, // 回退語言
    debug: false, // 開啟調試模式
    interpolation: {
      escapeValue: false, // 防止 HTML 轉義
    },
  })

export default i18n
