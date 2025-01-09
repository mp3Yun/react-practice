// src/i18n.ts
// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'

// i18n
//   .use(initReactI18next) // 使用 react-i18next
//   .init({
//     resources: {
//       en: {
//         translation: {
//           plzChooseLanguage: 'Please select language',
//           settingLanguage: 'Setting Language',
//           english: 'English',
//           traditionalChinese: 'Traditional Chinese',
//           simplifiedChinese: 'Simplified Chinese',
//           japanese: 'Japanese',
//           welcome: 'Welcome',
//           description: 'This is a description in English.',
//         },
//       },
//       'zh-TW': {
//         translation: {
//           plzChooseLanguage: '請選擇語系',
//           settingLanguage: '設定語系',
//           english: '英語',
//           traditionalChinese: '繁體中文',
//           simplifiedChinese: '簡體中文',
//           japanese: '日語',
//           welcome: '歡迎',
//           description: '這是中文描述。',
//         },
//       },
//       'zh-CN': {
//         translation: {
//           plzChooseLanguage: '请选择语系',
//           settingLanguage: '设定语系',
//           english: '英语',
//           traditionalChinese: '繁体中文',
//           simplifiedChinese: '简体中文',
//           japanese: '日语',
//           welcome: '欢迎',
//           description: '这是中文描述。',
//         },
//       },
//       ja: {
//         translation: {
//           plzChooseLanguage: '言語を選択してください',
//           settingLanguage: '言語を設定する',
//           english: '英語',
//           traditionalChinese: '繁体字中国語',
//           simplifiedChinese: '中国語（簡体字）',
//           japanese: '日本語',
//           welcome: 'ようこそ',
//           description: 'これは日本語の説明です。',
//         },
//       },
//     },
//     lng: 'zh-TW', // 默認語言為繁中
//     fallbackLng: 'zh-TW', // 無法找到對應語言時使用繁中
//     interpolation: {
//       escapeValue: false, // React 已經處理了 XSS 問題
//     },
//   })

// export default i18n

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// 動態導入翻譯檔案
const loadNamespaces = async (lng: string) => {
  console.log('Loading translations for language:', lng) // 檢查是否有印出語言
  const translations: Record<string, any> = {}

  // 各功能模組 i18n 檔案
  const pageNames = ['settings'] // 你可以擴充這個列表，包含你所有頁面的名稱

  // 使用 Promise.all 並動態導入所有頁面的翻譯文件
  await Promise.all(
    pageNames.map(async (page) => {
      try {
        // 使用 import() 動態加載 JSON 檔案
        const pageTranslations = await import(
          `./assets/i18n/${lng}/${page}.json`
        )
        console.error('99-pageTranslations', pageTranslations)
        translations[page] = pageTranslations.default // 注意，Vite 會返回一個默認導出的模塊
      } catch (error) {
        console.error(`Error loading ${lng}/${page}:`, error)
      }
    })
  )
  console.error('99-translations', translations)
  return translations
}

i18n
  .use(backend) // 可選，若需要從伺服器載入翻譯
  .use(LanguageDetector) // 瀏覽器語言檢測
  .use(initReactI18next)
  .init({
    lng: 'zh-TW', // 預設語言
    fallbackLng: 'zh-TW', // 回退語言
    interpolation: { escapeValue: false }, // React 已經有 XSS 防護
    react: {
      useSuspense: false, // 如果需要在翻譯載入前渲染內容，可以設為 false
    },
    backend: {
      // 如果需要伺服器提供翻譯，啟用此設置
    },
    resources: {}, // 初始化為空，稍後動態載入
  })
  .catch((error) => {
    console.error('i18n initialization error:', error)
  })

// 動態加載特定語系
export const loadLanguage = async (lng: string) => {
  console.log('Starting to load language:', lng) // 檢查是否執行到這裡
  const namespaces = await loadNamespaces(lng)
  console.log('Loaded namespaces:', namespaces) // 確認是否成功加載

  Object.keys(namespaces).forEach((namespace) => {
    i18n.addResourceBundle(lng, namespace, namespaces[namespace], true, true)
  })

  i18n.changeLanguage(lng)
}

export default i18n
