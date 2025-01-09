// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next) // 使用 react-i18next
  .init({
    resources: {
      en: {
        translation: {
          plzChooseLanguage: 'Please select language',
          settingLanguage: 'Setting Language',
          english: 'English',
          traditionalChinese: 'Traditional Chinese',
          simplifiedChinese: 'Simplified Chinese',
          japanese: 'Japanese',
          welcome: 'Welcome',
          description: 'This is a description in English.',
        },
      },
      'zh-TW': {
        translation: {
          plzChooseLanguage: '請選擇語系',
          settingLanguage: '設定語系',
          english: '英語',
          traditionalChinese: '繁體中文',
          simplifiedChinese: '簡體中文',
          japanese: '日語',
          welcome: '歡迎',
          description: '這是中文描述。',
        },
      },
      'zh-CN': {
        translation: {
          plzChooseLanguage: '请选择语系',
          settingLanguage: '设定语系',
          english: '英语',
          traditionalChinese: '繁体中文',
          simplifiedChinese: '简体中文',
          japanese: '日语',
          welcome: '欢迎',
          description: '这是中文描述。',
        },
      },
      ja: {
        translation: {
          plzChooseLanguage: '言語を選択してください',
          settingLanguage: '言語を設定する',
          english: '英語',
          traditionalChinese: '繁体字中国語',
          simplifiedChinese: '中国語（簡体字）',
          japanese: '日本語',
          welcome: 'ようこそ',
          description: 'これは日本語の説明です。',
        },
      },
    },
    lng: 'zh-TW', // 默認語言為繁中
    fallbackLng: 'zh-TW', // 無法找到對應語言時使用繁中
    interpolation: {
      escapeValue: false, // React 已經處理了 XSS 問題
    },
  })

export default i18n
