// src/utils/translator.ts
import i18n from '../i18n'

// 定義函數類型
type TranslateFunction = (key: string, options?: Record<string, any>) => string

export const translate: TranslateFunction = (key, options) => {
  return i18n.t(key, options)
}
