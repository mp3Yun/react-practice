import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  mergeConfigs,
} from '@chakra-ui/react'

/**
 * 使用食譜的方法:
 * 1. 需要定義食譜 defineRecipe
 * 2. 需要時，使用 useRecipe 進行特殊設定
 */
const buttonRecipe = defineRecipe({
  base: {
    fontWeight: 'bold',
    borderRadius: 'md',
    _focus: {
      boxShadow: 'outline', // 有陰影
    },
  },
  variants: {
    variant: {
      primary: { bg: 'primary.500', color: 'white' },
      secondary: { bg: 'secondary.500', color: 'white' },
    },
    size: {
      lg: {
        fontSize: 'lg',
        px: 8,
        py: 6,
      },
      md: {
        fontSize: 'md',
        px: 6,
        py: 4,
      },
      sm: {
        fontSize: 'sm',
        px: 4,
        py: 3,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

const inputRecipe = defineRecipe({
  base: {
    borderRadius: 'md',
    _focus: {
      boxShadow: 'outline', // 有陰影
    },
  },
  variants: {
    variant: {
      primary: { bg: 'primary.500', color: 'white' },
      secondary: { bg: 'secondary.500', color: 'white' },
    },
    size: {
      lg: {
        fontSize: 'lg',
        px: 6,
        py: 4,
      },
      md: {
        fontSize: 'md',
        px: 5,
        py: 3,
      },
      sm: {
        fontSize: 'sm',
        px: 4,
        py: 2,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: '#f5faff' }, // 淺色
          100: { value: '#e0f0ff' }, // 次淺色
          200: { value: '#b3d8ff' }, // 中間色
          300: { value: '#80c0ff' }, // 鮮豔色
          400: { value: '#3399ff' }, // 主要色
          500: { value: '#0077ff' }, // 強調色
          600: { value: '#005bb5' }, // 深色
          700: { value: '#003f80' }, // 更深色
          800: { value: '#002a4d' }, // 深色2
          900: { value: '#00121a' }, // 最深色
        },
        secondary: {
          50: { value: '#e0f7ff' }, // 非常淺的海洋藍色
          100: { value: '#b3e5fc' }, // 淺海洋藍
          200: { value: '#81d4fa' }, // 較淺的海洋藍
          300: { value: '#4fc3f7' }, // 較鮮豔的海洋藍
          400: { value: '#29b6f6' }, // 中等深度的海洋藍
          500: { value: '#03a9f4' }, // 標準海洋藍
          600: { value: '#039be5' }, // 深海洋藍
          700: { value: '#0288d1' }, // 更深的海洋藍
          800: { value: '#0277b3' }, // 非常深的海洋藍
          900: { value: '#01579b' }, // 最深的海洋藍
        },
        oceanGreenBlue: {
          50: { value: '#e0f7f3' }, // 非常淺的綠藍色
          100: { value: '#b2ebf2' }, // 淺綠藍色
          200: { value: '#80e0e0' }, // 淡綠藍色
          300: { value: '#4dd2d3' }, // 較鮮豔的綠藍色
          400: { value: '#26c6da' }, // 鮮豔的綠藍色
          500: { value: '#00bcd4' }, // 標準的綠藍色
          600: { value: '#00acc1' }, // 深綠藍色
          700: { value: '#008c99' }, // 更深的綠藍色
          800: { value: '#00778a' }, // 非常深的綠藍色
          900: { value: '#005e6a' }, // 最深的綠藍色
        },
        red: {
          50: { value: '#ffe6e6' },
          100: { value: '#ffcccc' },
          200: { value: '#ffb3b3' },
          300: { value: '#ff9999' },
          400: { value: '#ff6666' },
          500: { value: '#ff3333' },
          600: { value: '#e60000' },
          700: { value: '#b30000' },
          800: { value: '#800000' },
          900: { value: '#4d0000' },
        },
        gray: {
          50: { value: '#f7fafc' }, // 非常淺的灰色
          100: { value: '#edf2f7' }, // 很淺的灰色
          200: { value: '#e2e8f0' }, // 淺灰色
          300: { value: '#cbd5e0' }, // 淺中灰色
          400: { value: '#a0aec0' }, // 中灰色
          500: { value: '#718096' }, // 標準灰色
          600: { value: '#4a5568' }, // 深灰色
          700: { value: '#2d3748' }, // 更深灰色
          800: { value: '#1a202c' }, // 非常深灰色
          900: { value: '#171923' }, // 最深灰色
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: '{colors.primary.500}' },
          contrast: { value: '{colors.primary.100}' },
          fg: { value: '{colors.primary.700}' },
          muted: { value: '{colors.primary.100}' },
          subtle: { value: '{colors.primary.200}' },
          emphasized: { value: '{colors.primary.300}' },
          focusRing: { value: '{colors.primary.500}' },
        },
        secondary: {
          solid: { value: '{colors.secondary.500}' },
          contrast: { value: '{colors.secondary.100}' },
          fg: { value: '{colors.secondary.700}' },
          muted: { value: '{colors.secondary.100}' },
          subtle: { value: '{colors.secondary.200}' },
          emphasized: { value: '{colors.secondary.300}' },
          focusRing: { value: '{colors.secondary.500}' },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },
  },
  globalCss: {
    '.show-border': {
      border: '2px solid var(--chakra-colors-gray-300) !important',
    },
    '.custom-scrollbar': {
      overflowY: 'auto',
      maxHeight: 'var(--scrollbar-max-height)', // 依賴 CSS 變量
      border: '1px solid #e2e8f0',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'var(--chakra-colors-primary-400)',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'var(--chakra-colors-primary-300)',
      },
      '&::-webkit-scrollbar-track': {
        background: 'gray.100',
      },
    },
  },
})

// Extends default theme
const config = mergeConfigs(defaultConfig, theme)
const system = createSystem(config)

export default system
